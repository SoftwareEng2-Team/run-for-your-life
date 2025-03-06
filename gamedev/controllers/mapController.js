export const setTerrClaimed = async (req, res) => {
    const { user_id, total_territory } = req.body;

    try {
        const query = `
            WITH updated_leaderboard AS (
                INSERT INTO leaderboards (user_id, total_territory, rank_num, week_start)
                VALUES ($1, $2, NULL, CURRENT_DATE)
                ON CONFLICT (user_id) DO UPDATE 
                SET total_territory = leaderboards.total_territory + EXCLUDED.total_territory
                RETURNING total_territory
            )
            UPDATE users
            SET total_territory = (SELECT MAX(total_territory) FROM leaderboards WHERE user_id = $1)
            WHERE user_id = $1
            RETURNING total_territory;
        `;

        const result = await pool.query(query, [user_id, total_territory]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found or total_territory update failed' });
        }

        console.log("Debug: Updated total_territory in leaderboards:", result.rows[0].total_territory);
        res.status(200).json({ 
            message: "User's territory claimed updated successfully", 
            total_territory: result.rows[0].total_territory 
        });
    } catch (error) {
        console.error("Database error setting the total_territory:", error);
        res.status(500).json({ error: error.message });
    }
};
