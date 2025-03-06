const client = await pool.connect();
try {
    await client.query('BEGIN'); 

    const query = `
        UPDATE users
        SET total_territory = total_territory + $2
        WHERE user_id = $1
        RETURNING total_territory;`
    ;

    const result = await client.query(query, [user_id, total_territory]);

    if (result.rowCount === 0) {
        throw new Error("User not found or update failed.");
    }

    await client.query('COMMIT');
    res.status(200).json({ message: "User's territory claimed updated successfully", total_territory: result.rows[0].total_territory });
} catch (error) {
    await client.query('ROLLBACK');  // Undo if error occurs
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
} finally {
    client.release(); 
}