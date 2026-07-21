import { Router } from 'express';
import { analyzeController } from '../controllers/analyze';
import { downloadRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Rate limit this POST route and route it to the controller
router.post('/', downloadRateLimiter, analyzeController);

export default router;
