import { jest } from '@jest/globals';
import { calculateAverageLocation } from '../public_html/geolocation.js';

describe('geolocation.js Tests', () => {
  // UNIT test: calculateAverageLocation
  test('UNIT: calculateAverageLocation returns correct average', () => {
    const coords = [
      { lat: 44.0, lng: -123.0 },
      { lat: 45.0, lng: -124.0 },
      { lat: 46.0, lng: -125.0 }
    ];
    const result = calculateAverageLocation(coords);

    // Averages: lat=45.0, lng=-124.0
    expect(result.lat).toBeCloseTo(45.0);
    expect(result.lng).toBeCloseTo(-124.0);
  });

  // VALIDATION test: (high-level component) - example “no geolocation support” scenario
  // We'll do a simple test that simulates a lacking geolocation.
  test('VALIDATION: logs error if browser has no geolocation', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const originalGeo = global.navigator.geolocation;
    delete global.navigator.geolocation; // remove geolocation

    try {
      await import('../geolocation.js');
    } catch (error) {
    }

    expect(consoleSpy).toHaveBeenCalledWith("Browser doesn't support Geolocation");

    consoleSpy.mockRestore();
    global.navigator.geolocation = originalGeo; // restore
  });
});
