import pool from '../../database/connection_pool.mjs';

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