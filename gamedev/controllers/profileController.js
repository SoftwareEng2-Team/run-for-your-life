import pool from '../../database/connection_pool.mjs';

// Fetch User Profile Information
export const getProfile = async (req, res) => {
    // Get the user_id from the request body
    const { user_id } = req.body;

    try {
        // Create the query
        const query =  `
            SELECT 
                u.username, 
                COALESCE(l.rank_num, 0) AS rank, 
                u.total_distance AS total_distance_ran, 
                COALESCE(l.total_territory, 0) AS total_distance_claimed
            FROM users u
            LEFT JOIN leaderboards l 
                ON u.user_id = l.user_id 
                AND l.week_start = (SELECT MAX(week_start) FROM leaderboards WHERE user_id = u.user_id)
            WHERE u.user_id = $1;
        `;


        // Perform the query on the database
        const { rows } = await pool.query(query, [user_id]);

        // If the user does not exist, return a 404 error
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return user profile data
        res.json(rows[0]);
        // An error occurred while fetching the user information, display to the user
    } catch (error) {
        console.error("Error fetching user information for profile page:", error);
        res.status(500).json({ error: error.message });
    }
};
