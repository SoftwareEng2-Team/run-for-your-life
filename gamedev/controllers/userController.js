import pool from '../../database/connection_pool.mjs';
import bcrypt from 'bcrypt';

// User Registration
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id`,
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully", user_id: result.rows[0].user_id });
    // Console log any database issues
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Database error during registration" });
    }
};

// User Login controller function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetching user by email
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = result.rows[0];

        // Comparing hashed password (using bcrypt to encrypt)
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user_id: user.user_id });
    // Console log any database issues
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Database error during login" });
    }
};
