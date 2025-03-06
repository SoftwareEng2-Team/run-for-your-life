import pool from '../../database/connection_pool.mjs';

// Set the user's territory claimed 
export const setTerrClaimed = async (req, res) => {
    // Get the user_id and total territory from the request body
    const { user_id, total_territory } = req.body;

    try {
        // Create the query
        const query = `
            UPDATE users
            SET total_territory = total_territory + $2
            WHERE user_id = $1
            RETURNING total_territory;
        `;
        
        // Perform the query on the database
        const result = await pool.query(query, [user_id, total_territory]);

        res.status(200).json({ message: "User's territory claimed updated successfully", total_territory: result.total_territory  });
    } catch (error) {
        console.error("Database error setting the total_territory:", error);
        res.status(500).json({ error: error.message });
    }
};