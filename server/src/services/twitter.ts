import axios from 'axios';
import { getToken } from '../utils/token';
import { logger } from '../utils/logger';

export interface VideoVariant {
  quality: string;
  url: string;
  bitrate?: number;
  size?: string; // Optional: estimated or formatted size if we want to calculate it
}

export interface TweetVideoData {
  success: boolean;
  author: string;
  authorName: string;
  avatar?: string;
  thumbnail: string;
  description: string;
  durationMs?: number;
  videos: VideoVariant[];
}

/**
 * Extracts the tweet ID from a Twitter/X URL.
 * Supports various formats:
 * - https://twitter.com/username/status/123456789
 * - https://x.com/username/status/123456789
 * - https://mobile.twitter.com/username/status/123456789
 * - Just the raw numeric ID: 123456789
 */
export function extractTweetId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  
  // Check if it's already a numeric string
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }
  
  // Match the status/ID part of the URL
  const match = trimmed.match(/\/status\/(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Parses the video quality resolution from the stream URL.
 * Twitter URLs usually look like: .../vid/640x360/...mp4 or .../vid/1280x720/...mp4
 */
function getQualityFromUrl(url: string, bitrate?: number): string {
  const match = url.match(/\/vid\/(\d+)x(\d+)\//);
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    // Quality is defined by the vertical resolution (or the minimum of the two dimensions)
    const minDim = Math.min(width, height);
    return `${minDim}p`;
  }
  
  // Fallback based on bitrate
  if (bitrate) {
    if (bitrate >= 2000000) return '1080p';
    if (bitrate >= 1000000) return '720p';
    if (bitrate >= 500000) return '480p';
    return '360p';
  }
  
  return 'SD';
}

/**
 * Fetches and extracts video streams from a tweet using the Twitter Syndication API.
 */
export async function scrapeTweetVideo(url: string): Promise<TweetVideoData> {
  const tweetId = extractTweetId(url);
  if (!tweetId) {
    throw new Error('Invalid Twitter/X URL. Could not extract Tweet ID.');
  }

  const token = getToken(tweetId);
  const syndicationUrl = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=${token}&lang=en`;

  logger.info(`Fetching tweet data for ID: ${tweetId} from Syndication API`);

  try {
    const response = await axios.get(syndicationUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://platform.twitter.com',
        'Referer': 'https://platform.twitter.com/',
      },
      timeout: 10000 // 10s timeout
    });

    const data = response.data;
    if (!data) {
      throw new Error('Received empty response from Twitter Syndication.');
    }

    // Extract description & user details
    const description = data.text || '';
    const author = data.user?.screen_name || 'unknown';
    const authorName = data.user?.name || 'Unknown User';
    const avatar = data.user?.profile_image_url_https || '';

    // Check if tweet has media
    if (!data.mediaDetails || !Array.isArray(data.mediaDetails) || data.mediaDetails.length === 0) {
      throw new Error('This tweet does not contain any media.');
    }

    // Find the first media item that is a video or animated gif
    const videoMedia = data.mediaDetails.find(
      (media: any) => media.type === 'video' || media.type === 'animated_gif'
    );

    if (!videoMedia) {
      throw new Error('This tweet does not contain a video or GIF.');
    }

    const thumbnail = videoMedia.media_url_https || '';
    const durationMs = videoMedia.video_info?.duration_millis || undefined;
    const variants = videoMedia.video_info?.variants;

    if (!variants || !Array.isArray(variants)) {
      throw new Error('No video streams found for this tweet.');
    }

    // Extract MP4 variants and format them
    const mp4Videos: VideoVariant[] = variants
      .filter((variant: any) => variant.content_type === 'video/mp4')
      .map((variant: any) => {
        const quality = getQualityFromUrl(variant.url, variant.bitrate);
        return {
          quality,
          url: variant.url,
          bitrate: variant.bitrate
        };
      });

    if (mp4Videos.length === 0) {
      // In case there are no MP4 variants, look for any other playable formats
      throw new Error('No downloadable MP4 video qualities were found.');
    }

    // Sort by bitrate descending (highest quality first)
    mp4Videos.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));

    // Remove duplicates based on quality label, keeping the one with higher bitrate
    const uniqueVideos: VideoVariant[] = [];
    const seenQualities = new Set<string>();

    for (const video of mp4Videos) {
      if (!seenQualities.has(video.quality)) {
        seenQualities.add(video.quality);
        uniqueVideos.push(video);
      }
    }

    return {
      success: true,
      author,
      authorName,
      avatar,
      thumbnail,
      description,
      durationMs,
      videos: uniqueVideos
    };

  } catch (error: any) {
    logger.error(`Error scraping tweet ID ${tweetId}:`, error.message);
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Tweet not found. Ensure the URL is correct and the tweet is public.');
      }
      throw new Error(`Failed to retrieve tweet data (HTTP ${error.response.status}).`);
    }
    throw error;
  }
}
