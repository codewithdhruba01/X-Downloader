import { Router } from 'express';
import { downloadController, proxyDownloadController } from '../controllers/download';
import { downloadRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Rate limit this POST route and route it to the controller
router.post('/', downloadRateLimiter, downloadController);

// Proxy GET route to bypass twimg direct block
router.get('/proxy', proxyDownloadController);

export default router;
