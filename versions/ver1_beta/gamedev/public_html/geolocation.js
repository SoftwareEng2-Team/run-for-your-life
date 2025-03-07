let map;
// The player's draggable marker
let draggableMarker;
// Info window for current location
let openlocationwindow = null;
// Marker for the user's current location
let userLocationMarker;
// Array to store trail markers
let trailMarkers = [];
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

async function initMap() {
  // Bounding Box for the OSU Campus
  const osuBounds = {
    // Coordinates for the map boundary
    north: 44.56788,
    south: 44.55726,
    east: -123.27163,
    west: -123.28965
  };

  // Initialize the map with the boundary
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.5646, lng: -123.2620 },
    zoom: 16,
    restriction: {
      latLngBounds: osuBounds,
      strictBounds: true,
    },
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

  // Function to update the user's location
  function updateLocation() {
    if (navigator.geolocation) {
      // Use the Geolocation API to get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          userPosition = pos; // Store the user's current position

          // For debugging purposes, update the console periodically with the user's position
          console.log("User position:", pos);

          // If the user is currently outside of the OSU campus bounds, notify them
          if (pos.lat < osuBounds.south || pos.lat > osuBounds.north ||
            pos.lng < osuBounds.west || pos.lng > osuBounds.east) {
            console.log("Location is outside OSU campus. Stay within the boundary.");
            return;
          }

          previousPosition = pos;

          // Store the user's location in the array
          locationHistory.push(pos);

          // If the array length is 5 (5 seconds), calculate the average location and place a marker
          if (locationHistory.length === 5) {
            const avgLocation = calculateAverageLocation(locationHistory);
            placeAverageLocationMarker(avgLocation);
            locationHistory = []; // Clear the array
          }

          if (!userLocationMarker) {
            console.log("Creating user location marker");
            userLocationMarker = new google.maps.Marker({
              position: pos,
              map: map,
              title: "Your Location",
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
            });
          } else {
            console.log("Updating user location marker position");
            userLocationMarker.setPosition(pos);
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
            } else {
              // User re-enters the territory
              if (outsidePath.length > 0) {
                console.log("User re-entered the territory.");
                // Expand the territory to include the path
                expandTerritory();
                // Clear the outside path
                outsidePath = [];
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
          timeout: 1000,
        }
      );
    } else {
      console.error("Browser doesn't support Geolocation");
    }
  }

  // Update the user's location every second
  setInterval(updateLocation, 1000);
}

// Function to calculate the average location
function calculateAverageLocation(locations) {
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

// Function to place a marker at the average location
function placeAverageLocationMarker(location) {
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

function claimTerritory() {
  if (userPosition) {
    const squareSize = 0.0002; // Size of the square in degrees (approx. 50 meters)
    const squareCoords = [
      { lat: userPosition.lat + squareSize, lng: userPosition.lng - squareSize },
      { lat: userPosition.lat + squareSize, lng: userPosition.lng + squareSize },
      { lat: userPosition.lat - squareSize, lng: userPosition.lng - squareSize },
      { lat: userPosition.lat - squareSize, lng: userPosition.lng + squareSize } // Closing the square
    ];

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
  } else {
    console.error("User position is not available.");
  }
}

function expandTerritory() {
  if (userPosition && outsidePath.length > 0) {
    // Get the current territory coordinates
    const currentCoords = claimedTerritory.getPath().getArray();
    // Add the outside path to the current territory
    const newCoords = currentCoords.concat(outsidePath);

    // Create a new polygon with the expanded territory
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
    const expansionWidth = google.maps.geometry.spherical.computeLength(outsidePath);
    score += expansionWidth;
    console.log("Territory expanded around:", userPosition);
    console.log("Current score:", score);
  } else {
    console.error("User position or outside path is not available.");
  }
}

// Error handling for geolocation
function handleLocationError(browserHasGeolocation, current_location_window, pos) {
  current_location_window.setPosition(pos);
  current_location_window.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  current_location_window.open(map);
}