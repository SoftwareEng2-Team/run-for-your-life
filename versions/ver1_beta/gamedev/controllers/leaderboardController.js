import pool from '../../database/connection_pool.mjs';

export const getLeaderboard = async (req, res) => {
    try {
        console.log("Fetching leaderboard data...");
        const result = await pool.query(
            "SELECT users.username, SUM(runs.distance_km) AS total_distance " +
            "FROM users JOIN runs ON users.user_id = runs.user_id " +
            "GROUP BY users.username ORDER BY total_distance DESC LIMIT 10;"
        );

        console.log("Leaderboard Data:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Database error fetching leaderboard:", error);
        res.status(500).json({ error: error.message });
    }
};

