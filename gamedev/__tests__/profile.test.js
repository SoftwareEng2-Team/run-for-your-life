// __tests__/profile.test.js
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';

describe('Profile Page Tests', () => {
  let localGetItemSpy;

  beforeEach(async () => {
    document.body.innerHTML = `
      <div id="username"></div>
      <div id="rank"></div>
      <div id="totalDistance"></div>
      <div id="totalClaimed"></div>
      <div id="achievements"></div>
    `;

    // Mock localStorage to have a user_id
    localGetItemSpy = jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockImplementation(key => (key === 'user_id' ? '123' : null));

    // Use dynamic import
    await import('../public_html/profile.js');

    // Fire DOMContentLoaded
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('Calls fetchUserProfile after 500ms and fills data', async () => {
    // mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        username: 'MockUser',
        rank: 2,
        total_distance_ran: 5,
        total_distance_claimed: 120
      }),
    });

    // Use fake timers so we can flush the 500ms setTimeout
    jest.useFakeTimers();
    jest.runAllTimers();

    // Wait for the fetch + DOM updates
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Confirm DOM is updated
    expect(document.getElementById('username').textContent).toBe('MockUser');
    expect(document.getElementById('rank').textContent).toBe('#2');
    expect(document.getElementById('totalDistance').textContent).toBe('5 miles');
    expect(document.getElementById('totalClaimed').textContent).toBe('120 sqft');
  });

  test('If no user_id in localStorage, logs error and does not fetch', async () => {
    // Force no user_id
    localGetItemSpy.mockReturnValueOnce(null);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // We need to re-init after changing localStorage
    jest.resetModules();
    document.body.innerHTML = `
      <div id="username"></div>
      <div id="rank"></div>
      <div id="totalDistance"></div>
      <div id="totalClaimed"></div>
      <div id="achievements"></div>
    `;
    await import('../public_html/profile.js');
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));

    expect(consoleSpy).toHaveBeenCalledWith('No user_id found in local storage!');
    expect(global.fetch).toBeFalsy(); // never called
  });
});
