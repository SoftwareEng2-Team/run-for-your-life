import pool from '../../database/connection_pool.mjs';

// Set the user's rank
export const setRank = async (req, res) => {
    // Get the user_id from the request body
    const { user_id, rank_num } = req.body;

    try {
        // Create the query
        const query = `
            UPDATE leaderboards
            SET rank_num = $2
            WHERE user_id = $1
            RETURNING rank_num;
        `;

        // Perform the query on the database
        const result = await pool.query(query, [user_id, rank_num]);

        // If no rows were updated, return an error
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found in leaderboard" });
        }

        // Send the updated rank to the client
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error setting the rank:", error);
        res.status(500).json({ error: error.message });
    }
};

// Fetch Leaderboard Information
export const getLeaderboard = async (req, res) => {
    try {
        // Create the query
        const query = `
            SELECT 
                u.user_id, 
                u.username, 
                COALESCE(l.total_territory, 0) AS total_territory,
                RANK() OVER (ORDER BY COALESCE(l.total_territory, 0) DESC) AS rank
            FROM users u
            LEFT JOIN leaderboards l ON u.user_id = l.user_id
            ORDER BY total_territory DESC;
        `;

        // Perform the query on the database
        const { rows } = await pool.query(query);

        // If the leaderboard info does not exist, return a 404 error
        if (rows.length === 0) {
            return res.status(404).json({ error: "Leaderboard info not found" });
        }

        // Return user leaderboard data
        res.json(rows);
    // An error occurred while getting leaderboard information, display to the user
    } catch (error) {
        console.error("Database error fetching leaderboard:", error);
        res.status(500).json({ error: error.message });
    }
}