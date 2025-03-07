// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", async () => {
    // Clear any existing leaderboard data
    const leaderboardContainer = document.querySelector(".leaderboard-container");
    leaderboardContainer.innerHTML = "";

    async function setRank(user_id, rank) {
        /* Set the rank to the database */
        // API URL for the backend
        const API_URL = 'https://run-for-your-life-api.onrender.com';
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
        // API URL for the backend
        const API_URL = 'https://run-for-your-life-api.onrender.com';
        try {
            // DB request to get player information to set the leaderboard
            const response = await fetch(`${API_URL}/api/leaderboard`, {
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

                // Console statements for debugging: attaches name and link to each other
                currindex = index + 1;
                console.log("name: ", player.username, " rank: ", currindex);

                // Round the total territory to 2 decimal places
                const total_territory_rounded = (player.total_territory).toFixed(2);

                // Populate each card with player's data
                card.innerHTML = `
                    <div class="top-row">
                    <p class="name">${player.username}</p>
                    <p class="score">${total_territory_rounded} sqft.</p>
                    </div>
                    <p class="rank" id=${rank_id}>${rank}</p>
                `;

                leaderboardContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

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
                - Update the database with the territory claimed section
                - Set the API URL for the backend */
            const API_URL = 'https://run-for-your-life-api.onrender.com';
            const score = localStorage.getItem('score');
            try {
                // DB request to set the territory of the current user
                const response = await fetch(`${API_URL}/api/map`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // Send the user ID and territory claimed
                    body: JSON.stringify({ user_id, score })
                });

                // Get the response from the query, reset the score to 0
                const data = await response.json();
                localStorage.setItem('score', 0);
                // Ensure that the response is successful
                if (response.ok) {
                    console.log("Successful territory update for user: ", user_id);
                }
            // Catch any fetching errors
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    createLeaderboard();
});