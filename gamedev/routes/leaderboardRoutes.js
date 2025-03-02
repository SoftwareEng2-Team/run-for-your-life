import express from 'express';
import { getLeaderboard, setRank } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/', getLeaderboard);
router.post('/rank', setRank);

export default router;
