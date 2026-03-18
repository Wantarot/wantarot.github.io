import fs from 'node:fs/promises';
import path from 'node:path';

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export function toTimestamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function escapeCsv(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function writeJson(filePath, records) {
  await fs.writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
}

export async function writeCsv(filePath, records) {
  if (records.length === 0) {
    await fs.writeFile(filePath, '', 'utf8');
    return;
  }

  const headers = Object.keys(records[0]);
  const lines = [headers.join(',')];
  for (const record of records) {
    lines.push(headers.map((header) => escapeCsv(record[header])).join(','));
  }
  await fs.writeFile(filePath, `${lines.join('\n')}\n`, 'utf8');
}

export async function saveFailureArtifacts(page, screenshotsDir, label) {
  await ensureDir(screenshotsDir);
  const filePath = path.join(screenshotsDir, `${label}-${toTimestamp()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}
