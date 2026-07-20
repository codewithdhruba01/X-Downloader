import { Router } from 'express';
import { downloadController } from '../controllers/download';
import { downloadRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Rate limit this POST route and route it to the controller
router.post('/', downloadRateLimiter, downloadController);

export default router;
