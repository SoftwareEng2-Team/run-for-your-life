import express from 'express';
import { submitRun } from '../controllers/runController.js';

const router = express.Router();

router.post('/run', submitRun);

export default router;

