// Calvin Chen
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('Profile Page Unit Test', () => {
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'public_html/profile.html'), 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have a header with "Profile Page"', () => {
    const header = document.querySelector('.profile-header');
    expect(header.textContent).toBe('Profile Page');
  });
});
