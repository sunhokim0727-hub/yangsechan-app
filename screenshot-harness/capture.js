const { chromium } = require('playwright');

const SCREENS = [
  { name: 'home', wait: 400 },
  { name: 'create', wait: 300 },
  { name: 'lobby', wait: 300 },
  { name: 'gameOnline', wait: 300 },
  { name: 'result', wait: 600 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:8914/harness.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  for (const s of SCREENS) {
    await page.evaluate((name) => window.showScreen(name), s.name);
    await page.waitForTimeout(s.wait);
    await page.screenshot({ path: `/home/claude/yangsechan-app/screenshot-harness/out_${s.name}.png` });
    console.log('captured', s.name);
  }

  await browser.close();
})().catch(e => { console.error('ERR', e); process.exit(1); });
