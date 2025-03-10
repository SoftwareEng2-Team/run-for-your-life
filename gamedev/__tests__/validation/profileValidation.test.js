// Calvin Chen
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';


describe('Profile Page Validation Test', () => {
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'public_html/profile.html'), 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have a span for username and rank', () => {
    const usernameEl = document.getElementById('username');
    const rankEl = document.getElementById('rank');
    expect(usernameEl).not.toBeNull();
    expect(rankEl).not.toBeNull();
  });

  it('should have totalDistance and totalClaimed elements', () => {
    const totalDistanceEl = document.getElementById('totalDistance');
    const totalClaimedEl = document.getElementById('totalClaimed');
    expect(totalDistanceEl).not.toBeNull();
    expect(totalClaimedEl).not.toBeNull();
  });
});
