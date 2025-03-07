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
    return; // Stop execution if user_id is missing
  }

  try {
    // Delay to ensure database updates are reflected
    setTimeout(async () => {
      await fetchUserProfile(API_URL, user_id);
    }, 500); // 500ms delay to allow DB updates
  } catch (error) {
    console.error("Error initializing profile:", error);
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

// Function to fetch user profile
async function fetchUserProfile(API_URL, user_id) {
  try {
    // Fetch user profile data from API
    const response = await fetch(`${API_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id })
    });

    const data = await response.json();
    console.log("Debug: API response for profile:", data);

    // Remove previous cache to prevent outdated data
    localStorage.removeItem("total_distance_claimed");

    // Store the latest total distance claimed to prevent it from resetting
    if (data.total_distance_claimed !== null) {
      localStorage.setItem("total_distance_claimed", data.total_distance_claimed);
    }

    // Retrieve last known total_claimed in case of null response
    localStorage.removeItem("total_distance_claimed"); 
    fetchUserProfile(API_URL, user_id);  

    // Update profile info
    document.getElementById("username").textContent = data.username || "No user - sign in!";
    document.getElementById("rank").textContent = data.rank ? `#${data.rank}` : "No rank yet!";
    document.getElementById("totalDistance").textContent = data.total_distance_ran ? `${data.total_distance_ran} miles` : "0";
    document.getElementById("totalClaimed").textContent = storedClaimed ? `${storedClaimed} sqft` : "0 sqft";

  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}