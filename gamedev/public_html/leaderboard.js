document.addEventListener("DOMContentLoaded", async () => {
    // API URL for the backend
    const API_URL = 'https://run-for-your-life-api.onrender.com';

    // Clear any existing leaderboard data
    const leaderboardContainer = document.querySelector(".leaderboard-container");
    leaderboardContainer.innerHTML = "";

    async function setRank(user_id, rank) {
        /* Set the rank to the database */
        try {
            // DB request to set the rank of the current user
            const response = await fetch(`${API_URL}/api/leaderboard/rank`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Send the user ID and rank number
                body: JSON.stringify({ user_id, rank })
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function createLeaderboard() {
        /* Fetch leaderboard data from the backend */
        try {
            // DB request to get player information to set the leaderboard
            const response = await fetch(`${API_URL}/api/leaderboard/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Get the result of the database query
            const data = await response.json();

            // Generate leaderboard cards dynamically
            data.forEach((player, index) => {
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

                // Set rank for the user in the database
                setRank(player.user_id, index + 1);

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
            console.error("Error:", error);
        }
    }

    createLeaderboard();
});