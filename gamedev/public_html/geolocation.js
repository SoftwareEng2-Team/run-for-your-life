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

async function initMap() {
  //Removed feature for beta release
  // Bounding Box for the OSU Campus
  // const osuBounds = {
  //   // Coordinates for the map boundary
  //   north: 44.56788,
  //   south: 44.55726,
  //   east: -123.27163,
  //   west: -123.28965
  // };

  // Initialize the map with the boundary
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.5646, lng: -123.2620 },
    zoom: 16,
    //Removed feature for beta release
    // restriction: {
    //   latLngBounds: osuBounds,
    //   strictBounds: true,
    // },
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

          // Store the user's current position
          userPosition = pos;

          // For debugging purposes, update the console periodically with the user's position
          console.log("User position:", pos);

          //Removed feature for beta release
          // // If the user is currently outside of the OSU campus bounds, notify them
          // if (pos.lat < osuBounds.south || pos.lat > osuBounds.north ||
          //   pos.lng < osuBounds.west || pos.lng > osuBounds.east) {
          //   console.log("Location is outside OSU campus. Stay within the boundary.");
          //   return;
          // }


          previousPosition = pos;

          // Store the user's location in the array
          locationHistory.push(pos);

          // If the array length is 5 (5 seconds), calculate the average location and place a marker
          if (locationHistory.length >= 2) {
            const avgLocation = calculateAverageLocation(locationHistory);
            //placeAverageLocationMarker(avgLocation);
            locationHistory = []; // Clear the array
          }

          map.setCenter(pos);

          // Claim territory if not already claimed
          if (!claimedTerritory) {
            claimTerritory();
          } else {
            // Check if the user is outside the territory
            if (!google.maps.geometry.poly.containsLocation(new google.maps.LatLng(pos), claimedTerritory)) {
              console.log("User is outside the territory.");
              // Track the user's path outside the territory
              outsidePath.push(pos);

              // Update the polyline path with the new position
              const path = playerPathPolyline.getPath();
              path.push(new google.maps.LatLng(pos.lat, pos.lng));
            } else {
              // User re-enters the territory
              if (outsidePath.length > 0) {
                console.log("User re-entered the territory.");
                // Expand the territory to include the path
                expandTerritory();
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

// async function to calculate the average location
async function calculateAverageLocation(locations) {
  const sum = locations.reduce((acc, loc) => {
    acc.lat += loc.lat;
    acc.lng += loc.lng;
    return acc;
  }, { lat: 0, lng: 0 });

  return {
    lat: sum.lat / locations.length,
    lng: sum.lng / locations.length,
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

    const area = google.maps.geometry.spherical.computeArea(claimedTerritory.getPath().getArray());
    console.log("DEBUG TESTING SCORE: ", score);
    console.log("DBEUG TESTING SCORE CALCULATION: ", area);

    score += area;

    console.log("Territory expanded around:", userPosition);
    console.log("DEBUG CLAIMTERRITORY SCORE:", score);

    // Update the database with the territory claimed section
    // API URL for the backend
    const API_URL = 'https://run-for-your-life-api.onrender.com';
    
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      console.error("No user_id found in local storage!");
      return; // Stop execution if user_id is missing
    }
    try {
      // DB request to set the rank of the current user
      const response = await fetch(`${API_URL}/api/map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the user ID and rank number
        body: JSON.stringify({ user_id, score })
      });
    } catch (error) {
      console.error("Error:", error);
    }
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
    const newCoords = currentCoords.concat(outsidePath);

    // Create a new polygon with the expanded territory
    claimedTerritory.setMap(null); // Remove the previous territory
    claimedTerritory = new google.maps.Polygon({
      paths: newCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    claimedTerritory.setMap(map);

    // Calculate the expansion width and update the score
    const expansionWidth = google.maps.geometry.spherical.computeArea(outsidePath.getPath().getArray());
    score += expansionWidth;
    console.log("Territory expanded around:", userPosition);
    console.log("DEBUG EXPANDTERRITORY SCORE:", score);

    // Update the database with the territory claimed section
    // API URL for the backend
    const API_URL = 'https://run-for-your-life-api.onrender.com';
    // Retrieve the user_id from local storage
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      console.error("No user_id found in local storage!");
      return; // Stop execution if user_id is missing
    }
    try {
      // DB request to set the rank of the current user
      const response = await fetch(`${API_URL}/api/map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the user ID and rank number
        body: JSON.stringify({ user_id, score })
      });
    } catch (error) {
      console.error("Error:", error);
    }

    // Update the label position to the center of the new territory
    // const bounds = new google.maps.LatLngBounds();
    // newCoords.forEach(coord => bounds.extend(coord));
    // const center = bounds.getCenter();
    // if (territoryLabel) {
    //   territoryLabel.setMap(null);
    // }
    // territoryLabel = new TerritoryLabel(center, map, "Your Territory");
  } else {
    console.error("User position or outside path is not available.");
  }
}

// Custom OverlayView for the static label
// async function TerritoryLabel(position, map, text) {
//   this.position = position;
//   this.text = text;
//   this.div = null;
//   this.setMap(map);
// }

// TerritoryLabel.prototype = new google.maps.OverlayView();

// TerritoryLabel.prototype.onAdd = async function () {
//   const div = document.createElement('div');
//   div.style.position = 'absolute';
//   div.style.backgroundColor = 'white';
//   div.style.border = '1px solid black';
//   div.style.padding = '2px';
//   div.style.fontSize = '12px';
//   div.innerHTML = this.text;
//   this.div = div;

//   const panes = this.getPanes();
//   panes.overlayLayer.appendChild(div);
// };

// TerritoryLabel.prototype.draw = async function () {
//   const overlayProjection = this.getProjection();
//   const position = overlayProjection.fromLatLngToDivPixel(this.position);

//   const div = this.div;
//   div.style.left = position.x + 'px';
//   div.style.top = position.y + 'px';
// };

// TerritoryLabel.prototype.onRemove = async function () {
//   if (this.div) {
//     this.div.parentNode.removeChild(this.div);
//     this.div = null;
//   }
// };

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