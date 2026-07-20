const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface VideoVariant {
  quality: string;
  url: string;
  bitrate?: number;
}

export interface TweetVideoResponse {
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
 * Sends a POST request to the backend server to extract video streams from a tweet URL.
 * 
 * @param tweetUrl The Twitter/X URL to process
 */
export async function downloadTweetVideo(tweetUrl: string): Promise<TweetVideoResponse> {
  const response = await fetch(`${API_BASE_URL}/api/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: tweetUrl }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to parse video. Please verify the URL.');
  }

  return data;
}
