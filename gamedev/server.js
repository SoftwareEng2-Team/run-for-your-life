import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import runRoutes from './routes/runRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import mapRoutes from './routes/mapRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware (Placed **Before** Routes)
app.use((req, res, next) => {
    console.log("CORS Debugging: Incoming request from", req.headers.origin);

    // Allow only specific frontend origins
    const allowedOrigins = [
        "https://web.engr.oregonstate.edu",
        "https://run-for-your-life-frontend.onrender.com",
        "https://run-for-your-life.onrender.com"
    ];

    if (allowedOrigins.includes(req.headers.origin)) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");  // Required for cookies/auth headers
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle OPTIONS preflight requests properly
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/map', mapRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}...`);
});
