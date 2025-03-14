let map;
// The player's draggable marker
let draggableMarker;
// Info window for current location
let openlocationwindow = null;
// Marker for the user's current location
let userLocationMarker;
// Polyline to represent the user's path
let playerPathPolyline;
// Previous position
let previousPosition = null;
// User's current position
let userPosition = null;
// Variable to store the claimed territory
let claimedTerritory = null;
// Variable to keep track of the score (expansion width)
let score = 0;
// Variable to track the user's path outside the territory
let outsidePath = [];
// Array to store the user's location every second
let locationHistory = [];
// Label for the territory name
let territoryLabel = null;
// Variable to track how many meters the user has traveled
let distance_traveled = 0;
//Sees if the user has just started the run
let newrun = true;

async function initMap() {

  // Initialize the map with the boundary
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.5646, lng: -123.2620 },
    zoom: 16
  });

  // Static Marker on Corvallis
  draggableMarker = new google.maps.Marker({
    position: { lat: 44.56495296308599, lng: -123.27630649064899 },
    map: map,
    title: "Move me!",
    // Enable dragging
    draggable: true,
    // Drop effect when added
    animation: google.maps.Animation.DROP,
  });

  // Event listener for when the marker is dragged
  draggableMarker.addListener("dragstart", () => {
    if (openlocationwindow) {
      openlocationwindow.close();
    }
    console.log("Marker is being dragged");
  });

  // Event listener to log position when marker is moved
  draggableMarker.addListener("dragend", () => {
    const newPosition = draggableMarker.getPosition();
    console.log(`Marker moved to: ${newPosition.lat()}, ${newPosition.lng()}`);
  });

  // Add an info window to display the marker's position
  const marker_location_window = new google.maps.InfoWindow();
  draggableMarker.addListener("click", () => {
    if (openlocationwindow) {
      openlocationwindow.close();
    }
    marker_location_window.setContent(`Marker at: ${draggableMarker.getPosition().lat()}, ${draggableMarker.getPosition().lng()}`);
    marker_location_window.open(map, draggableMarker);
    openlocationwindow = marker_location_window;
  });

  const current_location_window = new google.maps.InfoWindow();

  // Initialize the polyline for the player's path
  playerPathPolyline = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  playerPathPolyline.setMap(map);

  let checkpoints = [];
  let plannedRoutePolyline;
  let route_started = false;

  //Player makes new marker to be used in their route
  async function addCheckpoint() {
    try {
      const checkpointMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Checkpoint",
        draggable: true
      });

      checkpoints.push(checkpointMarker);
      updatePlannedRoute();
    }
    catch (error) {
      console.error("Error adding checkpoint:", error);
    }
  }

  async function startRoute() {
    //Player must have at least three checkpoints to make a full route
    if (checkpoints.length < 3) {
      alert("You need at least three checkpoints to start!");
      return;
    }

    //Start the route
    route_started = true;
    for (checkpoint in checkpoints) {
      checkpoints[checkpoint].setDraggable(false);
    }
    alert("Route started! Follow your designated path.");

    //Start tracking player's movement
    trackPlayerProgress();
  }

  //Watch player's movement 
  async function trackPlayerProgress() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          //Check if user is near a checkpoint
          if (checkpoints.length > 0) {
            const nextCheckpoint = checkpoints[0];
            const distance = google.maps.geometry.spherical.computeDistanceBetween(userPos, nextCheckpoint);
            //Consider the checkpoint reached if within 5 meters
            if (distance < 5) {
              //Remove the reached checkpoint
              checkpoints.shift();
              //Update polyline to reflect the remaining path
              plannedRoutePolyline.setPath(checkpoints);

              if (checkpoints.length === 0) {
                alert("Route completed! You have claimed the area.");
                route_started = false;
              }
            }
          }
        },

        (error) => {
          console.error("Error getting position:", error);
        },

        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 500,
        }
      );
    } else {
      console.error("Browser doesn't support Geolocation");
    }
  }

  // async function to update the user's location
  async function updateLocation() {
    if (navigator.geolocation) {
      // Use the Geolocation API to get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Calculate the distance between the last points if available
          if (previousPosition) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(previousPosition),
              new google.maps.LatLng(pos)
            );

            distance_traveled += distance;
            distance_traveled = Number(distance_traveled.toFixed(2));

            console.log(`Distance traveled: ${distance.toFixed(2)} meters`);
            console.log(`Total distance: ${distance_traveled.toFixed(2)} meters`);

            // Store in local storage
            localStorage.setItem('distance_traveled', distance_traveled);
            console.log("Distance travelled updated to: ", localStorage.getItem('distance_traveled'));
          }

          // Store the user's current position
          userPosition = pos;

          // For debugging purposes, update the console periodically with the user's position
          console.log("User position:", pos);

          previousPosition = pos;

          // Store the user's location in the array
          locationHistory.push(pos);

          //We don't use the markers anymore so commenting out for now

          // If the array length is 5 (5 seconds), calculate the average location and place a marker
              // if (locationHistory.length >= 2) {
              //   const avgLocation = calculateAverageLocation(locationHistory);
              //   //placeAverageLocationMarker(avgLocation);
              //   locationHistory = []; // Clear the array
              // }

          map.setCenter(pos);

          
          //Set spawn territory if not already claimed
          if (!claimedTerritory) {
            claimTerritory();
          } else {
            // Check if the user is outside the territory
            if (!google.maps.geometry.poly.containsLocation(new google.maps.LatLng(pos), claimedTerritory)) {
              console.log("User is outside the territory.");
              //If this is the first point of the run, set an additional point that snaps to the perimeter
                        // if(newrun) {
                        //   let perimeterPoint = findClosestPoint(userPosition, claimedTerritory);
                        //   if (perimeterPoint) {
                        //     console.log("Closest point on perimeter:", perimeterPoint);
                        //     playerPathPolyline.getPath().push(perimeterPoint);
                        //     outsidePath.push(perimeterPoint);
                        //   }
                        //   newrun = false;
                        // }
              //Record the current point
              outsidePath.push(pos);
              // Update the polyline path with the new position
              playerPathPolyline.getPath().push(new google.maps.LatLng(pos.lat, pos.lng));
            } else {
              // User re-enters the territory
              if (outsidePath.length > 0) {
                console.log("User re-entered the territory.");
                // Expand the territory to include the path
                expandTerritory();
                        // newrun = true;
                // Clear the outside path and reset the polyline
                outsidePath = [];
                playerPathPolyline.setPath([]);
              }
            }
          }
        },
        (error) => {
          console.error("Error getting position:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 500,
        }
      );
    } else {
      console.error("Browser doesn't support Geolocation");
    }
  }

  // Update the user's location every second
  setInterval(updateLocation, 500);
}

function findClosestPoint(point, polygon) {
  let closestpoint = new google.maps.LatLng(0, 0);
  let minDistance = Infinity;
  let projdist = null;

  let pointa = null;
  let pointb = null;
  let atob = null;
  let atop = null;
  let projected = null;
  let scalar = null;
  let dotabap = null;

  // Iterate through each edge of the polygon
  let pathlen = polygon.getPath().getLength();
  for (let i = 0; i < pathlen; i++) {
    //get one edge from the polygon
    pointa = polygon.getPath().getAt(i);
    //%pathlen is for the last edge between the last point and first point. Crazy math!
    pointb = polygon.getPath().getAt((i + 1) % pathlen);

    //Calculate the dot product between the AB and AP vector for the euclid mag 
    atob = [pointb.lat() - pointa.lat(), pointb.lng() - pointa.lng()];
    atop = [point.lat() - pointa.lat(), point.lng() - pointa.lng()];
    dotabap = atob[0] * atop[0] + atob[1] * atop[1];

    //Find the scalar for the unit vector origin, then find the projected point originating from A
    scalar = dotabap/(atob[0] * atob[0] + atob[1] * atob[1]);
    projected = [pointa.lat() + (scalar * atob[0]), pointa.lng() + (scalar * atob[1])];
    projdist = distance([point.lat(), point.lng()], projected);
    if(projdist < minDistance) {
      minDistance = projdist;
      closestpoint = new google.maps.LatLng(projected[0], projected[1]);
    }
  }
  return closestpoint;
}

// async function to calculate the average location
function calculateAverageLocation(locations) {
  if (locations.length === 0) return null;

  let totalLat = 0;
  let totalLng = 0;

  locations.forEach(location => {
      totalLat += location.lat;
      totalLng += location.lng;
  });

  return {
      lat: totalLat / locations.length,
      lng: totalLng / locations.length
  };
}

// async function to place a marker at the average location
async function placeAverageLocationMarker(location) {
  const avgLocationMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Average Location",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });
  trailMarkers.push(avgLocationMarker);
}

// 
async function claimTerritory() {
  if (userPosition) {
    const squareSize = 0.0002; // Size of the square in degrees (approx. 50 meters)
    const squareCoords = [
      { lat: userPosition.lat + squareSize, lng: userPosition.lng - squareSize },
      { lat: userPosition.lat + squareSize, lng: userPosition.lng + squareSize },
      { lat: userPosition.lat - squareSize, lng: userPosition.lng + squareSize },
      { lat: userPosition.lat - squareSize, lng: userPosition.lng - squareSize } // Closing the square
    ];
    //SPAWN COORDINATES ORDER: BOTTOM RIGHT, TOP RIGHT, TOP LEFT, BOTTOM LEFT

    claimedTerritory = new google.maps.Polygon({
      paths: squareCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    claimedTerritory.setMap(map);
    console.log("Territory claimed around:", userPosition);

    // const area = google.maps.geometry.spherical.computeArea(claimedTerritory.getPath().getArray());
    // score += area;
    // score = Number(score.toFixed(2));
    // console.log("Territory expanded around:", userPosition);

    // Retrieve the user_id from local storage
    const user_id = localStorage.getItem('user_id');
    console.log("User ID:", user_id);
    if (!user_id)
      console.error("No user_id found in local storage!");
    else
      localStorage.setItem('score', score);
  } else {
    console.error("User position is not available.");
  }
}

async function expandTerritory() {
  if (userPosition && outsidePath.length > 0) {
    // Get the current territory coordinates
    const currentCoords = claimedTerritory.getPath().getArray();
    // Add the outside path to the current territory
    outsidePath.push(outsidePath[0]);
    console.log("DEBUG PATH BEFORE REMOVE: ", currentCoords);
    const newCoords = removeRedundancies(currentCoords, outsidePath);
    console.log("DEBUG PATH AFTER REMOVE: ", newCoords);
    // Create a new polygon with the expanded territory
    claimedTerritory.setMap(null); // Remove the previous territory
    let newClaimedTerritory = new google.maps.Polygon({
      paths: newCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    newClaimedTerritory.setMap(map);

    // Calculate the expansion width and update the score
    const expansionWidth = google.maps.geometry.spherical.computeArea(newClaimedTerritory.getPath().getArray());
    score = expansionWidth;
    score = Number(score.toFixed(2));
    console.log("Territory expanded around:", userPosition);
    console.log("DEBUG EXPANDTERRITORY SCORE:", score);

    // Retrieve the user_id from local storage
    const user_id = localStorage.getItem('user_id');
    console.log("User ID:", user_id);
    if (!user_id)
      console.error("No user_id found in local storage!");
    else
      localStorage.setItem('score', score);
  } else {
    console.error("User position or outside path is not available.");
  }
}

function locationRefactorTesting(point, polygon) {
  return google.maps.geometry.poly.containsLocation(point, polygon)
}

async function removeRedundancies(claimed, tobeclaimed, refactorfunc) { if (claimedTerritory) {
  let incision = new google.maps.Polygon({
    paths: tobeclaimed,
    strokeWeight: 0,
    fillOpacity: 0
  });
  //For each point in the already claimed area, that point if it's located inside of the new polygon
  let claimedlength = claimed.length;
  for(let i = 0; i < claimedlength; i++) {
    if(refactorfunc(claimed[i], incision)) {
      console.log("DEBUG: Point found inside of polygon");
      claimed.splice(i, 1);
      i--;
      claimedlength--;
    }
  }
  //Return the remaining points
  return claimed.concat(tobeclaimed);
}}

function detectCheats(pointa, pointb) {
  let R = 6371

  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(pointb[0] - pointa[0]);
  const dLon = toRad(pointb[1] - pointa[1]);

  const radLat1 = toRad(pointa[0]);
  const radLat2 = toRad(pointb[0]);

  // Haversine formula
  const a = Math.sin(dLat / 2) ** 2 + 
            Math.cos(radLat1) * Math.cos(radLat2) * 
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

// Error handling for geolocation
async function handleLocationError(browserHasGeolocation, current_location_window, pos) {
  current_location_window.setPosition(pos);
  current_location_window.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  current_location_window.open(map);
}