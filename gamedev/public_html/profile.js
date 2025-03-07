document.addEventListener("DOMContentLoaded", async () => {

  document.getElementById("username").textContent = "";
  document.getElementById("rank").textContent = "";
  document.getElementById("totalDistance").textContent = "";
  document.getElementById("totalClaimed").textContent = "";
  document.getElementById("achievements").innerHTML = "";

  // API URL for the backend
  const API_URL = "https://run-for-your-life-api.onrender.com";
  const user_id = localStorage.getItem('user_id');

  if (!user_id) {
    console.error("No user_id found in local storage!");
  } else {
    // Update the database with the territory claimed section
    // API URL for the backend
    // const API_URL = 'https://run-for-your-life-api.onrender.com'; <-- REDUNDANT LINE -CONNOR
    const score = localStorage.getItem('score');
    try {
      // DB request to set the rank of the current user
      const response = await fetch(`${API_URL}/api/map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the user ID and rank number
        body: JSON.stringify({ user_id, score })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Successful score setting!");

        const response = await fetch(`${API_URL}/api/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id })
        });

        const profile_data = await response.json();
        if (response.ok) {
          console.log("Successful profile update for user: ", user_id);
          console.log("Terr claimed: ", profile_data.total_distance_claimed);
          // Update profile info
          document.getElementById("username").textContent = profile_data.username || "No user - sign in!";
          document.getElementById("rank").textContent = profile_data.rank ? `#${profile_data.rank}` : "No rank yet!";
          //document.getElementById("totalDistance").textContent = data.total_distance_ran ? `${data.total_distance_ran} miles` : "0";
          document.getElementById("totalClaimed").textContent = profile_data.total_distance_claimed ? `${profile_data.total_distance_claimed} sqft` : "0 sqft";
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // try {
  //   // Delay to ensure database updates are reflected
  //   setTimeout(async () => {
  //     await fetchUserProfile(API_URL, user_id);
  //   }, 500); // 500ms delay to allow DB updates
  // } catch (error) {
  //   console.error("Error initializing profile:", error);
  // }

  // Modal (User Guide) Logic
  const guideButton = document.getElementById("guideButton");
  const guideModal = document.getElementById("guideModal");
  const closeButton = document.querySelector(".modal .close");

  guideButton.addEventListener("click", () => {
    guideModal.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    guideModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === guideModal) {
      guideModal.style.display = "none";
    }
  });
});

// Function to fetch user profile
// async function fetchUserProfile(API_URL, user_id) {
//   try {
//     // Fetch user profile data from API
//     const response = await fetch(`${API_URL}/api/profile`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ user_id })
//     });

//     const data = await response.json();
//     console.log("Debug: API response for profile:", data);

//     // Remove previous cache to prevent outdated data
//     localStorage.removeItem("total_territory");

//     // Store the latest total distance claimed to prevent it from resetting
//     if (data.total_territory !== null) {
//       localStorage.setItem("total_territory", data.total_territory);
//     }

//     // Retrieve last known total_claimed in case of null response
//     localStorage.removeItem("total_territory");
//     fetchUserProfile(API_URL, user_id);

//     // Update profile info
//     document.getElementById("username").textContent = data.username || "No user - sign in!";
//     document.getElementById("rank").textContent = data.rank ? `#${data.rank}` : "No rank yet!";
//     document.getElementById("totalDistance").textContent = data.total_distance_ran ? `${data.total_distance_ran} miles` : "0";
//     document.getElementById("totalClaimed").textContent = storedClaimed ? `${storedClaimed} sqft` : "0 sqft";

//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//   }
// }