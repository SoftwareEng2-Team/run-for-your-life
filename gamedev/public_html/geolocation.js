// Map variable
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

          // For debugging purposes, update the console periodically with the user's position
          console.log("User position:", pos);

          // If the user is currently outside of the OSU campus bounds, notify them
          if (pos.lat < osuBounds.south || pos.lat > osuBounds.north ||
            pos.lng < osuBounds.west || pos.lng > osuBounds.east) {
            console.log("Location is outside OSU campus. Stay within the boundary.");
            return;
          }

          // Check if the position has changed significantly
          if (previousPosition) {
            const latDiff = Math.abs(pos.lat - previousPosition.lat);
            const lngDiff = Math.abs(pos.lng - previousPosition.lng);
            if (latDiff < 0.0001 && lngDiff < 0.0001) {
              console.log("Position change is too small, not updating.");
              return;
            }
          }

          // Update the previous position
          previousPosition = pos;

          // Create a new marker for the trail
          const trailMarker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "Trail Marker",
            // Set the icon to the green dot icon provided by Google
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
          });
          trailMarkers.push(trailMarker);

          // If a location marker does not exist, create one
          if (!userLocationMarker) {
            console.log("Creating user location marker");
            userLocationMarker = new google.maps.Marker({
              position: pos,
              map: map,
              title: "Your Location",
              // Set the icon to the blue dot icon provided by Google
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
            });
          } else {
            console.log("Updating user location marker position");
            userLocationMarker.setPosition(pos);
          }

          current_location_window.setPosition(pos);
          current_location_window.setContent("Current Location");
          current_location_window.open(map);
          openlocationwindow = current_location_window;
          map.setCenter(pos);
        },
        (error) => {
          console.error("Error getting position:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
      // An error with the browser occured - it does not support geolocation
    } else {
      console.error("Browser doesn't support Geolocation");
    }
  }

  // Update the user's location every 5-10 seconds
  setInterval(updateLocation, 5000);
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