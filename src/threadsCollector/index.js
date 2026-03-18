import 'dotenv/config';
import path from 'node:path';
import { runCollector } from './lib/threads.js';
import { DEFAULT_KEYWORDS } from './lib/scoring.js';
import { ensureDir, toTimestamp, writeCsv, writeJson } from './lib/io.js';

const cwd = process.cwd();
const outputDir = path.join(cwd, 'output');
const screenshotsDir = path.join(cwd, 'screenshots');
const minLikes = Number(process.env.THREADS_MIN_LIKES || 2000);
const keywords = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_KEYWORDS;

async function main() {
  await ensureDir(outputDir);
  await ensureDir(screenshotsDir);

  console.log(`Threads collector started. keywords=${keywords.join(', ')} minLikes=${minLikes}`);
  const records = await runCollector({ keywords, minLikes, outputDir, screenshotsDir });
  const stamp = toTimestamp();
  const jsonPath = path.join(outputDir, `threads-love-spi-${stamp}.json`);
  const csvPath = path.join(outputDir, `threads-love-spi-${stamp}.csv`);

  await writeJson(jsonPath, records);
  await writeCsv(csvPath, records);

  console.log(`Done. matched_posts=${records.length}`);
  console.log(`JSON: ${jsonPath}`);
  console.log(`CSV: ${csvPath}`);
}

main().catch((error) => {
  console.error('Collector failed:', error);
  process.exitCode = 1;
});
