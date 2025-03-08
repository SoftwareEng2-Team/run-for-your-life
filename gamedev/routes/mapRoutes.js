import express from 'express';
import { setTerrClaimed, setDistanceClaimed } from '../controllers/mapController.js';

const router = express.Router();
router.post('/territory', setTerrClaimed);
router.post('/distance', setDistanceClaimed);

export default router;