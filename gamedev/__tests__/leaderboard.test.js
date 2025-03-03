import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import '../public_html/leaderboard.js';

describe('leaderboard.js Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="leaderboard-container"></div>
    `;
    fetchMock.resetMocks();
  });

  // UNIT test: The main method is createLeaderboard (which calls fetch).
  // We'll isolate createLeaderboard by calling it after we mock fetch
  test('UNIT: createLeaderboard populates the container with correct ranks', async () => {
    // Provide some mock data
    fetchMock.mockResponseOnce(JSON.stringify([
      { user_id: 101, username: 'Alice', total_territory: 50 },
      { user_id: 102, username: 'Bob', total_territory: 30 },
      { user_id: 103, username: 'Charlie', total_territory: 10 }
    ]));

    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Wait a tick for fetch
    await new Promise(resolve => setTimeout(resolve, 0));

    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBe(3);

    // The first should have class "first-place-div"
    expect(cards[0].classList.contains('first-place-div')).toBe(true);
    // The second "second-place-div"
    expect(cards[1].classList.contains('second-place-div')).toBe(true);
  });

  // VALIDATION test: If fetch returns empty or missing data, we handle gracefully
  test('VALIDATION: createLeaderboard handles empty data array', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(setImmediate);

    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBe(0);
  });
});
