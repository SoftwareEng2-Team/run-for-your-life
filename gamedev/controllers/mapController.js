import pool from '../../database/connection_pool.mjs';

// Set the user's territory claimed 
export const setTerrClaimed = async (req, res) => {
    // Get the user_id and total territory from the request body
    const { user_id, total_territory } = req.body;

    try {
        // Create the query
        const query = `
            WITH updated_territory AS (
                SELECT total_territory + $2 AS new_total_territory
                FROM users
                WHERE user_id = $1
            )   
            UPDATE users
            SET total_territory = (SELECT new_total_territory FROM updated_territory)
            WHERE user_id = $1;
        `;
        
        // Perform the query on the database
        const result = await pool.query(query, [user_id, total_territory]);

        // Check if any rows were updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Not NULL' });
        }
    } catch (error) {
        console.error("Database error setting the total_territory:", error);
        res.status(500).json({ error: error.message });
    }
};