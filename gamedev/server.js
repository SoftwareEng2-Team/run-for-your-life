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

// Async CORS Middleware
const asyncCors = (req, res, next) => {
    return new Promise((resolve, reject) => {
        cors({
            origin: [
                "https://web.engr.oregonstate.edu",
                "https://run-for-your-life-frontend.onrender.com",
                "https://run-for-your-life.onrender.com",
            ],
            methods: "GET,POST,PUT,DELETE",
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true
        })(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
                next();
            }
        });
    }).catch((error) => {
        console.error("CORS error:", error);
        res.status(500).json({ error: "CORS middleware failed" });
    });
};

app.use(async (req, res, next) => {
    await asyncCors(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Async Middleware to Ensure CORS Headers Are Sent for All Requests
app.use(async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        next();
    } catch (error) {
        console.error("CORS Middleware Error:", error);
        res.status(500).json({ error: "CORS middleware failed" });
    }
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/map', mapRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
