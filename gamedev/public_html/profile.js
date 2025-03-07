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