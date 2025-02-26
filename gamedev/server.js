import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import runRoutes from './routes/runRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "https://web.engr.oregonstate.edu",
        "https://run-for-your-life-frontend.onrender.com",
        "https://run-for-your-life.onrender.com",
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware so CORS headers are sent for all requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // ✅ Allows all origins (for testing)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();  // ✅ Responds successfully to preflight requests
    }
    next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
