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

export interface ContentPillar {
  title: string;
  percentage: number;
  description: string;
}

export interface ChecklistItem {
  task: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface TweetTemplate {
  title: string;
  hook: string;
  structure: string;
  example: string;
}

export interface ProfileAnalysisResponse {
  success: boolean;
  username: string;
  avatarUrl: string;
  niche: string;
  followerCount: string;
  auditScore: {
    overall: number;
    bio: number;
    avatar: number;
    banner: number;
    pinnedPost: number;
  };
  metrics: {
    engagementRate: string;
    profileConversion: string;
    avgLikes: number;
    avgRetweets: number;
    monthlyImpressions: string;
  };
  strategy: {
    nicheFocus: string;
    growthBottleneck: string;
    primaryGoal: string;
    contentPillars: ContentPillar[];
  };
  checklist: ChecklistItem[];
  templates: TweetTemplate[];
  schedule: {
    timezone: string;
    times: string[];
    frequency: string;
  };
  recommendations: string[];
}

/**
 * Sends a POST request to the backend server to analyze an X/Twitter profile.
 */
export async function analyzeProfile(
  username: string,
  niche: string,
  followerCount: string
): Promise<ProfileAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, niche, followerCount }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to analyze profile. Please try again.');
  }

  return data;
}

