// import { removeRedundancies } from "../gamedev/public_html/geolocation.js";  // Update path
// import { booleanPointInPolygon } from "@turf/turf";

// function mockImplementation(point, polygon) {
//   return booleanPointInPolygon([point.lng, point.lat], polygon);
// }


// test("Removes points inside the new polygon", () => {
//     mockImplementation(point, polygon);

//   const claimed = [{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }];
//   const tobeclaimed = [{ lat: 6, lng: 6 }, { lat: 5, lng: 3 }, { lat: 3, lng: 5 }]; 

//   const result = removeRedundancies(claimed, tobeclaimed);
  
//   expect(result).toEqual([{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }, { lat: 6, lng: 6 }, { lat: 5, lng: 3 }, { lat: 3, lng: 5 }]);
// });

// test("Does not remove points if no points are inside", () => {
//   google.maps.geometry.poly.containsLocation.mockReturnValue(false);

//   const claimed = [{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }];
//   const tobeclaimed = [{ lat: 5, lng: 3 }, { lat: 5, lng: 4 }, { lat: 6, lng: 3 }, { lat: 6, lng: 4 }];

//   const result = removeRedundancies(claimed, tobeclaimed);
  
//   expect(result).toEqual([{ lat: 0, lng: 0 }, { lat: 0, lng: 5 }, { lat: 5, lng: 5 }, { lat: 5, lng: 0 }, { lat: 5, lng: 3 }, { lat: 5, lng: 4 }, { lat: 6, lng: 3 }, { lat: 6, lng: 4 }]);
// });
