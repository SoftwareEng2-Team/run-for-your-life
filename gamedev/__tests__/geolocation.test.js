// __tests__/geolocation.test.js
import { jest } from '@jest/globals';

describe('Geolocation Tests', () => {
  // Provide a mock google.maps in the global scope
  beforeAll(() => {
    global.google = {
      maps: {
        Map: jest.fn().mockReturnValue({}),
        Marker: jest.fn().mockReturnValue({ addListener: jest.fn() }),
        Polyline: jest.fn().mockReturnValue({
          setMap: jest.fn(),
          getPath: jest.fn(() => ({ push: jest.fn() }))
        }),
        Polygon: jest.fn().mockReturnValue({
          setMap: jest.fn(),
          getPath: jest.fn(() => ({ getArray: jest.fn(() => []) }))
        }),
        LatLng: jest.fn(),
        geometry: {
          spherical: {
            computeArea: jest.fn(() => 100),
          },
          poly: {
            containsLocation: jest.fn(() => true),
          },
        },
        InfoWindow: jest.fn().mockReturnValue({ setContent: jest.fn(), open: jest.fn(), close: jest.fn() }),
        Animation: { DROP: 'DROP' },
      },
    };
  });

  test('initMap runs without error', async () => {
    document.body.innerHTML = '<div id="map"></div>';

    // Use dynamic import
    await import('../public_html/geolocation.js');

    // The geolocation.js file defines initMap(); let's call it
    expect(() => global.initMap()).not.toThrow();
  });
});
