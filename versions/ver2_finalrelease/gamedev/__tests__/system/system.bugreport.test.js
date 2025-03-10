// __tests__/system/system.bugreport.test.js
/**
 * @jest-environment node
 */

// Evan Albert
import puppeteer from 'puppeteer';

describe('Bug Report System Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      protocolTimeout: 30000,
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto(`${global.BASE_URL}profile.html`);
  });

  afterAll(async () => {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
  });

  test('Basic Navigation Test', async () => {
    await page.waitForSelector('#bugReportButton', { timeout: 5000 });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('#bugReportButton'),
    ]);
    expect(page.url()).toMatch(/bugreportpage.html$/);
  }, 30000);
});