import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

import '../public_html/backend.js';

describe('backend.js Tests', () => {
  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div id="leaderboard"></div>
    `;
    fetchMock.resetMocks();
  });

  // UNIT test: fetchLeaderboard properly updates the DOM on success
  test('UNIT: fetchLeaderboard updates the DOM with leaderboard data', async () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify([
      { username: 'Alice', total_distance_km: 10 },
      { username: 'Bob', total_distance_km: 7 }
    ]));

    // Manually call window.onload function:
    await window.onload();

    const leaderboardDiv = document.getElementById('leaderboard');
    expect(leaderboardDiv).not.toBeNull();

    // We expect it to contain "Alice" & "Bob"
    expect(leaderboardDiv.textContent).toContain('1. Alice - 10 km');
    expect(leaderboardDiv.textContent).toContain('2. Bob - 7 km');
  });

  // VALIDATION test: ensures an error message is logged if fetch fails
  test('VALIDATION: fetchLeaderboard logs error when fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectOnce(new Error('Network error'));

    await window.onload();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching leaderboard:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
