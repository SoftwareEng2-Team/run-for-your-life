// __tests__/leaderboard.test.js
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';

describe('Leaderboard Tests', () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <div class="leaderboard-container"></div>
    `;

    // Mock fetch
    global.fetch = jest.fn();

    // Use dynamic import
    await import('../public_html/leaderboard.js');

    // Fire DOMContentLoaded
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Populates leaderboard with data', async () => {
    // Prepare mock data
    const mockData = [
      { user_id: 1, username: 'Alice', total_territory: 200 },
      { user_id: 2, username: 'Bob', total_territory: 150 },
      { user_id: 3, username: 'Charlie', total_territory: 120 },
    ];
    // First fetch call returns mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    // Subsequent calls for setRank
    fetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    // Wait for the script to call createLeaderboard
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/leaderboard'),
        expect.any(Object)
      );
    });

    // The .leaderboard-container should have 3 child "card" divs
    const container = document.querySelector('.leaderboard-container');
    expect(container.children.length).toBe(3);

    // Check if the first is first-place-div, etc.
    expect(container.children[0].classList.contains('first-place-div')).toBe(true);
    expect(container.children[1].classList.contains('second-place-div')).toBe(true);
    expect(container.children[2].classList.contains('third-place-div')).toBe(true);
  });
});
