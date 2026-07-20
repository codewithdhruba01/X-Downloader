import { Request, Response } from 'express';
import { scrapeTweetVideo, extractTweetId } from '../services/twitter';
import { logger } from '../utils/logger';

/**
 * Handles video download requests.
 * Parses the Twitter/X URL, triggers extraction, and returns download variants.
 */
export async function downloadController(req: Request, res: Response): Promise<void> {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid Twitter/X post URL.'
      });
      return;
    }

    const tweetId = extractTweetId(url);
    if (!tweetId) {
      res.status(400).json({
        success: false,
        error: 'Invalid URL. Please enter a valid Twitter/X tweet URL (e.g., https://x.com/username/status/123456789).'
      });
      return;
    }

    const videoData = await scrapeTweetVideo(url);
    res.status(200).json(videoData);

  } catch (error: any) {
    const message = error.message || 'An unexpected error occurred while processing the video.';
    logger.error('Error in downloadController:', message);

    // Determine status code based on error type
    let statusCode = 500;
    if (
      message.includes('Invalid') ||
      message.includes('not contain a video') ||
      message.includes('does not contain any media') ||
      message.includes('not found') ||
      message.includes('No downloadable MP4')
    ) {
      statusCode = 400;
    }

    res.status(statusCode).json({
      success: false,
      error: message
    });
  }
}
