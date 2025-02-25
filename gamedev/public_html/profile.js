<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", async () => {
  // Clear all text fields 
  document.getElementById("username").textContent = "";
  document.getElementById("rank").textContent = "";
  document.getElementById("totalDistance").textContent = "";
  document.getElementById("totalClaimed").textContent = "";
  //document.getElementById("knockouts").textContent = "";
  document.getElementById("achievements").innerHTML = "";

  // API URL for the backend
  const API_URL = 'https://run-for-your-life-api.onrender.com';
  // Retrieve the user_id from local storage
  const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    console.error("No user_id found in local storage!");
    return; // Stop execution if user_id is missing
  }

  try {
    // DB request to get profile information for the current user
    const response = await fetch(`${API_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send the user ID
      body: JSON.stringify({ user_id })
    });

    // Get the result of the database query
    const data = await response.json();
    // Debugging statements
    console.log("user_id: ", user_id);
    console.log("username: ", data.username);
    console.log("rank: ", data.rank_num);
    console.log("totalDistance: ", data.totalDistance);

    // Update the profile info section.
    document.getElementById("username").textContent = data.username || "No user - sign in!";
    document.getElementById("rank").textContent = data.rank_num ? "#" + data.rank_num : "No rank yet!";

    // Update the stats section.
    document.getElementById("totalDistance").textContent = data.totalDistance ? data.totalDistance + " miles" : "0";
    document.getElementById("totalClaimed").textContent = data.totalClaimed ? data.totalClaimed + " sqft" : "0";
    //document.getElementById("knockouts").textContent = data.knockouts || "";

  } catch (error) {
    console.error("Error:", error);
  }

  // Modal (User Guide) Logic
  const guideButton = document.getElementById("guideButton");
  const guideModal = document.getElementById("guideModal");
  const closeButton = document.querySelector(".modal .close");

  // Open modal when button is clicked
  guideButton.addEventListener("click", () => {
    guideModal.style.display = "block";
  });

  // Close modal when the close button (×) is clicked
  closeButton.addEventListener("click", () => {
    guideModal.style.display = "none";
  });

  // Close modal if user clicks outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === guideModal) {
      guideModal.style.display = "none";
    }
  });
  // Update the achievements section.
  /*const achievementsContainer = document.getElementById("achievements");
  if (data.achievements && Array.isArray(data.achievements)) {
    achievementsContainer.innerHTML = data.achievements.map(achievement => `
            <div class="achievement">
              <p>${achievement.text}</p>
              <img src="images/${achievement.completed ? "check-icon.png" : "x-icon.png"}" class="status-icon" alt="${achievement.completed ? "Completed" : "Not Completed"}">
            </div>
          `).join("");
  } else {
    achievementsContainer.innerHTML = ""; 
  } */
});
=======
document.addEventListener("DOMContentLoaded", () => {
    // Mock user data (replace with backend fetch calls later)
    const userData = {
        username: "John11",
        name: "John Doe",
        rank: "#3",
        distanceRan: "25 miles",
        distanceClaimed: "696m sqft",
        knockouts: "8",
        achievements: [true, false, true] // True = completed, False = not completed
    };

    // Update profile info
    document.getElementById("username").innerText = userData.username;
    document.getElementById("name").innerText = userData.name;
    document.getElementById("rank").innerText = userData.rank;
    document.getElementById("distanceRan").innerText = userData.distanceRan;
    document.getElementById("distanceClaimed").innerText = userData.distanceClaimed;
    document.getElementById("knockouts").innerText = userData.knockouts;

    // Update achievements
    const achievementIcons = document.querySelectorAll(".status-icon");
    userData.achievements.forEach((status, index) => {
        achievementIcons[index].src = status ? "images/check-icon.png" : "images/x-icon.png";
        achievementIcons[index].alt = status ? "Completed" : "Not Completed";
    });
});
>>>>>>> c2cd1bf (Updated profile page layout, styling, and icons)
