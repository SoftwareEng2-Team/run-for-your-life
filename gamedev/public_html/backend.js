const API_URL = "https://run-for-your-life-api.onrender.com/api"; 

async function fetchLeaderboard() {
    try {
        let response = await fetch(`${API_URL}/leaderboard`);
        let data = await response.json();
        console.log("Leaderboard Data:", data);

        // Update leaderboard on webpage
        const leaderboardDiv = document.getElementById("leaderboard");
        leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";

        data.forEach((player, index) => {
            const entry = document.createElement("p");
            entry.textContent = `${index + 1}. ${player.username} - ${player.total_distance_km} km`;
            leaderboardDiv.appendChild(entry);
        });

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
}

// Run function on page load
window.onload = fetchLeaderboard;
