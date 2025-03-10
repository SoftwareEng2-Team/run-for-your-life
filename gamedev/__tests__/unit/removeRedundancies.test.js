import { removeRedundancies } from "gamedev/public_html/geolocation.js";  // Update path
import { jest } from '@jest/globals';
beforeEach(() => {
  google.maps.geometry.poly.containsLocation.mockClear();
});

test("Removes points inside the new polygon", () => {
  google.maps.geometry.poly.containsLocation.mockImplementation((point, polygon) => {
    // Mock behavior: Assume the first point is inside
    return point.lat === 1 && point.lng === 1;
  });

  const claimed = [{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }];
  const tobeclaimed = [{ lat: 6, lng: 6 }, { lat: 6, lng: 3 }, { lat: 3, lng: 6 }]; 

  const result = removeRedundancies(claimed, tobeclaimed);
  
  expect(result).toEqual([{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }, { lat: 6, lng: 6 }, { lat: 6, lng: 3 }, { lat: 3, lng: 6 }]);
});

test("does not modify claimed points if none are inside", () => {
  google.maps.geometry.poly.containsLocation.mockReturnValue(false);

  const claimed = [{ lat: 5, lng: 5 }, { lat: 6, lng: 6 }];
  const tobeclaimed = [{ lat: 7, lng: 7 }];

  const result = removeRedundancies(claimed, tobeclaimed);
  
  expect(result).toEqual([...claimed, ...tobeclaimed]);
});

test("handles small claimed arrays (<= 3 points)", () => {
  const claimed = [{ lat: 1, lng: 1 }, { lat: 2, lng: 2 }];
  const tobeclaimed = [{ lat: 3, lng: 3 }];

  const result = removeRedundancies(claimed, tobeclaimed);

  expect(result).toEqual([...claimed, ...tobeclaimed]); 
});
