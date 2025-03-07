import express from 'express';
import { setTerrClaimed } from '../controllers/mapController.js';

const router = express.Router();
router.post('/', setTerrClaimed);

export default router;