import express from 'express';
import { setTerrClaimed } from '../controllers/mapController.js';

const router = express.Router();
console.log("DEBUG: mapRoutes.js is entered. Hi Keona");
router.post('/', setTerrClaimed);

export default router;