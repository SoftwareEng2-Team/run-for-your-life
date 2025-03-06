import pool from '../../database/connection_pool.mjs';

// Set the user's territory claimed 
export const setTerrClaimed = async (req, res) => {
    // Get the user_id and total territory from the request body
    const { user_id, total_territory } = req.body;

    try {
        // Create the query
        const query = `
            WITH updated_leaderboard AS (
                INSERT INTO leaderboards (user_id, total_territory, rank_num, week_start)
                VALUES ($1, $2, NULL, CURRENT_DATE)
                ON CONFLICT (user_id, week_start) DO UPDATE 
                SET total_territory = leaderboards.total_territory + EXCLUDED.total_territory
                RETURNING total_territory
            )
            UPDATE users
            SET total_territory = (SELECT total_territory FROM updated_leaderboard)
            WHERE user_id = $1
            RETURNING total_territory;
        `;
        
        // Perform the query on the database
        const result = await pool.query(query, [user_id, total_territory]);

        // Check if any rows were updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Not NULL' });
        }

        res.status(200).json({ message: "User's territory claimed updated successfully", total_territory: result.rows[0].total_territory  });
    } catch (error) {
        console.error("Database error setting the total_territory:", error);
        res.status(500).json({ error: error.message });
    }
};