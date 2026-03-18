import { chromium } from 'playwright';
import { buildLoveSpiScore } from './scoring.js';
import { ensureDir, saveFailureArtifacts } from './io.js';

const POST_LINK_SELECTORS = [
  'a[href*="/post/"]',
  'a[href*="/t/"]',
  'a[href*="threads.net/@"]'
];

const TEXT_SELECTORS = [
  '[data-pressable-container="true"] span',
  'div[dir="auto"] span',
  'span[xstyle]'
];

const META_NAME_SELECTORS = [
  'meta[property="og:title"]',
  'meta[name="twitter:title"]'
];

function envNumber(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function envBool(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  return raw.toLowerCase() !== 'false';
}

function parseCount(raw) {
  if (!raw) return 0;
  const text = raw.replace(/,/g, '').trim().toLowerCase();
  const match = text.match(/([\d.]+)\s*([kmb万億]?)/i);
  if (!match) return 0;
  const value = Number(match[1]);
  const suffix = match[2];
  const multipliers = { k: 1_000, m: 1_000_000, b: 1_000_000_000, '万': 10_000, '億': 100_000_000 };
  return Math.round(value * (multipliers[suffix] || 1));
}

async function loginIfNeeded(page, screenshotsDir) {
  const username = process.env.THREADS_USERNAME;
  const password = process.env.THREADS_PASSWORD;
  if (!username || !password) return false;

  await page.goto('https://www.threads.com/login', { waitUntil: 'domcontentloaded' });
  const userInput = page.locator('input[name="username"], input[autocomplete="username"], input[type="text"]').first();
  const passInput = page.locator('input[name="password"], input[autocomplete="current-password"], input[type="password"]').first();
  if (!(await userInput.count()) || !(await passInput.count())) {
    return false;
  }

  await userInput.fill(username);
  await passInput.fill(password);
  await page.locator('button[type="submit"], div[role="button"]').filter({ hasText: /ログイン|Login/i }).first().click();
  await page.waitForTimeout(5000);

  if (page.url().includes('/login')) {
    await saveFailureArtifacts(page, screenshotsDir, 'login-failed');
    throw new Error('Threads login failed. Check .env credentials or additional verification.');
  }

  return true;
}

async function extractStatFromPage(page, labelPatterns) {
  const bodyText = await page.textContent('body');
  if (!bodyText) return 0;
  for (const pattern of labelPatterns) {
    const match = bodyText.match(pattern);
    if (match) return parseCount(match[1]);
  }
  return 0;
}

async function extractPostDetails(context, postUrl, keyword, screenshotsDir) {
  const page = await context.newPage();
  try {
    await page.goto(postUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    let metaName = '';
    for (const selector of META_NAME_SELECTORS) {
      const value = await page.locator(selector).getAttribute('content').catch(() => null);
      if (value) {
        metaName = value;
        break;
      }
    }

    const titleBits = metaName.split(' on Threads').shift() || '';
    const [accountName = '', rawHandle = ''] = titleBits.split(' (@');

    let postText = '';
    for (const selector of TEXT_SELECTORS) {
      const snippets = await page.locator(selector).allTextContents().catch(() => []);
      const combined = snippets.map((item) => item.trim()).filter(Boolean).join(' ');
      if (combined.length > postText.length) {
        postText = combined;
      }
    }

    const likeCount = await extractStatFromPage(page, [
      /([\d.,kmb万億]+)\s*likes?/i,
      /([\d.,kmb万億]+)\s*件の?いいね/i,
      /いいね\s*([\d.,kmb万億]+)/i
    ]);
    const replyCount = await extractStatFromPage(page, [
      /([\d.,kmb万億]+)\s*repl(?:y|ies)/i,
      /([\d.,kmb万億]+)\s*件の?返信/i,
      /返信\s*([\d.,kmb万億]+)/i
    ]);
    const repostCount = await extractStatFromPage(page, [
      /([\d.,kmb万億]+)\s*reposts?/i,
      /([\d.,kmb万億]+)\s*件の?再投稿/i,
      /再投稿\s*([\d.,kmb万億]+)/i
    ]);

    const scoring = buildLoveSpiScore(postText);
    return {
      account_name: accountName.trim(),
      handle: rawHandle.replace(')', '').trim(),
      post_text: postText.trim(),
      post_url: postUrl,
      like_count: likeCount,
      reply_count: replyCount,
      repost_count: repostCount,
      collected_at: new Date().toISOString(),
      matched_keyword: keyword,
      ...scoring,
    };
  } catch (error) {
    await saveFailureArtifacts(page, screenshotsDir, 'post-error');
    throw error;
  } finally {
    await page.close();
  }
}

async function collectPostLinks(page, keyword, maxPosts, scrollRounds, waitMs, screenshotsDir) {
  const encoded = encodeURIComponent(keyword);
  const urls = [
    `https://www.threads.com/search?q=${encoded}`,
    `https://www.threads.com/search/${encoded}`,
  ];

  let loaded = false;
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(waitMs);
      loaded = true;
      break;
    } catch {
      // fallback to next URL
    }
  }

  if (!loaded) {
    await saveFailureArtifacts(page, screenshotsDir, `search-${keyword}`);
    throw new Error(`Search page could not be loaded for keyword: ${keyword}`);
  }

  const discovered = new Set();
  for (let round = 0; round < scrollRounds; round += 1) {
    for (const selector of POST_LINK_SELECTORS) {
      const hrefs = await page.locator(selector).evaluateAll((elements) =>
        elements.map((element) => element.href).filter(Boolean)
      ).catch(() => []);
      hrefs.forEach((href) => discovered.add(href));
    }

    if (discovered.size >= maxPosts) break;
    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(waitMs);
  }

  if (discovered.size === 0) {
    await saveFailureArtifacts(page, screenshotsDir, `empty-search-${keyword}`);
  }

  return [...discovered].slice(0, maxPosts);
}

export async function runCollector({ keywords, minLikes, outputDir, screenshotsDir }) {
  await ensureDir(outputDir);
  await ensureDir(screenshotsDir);

  const browser = await chromium.launch({ headless: envBool('THREADS_HEADLESS', true) });
  const context = await browser.newContext({ locale: 'ja-JP' });
  const page = await context.newPage();

  try {
    await loginIfNeeded(page, screenshotsDir).catch(() => false);

    const maxPosts = envNumber('THREADS_MAX_POSTS_PER_KEYWORD', 40);
    const scrollRounds = envNumber('THREADS_SCROLL_ROUNDS', 8);
    const waitMs = envNumber('THREADS_SEARCH_WAIT_MS', 2500);
    const results = [];
    const seenUrls = new Set();

    for (const keyword of keywords) {
      const links = await collectPostLinks(page, keyword, maxPosts, scrollRounds, waitMs, screenshotsDir);
      for (const link of links) {
        if (seenUrls.has(link)) continue;
        seenUrls.add(link);
        const record = await extractPostDetails(context, link, keyword, screenshotsDir).catch(() => null);
        if (!record) continue;
        if (record.like_count >= minLikes) {
          results.push(record);
        }
      }
    }

    return results.sort((a, b) => {
      if (b.is_priority_post !== a.is_priority_post) {
        return Number(b.is_priority_post) - Number(a.is_priority_post);
      }
      if (b.love_spi_score !== a.love_spi_score) {
        return b.love_spi_score - a.love_spi_score;
      }
      return b.like_count - a.like_count;
    });
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}
