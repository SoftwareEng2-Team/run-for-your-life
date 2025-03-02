import pool from '../../database/connection_pool.mjs';

// Fetch Leaderboard Information
export const getLeaderboard = async (req, res) => {
    try {
        // Create the query
        const query = `
            UPDATE leaderboards
            SET rank_num = $2
            WHERE user_id = $1;
        `;

        // Perform the query on the database
        const result = await pool.query(query, [user_id, rank_num]);
    // An error occurred while fetching the leaderboard information, display to the user
    } catch (error) {
        console.error("Database error fetching leaderboard:", error);
        res.status(500).json({ error: error.message });
    }
};

export const setRank = async (req, res) => {
    try {
        // Create the query

        // An error occurred while setting the user rank, display to the user
    } catch (error) {
        console.error("Database error setting the rank:", error);
        res.status(500).json({ error: error.message });
    }
}