document.addEventListener("DOMContentLoaded", async () => {
    const leaderboardContainer = document.querySelector(".leaderboard-container");

    try {
        // Fetch leaderboard data from the backend
        const response = await fetch("https://run-for-your-life-api.onrender.com/api/leaderboard");
        const players = await response.json();

        // Sort players by score in descending order
        players.sort((a, b) => b.total_distance - a.total_distance);

        // Clear any existing leaderboard data
        leaderboardContainer.innerHTML = "";

        // Generate leaderboard cards dynamically
        players.forEach((player, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            let rank = "";
            let rank_id = "";
            if (index === 0) {
                card.classList.add("first-place-div");
                rank = "Rank 1";
                rank_id = "rank_1";
            } else if (index === 1) {
                card.classList.add("second-place-div");
                rank = "Rank 2";
                rank_id = "rank_2";
            } else if (index === 2) {
                card.classList.add("third-place-div");
                rank = "Rank 3";
                rank_id = "rank_3";
            }

            // Populate each card with player's data
            card.innerHTML = `
                <div class="top-row">
                    <p class="name">${player.username}</p>
                    <p class="score">${player.total_distance} mi.</p>
                </div>
                <p class="rank" id=${rank_id}>${rank}</p>
            `;

            leaderboardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
});
