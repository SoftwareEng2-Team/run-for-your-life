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
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers and options set up
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();  
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