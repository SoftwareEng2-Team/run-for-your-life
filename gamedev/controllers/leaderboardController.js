import pool from '../../database/connection_pool.mjs';

export const getLeaderboard = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT users.username, SUM(distance) as total_distance
             FROM runs
             JOIN users ON users.user_id = runs.user_id
             GROUP BY users.username
             ORDER BY total_distance DESC
             LIMIT 10`
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Database error fetching leaderboard" });
    }
};
