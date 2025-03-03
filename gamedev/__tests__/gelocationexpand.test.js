import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import '../public_html/geolocation.js';

describe('geolocation.js Additional Tests', () => {
  beforeEach(() => {
    // Provide partial DOM for geolocation usage
    document.body.innerHTML = `<div id="map"></div>`;
    fetchMock.resetMocks();
    // Mock localStorage
    localStorage.setItem('user_id', '5678');
  });

  // UNIT test (or partial): Testing expandTerritory logic is tricky since it uses Google Maps
  // We can partially mock google.maps & check the fetch call for score updates
  test('UNIT: expandTerritory calls the /api/map endpoint with updated score', async () => {
    // Mock the global google.maps references so it doesn't throw
    global.google = {
      maps: {
        LatLngBounds: class {
          constructor() { this.coords = []; }
          extend() {}
          getCenter() { return { lat: 44.0, lng: -123.0 }; }
        },
        Polygon: class {
          setMap() {}
          getPath() { return { getArray: () => ([ { lat: 44.0, lng: -123.0 } ]) }; }
        },
        geometry: { spherical: { computeLength: () => 200 } }
      }
    };
    window.userPosition = { lat: 44.0, lng: -123.0 };
    window.outsidePath = [{ lat: 44.1, lng: -123.1 }];
    window.score = 0;

    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await window.expandTerritory();

    expect(window.score).toBe(200);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/map'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ user_id: '5678', score: 200 })
      })
    );
  });

  // VALIDATION test: If userPosition is not set, expandTerritory logs an error
  test('VALIDATION: expandTerritory logs error if userPosition is not set', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    window.userPosition = null;

    await window.expandTerritory();

    expect(consoleSpy).toHaveBeenCalledWith("User position or outside path is not available.");
    consoleSpy.mockRestore();
  });
});
