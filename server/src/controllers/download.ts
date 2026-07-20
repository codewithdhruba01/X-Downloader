import { Request, Response } from 'express';
import { scrapeTweetVideo, extractTweetId } from '../services/twitter';
import { logger } from '../utils/logger';
import axios from 'axios';

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

/**
 * Proxies twimg video stream to bypass CORS / HTTP 403 authorization blocks.
 */
export async function proxyDownloadController(req: Request, res: Response): Promise<void> {
  try {
    const videoUrl = req.query.url as string;
    if (!videoUrl) {
      res.status(400).json({ error: 'Video URL is required' });
      return;
    }

    // Basic validation to check that the URL points to a trusted Twitter/X video host
    const parsedUrl = new URL(videoUrl);
    if (!parsedUrl.hostname.endsWith('twimg.com')) {
      res.status(400).json({ error: 'Invalid video URL host' });
      return;
    }

    logger.info(`Proxying video download for: ${videoUrl}`);

    // Fetch video stream from twimg
    const response = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://twitter.com/',
      }
    });

    // Set headers to trigger file download in browser
    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', typeof contentType === 'string' ? contentType : 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="x-media-${Date.now()}.mp4"`);

    response.data.pipe(res);
  } catch (error: any) {
    logger.error('Video proxy download error:', error.message || error);
    res.status(500).json({ error: 'Failed to download video stream.' });
  }
}
