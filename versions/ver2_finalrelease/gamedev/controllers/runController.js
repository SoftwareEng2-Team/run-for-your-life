import pool from '../../database/connection_pool.mjs';

// Query for submitting a run (NEVER FULLY INTEGRATED)
export const submitRun = async (req, res) => {
    const { user_id, start_time, end_time, distance, route_coords } = req.body;

    // Query for inserting the user id, start time, end time, distance, and route cords
    try {
        const result = await pool.query(
            `INSERT INTO runs (user_id, start_time, end_time, distance, route_coords)
             VALUES ($1, $2, $3, $4, $5) RETURNING run_id`,
            [user_id, start_time, end_time, distance, JSON.stringify(route_coords)]
        );

        res.status(201).json({ message: "Run saved successfully", run_id: result.rows[0].run_id });
    // Console log any database or query errors
    } catch (error) {
        console.error("Error saving run:", error);
        res.status(500).json({ error: "Database error saving run" });
    }
};
