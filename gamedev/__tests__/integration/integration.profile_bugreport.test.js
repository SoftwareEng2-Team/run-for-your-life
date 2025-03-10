// __tests__/integration/integration.profile_bugreport.test.js
/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Profile to Bug Report Integration Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 30000
      });
      page = await browser.newPage();
    } catch (error) {
      console.error('Browser launch failed:', error);
      process.exit(1);
    }
  });

  test('Navigation Test', async () => {
    const profilePath = path.join(__dirname, '../../public_html/profile.html');
    await page.goto(`file://${profilePath}`, { waitUntil: 'networkidle0' });
    
    await page.waitForSelector('#bugReportButton', { visible: true, timeout: 5000 });
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('#bugReportButton'),
    ]);
    
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/bugreportpage.html$/);
  }, 30000);

  afterAll(async () => {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
  });
});