import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { apiRateLimiter } from './middleware/rateLimiter';
import downloadRouter from './routes/download';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// 1. Security Headers
app.use(helmet());

// 2. CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [CORS_ORIGIN];
      
      // During development, allow localhost variations
      if (NODE_ENV === 'development') {
        allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
      }

      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 3. Request Parsers
app.use(express.json());

// 4. Global Rate Limiting
app.use(apiRateLimiter);

// 5. Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'None'}`);
  next();
});

// 6. Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// 7. API Routes
app.use('/api/download', downloadRouter);

// 8. 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.method} ${req.path} not found.`
  });
});

// 9. Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'production' 
      ? 'A critical server error occurred.' 
      : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  logger.info(`Allowed CORS origin: ${CORS_ORIGIN}`);
});
