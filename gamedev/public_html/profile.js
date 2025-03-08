// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", async () => {
  //Clear the profile info on page load
  document.getElementById("username").textContent = "";
  document.getElementById("rank").textContent = "";
  document.getElementById("totalDistance").textContent = "";
  document.getElementById("totalClaimed").textContent = "";
  document.getElementById("achievements").innerHTML = "";

  // API URL for the backend
  const API_URL = "https://run-for-your-life-api.onrender.com";
  // Get the user ID from local storage
  const user_id = localStorage.getItem('user_id');

  // If no user is logged in...
  if (!user_id) {
    console.error("No user_id found in local storage!");
  } else {
    // If there is a territory to update
    if (localStorage.getItem('score') === 0 || localStorage.getItem('score') === null) {
      console.log("No territory to update, skipping query");
    } else {
      /* As long as the user is logged in, update the profile info 
        - Update the database with the territory claimed section */
      const score = localStorage.getItem('score');
      try {
        // DB request to set the territory of the current user
        let response = await fetch(`${API_URL}/api/map/territory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Send the user ID and territory claimed
          body: JSON.stringify({ user_id, score })
        });

        // Get the response from the query, reset the score to 0
        let data = await response.json();
        localStorage.setItem('score', 0);

        // If the response is successful, retrieve the profile information
        if (response.ok) {
          const distance_traveled = localStorage.getItem('distance_traveled');

          console.log("User id: ", user_id, "distance traveled", distance_traveled);
          // DB request to set the distance of the current user
          let response = await fetch(`${API_URL}/api/map/distance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Send the user ID and territory claimed
            body: JSON.stringify({ user_id, distance_traveled })
          });

          // Get the response from the query, reset the score to 0
          let data = await response.json();
          localStorage.setItem('distance_traveled', 0);

          if (response.ok) {

            // Retrieve the profile information for the user
            let response = await fetch(`${API_URL}/api/profile`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user_id })
            });

            // Get the profile data from the response
            const profile_data = await response.json();
            // Retrieve the total territory claimed and round it to 2 decimal places
            const terr_claimed_rounded = (profile_data.total_distance_claimed).toFixed(2);
            // As long as the response is successful, update the profile information
            if (response.ok) {
              // DB request to get player information to set the rank
              let response = await fetch(`${API_URL}/api/leaderboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              });

              // Get the result of the database query
              let data = await response.json();

              const rank = "Unranked";
              // Generate leaderboard cards dynamically
              data.forEach((player, index) => {
                if (player.user_id === user_id) {
                  rank = index + 1;
                  console.log("Set the rank of user:", user_id, " to", rank);
                }
              });

              // Console statments for debugging
              console.log("Successful profile update for user: ", user_id);
              console.log("Terr claimed: ", terr_claimed_rounded);
              // Update profile info
              document.getElementById("username").textContent = profile_data.username || "No user - sign in!";
              document.getElementById("rank").textContent = rank;
              document.getElementById("totalDistance").textContent = data.total_distance_ran ? `${data.total_distance_ran} miles` : "0";
              document.getElementById("totalClaimed").textContent = terr_claimed_rounded ? `${terr_claimed_rounded} sqft` : "0 sqft";
            }
          }
        }
        // Catch any errors
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  /* Modal (User Guide) Logi */
  // Get the HTML elements for the guide button and modal
  const guideButton = document.getElementById("guideButton");
  const guideModal = document.getElementById("guideModal");
  const closeButton = document.querySelector(".modal .close");

  // Event listeners for the guide button and close button
  guideButton.addEventListener("click", () => {
    guideModal.style.display = "block";
  });
  closeButton.addEventListener("click", () => {
    guideModal.style.display = "none";
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === guideModal) {
      guideModal.style.display = "none";
    }
  });
});