import pool from '../../database/connection_pool.mjs';

export const setTerrClaimed = async (req, res) => {
    try {
        const { user_id, score } = req.body;

        const query = `
            WITH updated_leaderboard AS (
                INSERT INTO leaderboards (user_id, total_territory, rank_num, week_start)
                VALUES ($1, $2, NULL, CURRENT_DATE)
                ON CONFLICT (user_id, week_start) DO UPDATE
                SET total_territory = leaderboards.total_territory + EXCLUDED.total_territory
                WHERE leaderboards.user_id = EXCLUDED.user_id AND leaderboards.week_start = EXCLUDED.week_start
                RETURNING total_territory
            )
            UPDATE users
            SET total_territory = (SELECT COALESCE(SUM(total_territory), 0) FROM leaderboards WHERE user_id = $1)
            WHERE user_id = $1
            RETURNING total_territory;        
        `;

        const result = await pool.query(query, [user_id, score]);

        if (result.rowCount === 0 || result.rows[0].total_territory === null) {
            return res.status(404).json({ error: 'User not found or total_territory update failed' });
        }

        res.status(200).json({ 
            message: "User's territory claimed updated successfully", 
            total_territory: result.rows[0].total_territory 
        });
    } catch (error) {
        console.error("Database error setting the total_territory:", error);
        res.status(500).json({ error: error.message });
    }
};

export const setDistanceClaimed = async (req, res) => {
    try {
        const { user_id, distance_traveled } = req.body;

        if (isNaN(distance_traveled) || distance_traveled == null) {
            return res.status(400).json({ error: "Invalid distance_traveled value" });
        }
        
        const query = `
            UPDATE users
            SET total_distance = COALESCE(total_distance, 0) + $2
            WHERE user_id = $1
            RETURNING total_distance;        
        `;

        const result = await pool.query(query, [user_id, distance_traveled]);

        if (result.rowCount === 0 || result.rows[0].total_distance === null) {
            return res.status(404).json({ error: 'User not found or total_distance update failed' });
        }

        console.log("Debug: Updated total_distance in leaderboards:", result.rows[0].total_distance);
        res.status(200).json({ 
            message: "User's territory travelled updated successfully", 
            total_distance: result.rows[0].total_distance 
        });
    } catch (error) {
        console.error("Database error setting the total_distance:", error);
        res.status(500).json({ error: error.message });
    }
};