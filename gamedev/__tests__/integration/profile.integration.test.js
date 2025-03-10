// Calvin Chen
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('Profile Page Integration Test', () => {
  let dom, document, window;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'public_html/profile.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;
  });

  it('should navigate to bug report page on clicking the bugReportButton', () => {
    const bugReportButton = document.getElementById('bugReportButton');
    bugReportButton.click();
    expect(window.location.href).toContain('bugreportpage.html');
  });
});
