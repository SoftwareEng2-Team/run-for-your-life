const API_URL = "https://run-for-your-life-api.onrender.com/api";

export async function fetchLeaderboard() {
    try {
        let response = await fetch(`${API_URL}/leaderboard`);
        let data = await response.json();
        console.log("Leaderboard Data:", data);

        // Only run in a browser
        if (typeof window !== "undefined" && document) {
            const leaderboardDiv = document.getElementById("leaderboard");
            if (leaderboardDiv) {
                leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";
                data.forEach((player, index) => {
                    const entry = document.createElement("p");
                    entry.textContent = `${index + 1}. ${player.username} - ${player.total_distance_km} km`;
                    leaderboardDiv.appendChild(entry);
                });
            }
        }
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
}

// Only run in a browser
if (typeof window !== "undefined") {
    window.onload = fetchLeaderboard;
}
