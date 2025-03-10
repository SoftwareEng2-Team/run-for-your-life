import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

router.post('/', getLeaderboard);

export default router;
