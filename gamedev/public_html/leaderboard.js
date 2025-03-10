// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", async () => {
    // Clear any existing leaderboard data
    const leaderboardContainer = document.querySelector(".leaderboard-container");
    leaderboardContainer.innerHTML = "";
    // Set the API URL
    const API_URL = 'https://run-for-your-life-api.onrender.com';

    async function createLeaderboard() {
        /* Fetch leaderboard data from the backend */
        try {
            // DB request to get player information to set the leaderboard
            const response = await fetch(`${API_URL}/api/leaderboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Get the result of the database query
            const data = await response.json();

            let rank_set = 0;
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
                // Response is successful
                if (response.ok) {
                    console.log("Successful territory update for user: ", user_id);

                    const distance_traveled = localStorage.getItem('distance_traveled');

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
                        console.log("Successful distance traveled update for user: ", user_id);
                    }
                }
                    // Catch any fetching errors
                } catch (error) {
                    console.error("Error:", error);
                }
            }
    }
        createLeaderboard();
    });