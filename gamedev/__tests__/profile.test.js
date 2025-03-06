import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import '../public_html/profile.js';

describe('profile.js Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="username"></div>
      <div id="rank"></div>
      <div id="totalDistance"></div>
      <div id="totalClaimed"></div>
      <div id="achievements"></div>
      <button id="guideButton"></button>
      <div id="guideModal" class="modal">
        <span class="close">×</span>
        <p>Some guide</p>
      </div>
    `;
    // Mock localStorage
    localStorage.setItem('user_id', '1234');
    fetchMock.resetMocks();
  });

  // UNIT test: verifies the profile info is filled from fetch
  test('UNIT: Profile fields populated from server data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      username: 'User1234',
      rank_num: 5,
      totalDistance: 88,
      totalClaimed: 120
    }));

    // Trigger DOMContentLoaded
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(document.getElementById('username').textContent).toBe('User1234');
    expect(document.getElementById('rank').textContent).toBe('#5');
    expect(document.getElementById('totalDistance').textContent).toBe('88 miles');
    expect(document.getElementById('totalClaimed').textContent).toBe('120 sqft');
  });

  // VALIDATION test: If no user_id in local storage, we handle gracefully
  test('VALIDATION: Logs error if user_id not found in localStorage', async () => {
    localStorage.removeItem('user_id'); // remove it
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith('No user_id found in local storage!');
    consoleSpy.mockRestore();
  });
});
