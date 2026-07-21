import { Request, Response } from 'express';
import { logger } from '../utils/logger';

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

export interface AnalysisResponse {
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

export async function analyzeController(req: Request, res: Response): Promise<void> {
  try {
    const { username, niche, followerCount } = req.body;

    if (!username || typeof username !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid Twitter/X username.'
      });
      return;
    }

    const cleanUsername = username.replace(/^@/, '').trim();
    if (!/^[a-zA-Z0-9_]{1,15}$/.test(cleanUsername)) {
      res.status(400).json({
        success: false,
        error: 'Invalid Twitter/X username format.'
      });
      return;
    }

    logger.info(`Analyzing X profile for user: @${cleanUsername} in niche: ${niche}`);

    // Try to get a real avatar using unavatar.io
    const avatarUrl = `https://unavatar.io/twitter/${cleanUsername}?fallback=https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png`;

    // Calculate simulated parameters based on follower tier and niche to make it feel extremely realistic
    let bioScore = 70 + Math.floor(Math.random() * 20);
    let avatarScore = 75 + Math.floor(Math.random() * 20);
    let bannerScore = 60 + Math.floor(Math.random() * 30);
    let pinnedPostScore = 55 + Math.floor(Math.random() * 35);
    
    // Overall audit score calculation
    const overallScore = Math.round((bioScore + avatarScore + bannerScore + pinnedPostScore) / 4);

    // Baseline metrics based on follower counts
    let engagementRate = '4.5%';
    let profileConversion = '2.4%';
    let avgLikes = 12;
    let avgRetweets = 3;
    let monthlyImpressions = '5,000+';

    if (followerCount === 'under-1k') {
      engagementRate = (3.5 + Math.random() * 2.5).toFixed(1) + '%';
      profileConversion = (1.5 + Math.random() * 1.5).toFixed(1) + '%';
      avgLikes = Math.floor(3 + Math.random() * 15);
      avgRetweets = Math.floor(Math.random() * 4);
      monthlyImpressions = Math.floor(2000 + Math.random() * 6000).toLocaleString() + '+';
    } else if (followerCount === '1k-10k') {
      engagementRate = (2.2 + Math.random() * 1.8).toFixed(1) + '%';
      profileConversion = (2.0 + Math.random() * 2.0).toFixed(1) + '%';
      avgLikes = Math.floor(25 + Math.random() * 70);
      avgRetweets = Math.floor(3 + Math.random() * 15);
      monthlyImpressions = Math.floor(15000 + Math.random() * 45000).toLocaleString() + '+';
    } else if (followerCount === '10k-50k') {
      engagementRate = (1.5 + Math.random() * 1.2).toFixed(1) + '%';
      profileConversion = (1.2 + Math.random() * 1.8).toFixed(1) + '%';
      avgLikes = Math.floor(120 + Math.random() * 350);
      avgRetweets = Math.floor(15 + Math.random() * 60);
      monthlyImpressions = Math.floor(120000 + Math.random() * 380000).toLocaleString() + '+';
    } else {
      // 50k+
      engagementRate = (0.8 + Math.random() * 0.9).toFixed(1) + '%';
      profileConversion = (0.5 + Math.random() * 1.0).toFixed(1) + '%';
      avgLikes = Math.floor(650 + Math.random() * 1800);
      avgRetweets = Math.floor(80 + Math.random() * 300);
      monthlyImpressions = '1,200,000+';
    }

    // Growth strategy custom data
    let nicheFocus = 'General Audience';
    let growthBottleneck = 'Impression Reach';
    let primaryGoal = 'Building Core Audience';
    let contentPillars: ContentPillar[] = [];
    let checklist: ChecklistItem[] = [];
    let templates: TweetTemplate[] = [];
    let scheduleTimes = ['09:00 AM', '02:00 PM', '07:30 PM'];
    let recommendations: string[] = [];

    // Niche-specific algorithms
    const activeNiche = niche || 'Tech & Coding';
    
    if (activeNiche === 'Tech & Coding') {
      nicheFocus = 'Developers, tech enthusiasts, and builders';
      growthBottleneck = pinnedPostScore < 70 ? 'Conversion to Follower (Missing Lead Magnet/Pin)' : 'Impression Reach (Low Thread Frequency)';
      primaryGoal = 'Establish technical authority & build a shipping habit';
      
      contentPillars = [
        { title: 'Build in Public & Code Snippets', percentage: 40, description: 'Sharing screenshots of code, current projects, VS Code setups, and lessons learned while coding.' },
        { title: 'Technical Tutorials & Threads', percentage: 30, description: 'Step-by-step guides explaining complex concepts (e.g., Docker, async JS, system design) simply.' },
        { title: 'Industry Insights & Opinions', percentage: 20, description: 'Your thoughts on AI code assistants, clean architecture, frameworks, and developer productivity.' },
        { title: 'Personal Journey & Developer Humor', percentage: 10, description: 'Relatable developer memes, morning routines, home office setups, and career milestones.' }
      ];

      checklist = [
        { task: 'Refine your bio structure', impact: 'High', description: 'Add your current tech stack (e.g., React/Node) and what you are building.' },
        { task: 'Pin a "Mega Project" Thread', impact: 'High', description: 'Write an end-to-end breakdown of your best coding project. Include pictures and a github link.' },
        { task: 'Engage with 15 target creators', impact: 'Medium', description: 'Leave insightful code-related comments on larger tech creators to siphon impressions.' },
        { task: 'Create a GitHub link repository', impact: 'Medium', description: 'Ensure the link in your bio leads directly to a portfolio or repository.' }
      ];

      templates = [
        {
          title: 'The "X Lessons I Learned Building Y" Thread',
          hook: 'I spent the last 30 days building a [Project Name] with [Stack].\n\nHere are 5 brutal lessons I learned about [Topic] (so you don’t repeat my mistakes):',
          structure: '1. The problem encountered\n2. The code solution (with snippet)\n3. Optimization tips\n4. Conclusion and CTA',
          example: 'I spent the last 30 days building a real-time multiplayer game with WebSockets.\n\nHere are 5 brutal lessons I learned about scaling state updates...'
        },
        {
          title: 'The Cheat Sheet / Tool List',
          hook: 'Most developers waste hundreds of hours learning [Topic] the wrong way.\n\nHere are the top 7 free resources that will fast-track your skills in 2026:',
          structure: 'List of 5-7 tools/courses with a brief description and why it matters.',
          example: 'Most developers waste hundreds of hours learning system design the wrong way.\n\nHere are the top 7 free resources...'
        },
        {
          title: 'The Code Optimization Tip',
          hook: 'Stop writing nested loops in Javascript. Do this instead:\n\n[Code block comparison: Bad vs Good]\n\nWhy this works:',
          structure: 'Quick value dump showing a common bad practice and the elegant clean code replacement.',
          example: 'Stop writing nested loops in Javascript. Do this instead:\n\n// Bad: O(N^2) \n// Good: O(N) using Map...\n\nWhy this works:'
        }
      ];

      recommendations = [
        'Post at least 2 high-quality programming threads per week to drive profile visits.',
        'Always include visual media (GIFs of your UI, screenshots of clean code blocks) as they get 150% more engagement in the tech niche.',
        'Use custom tools like Carbon or Snappify to make your code snippets look highly aesthetic and readable.'
      ];
    } else if (activeNiche === 'AI & Technology') {
      nicheFocus = 'AI builders, researchers, and tech enthusiasts';
      growthBottleneck = 'Curation Overload (Standing out in a crowded AI space)';
      primaryGoal = 'Be the trusted filter for new AI developments';

      contentPillars = [
        { title: 'AI News & Tool Breakdowns', percentage: 40, description: 'Summarizing the latest LLM releases, open-source models, and workflows.' },
        { title: 'Practical AI Workflows', percentage: 30, description: 'Tutorials showing how to use Cursor, v0, Midjourney, or API integrations to automate tasks.' },
        { title: 'AI Ethics & Future Trends', percentage: 20, description: 'Thoughtful reflections on agentic AI, AGI timeline, and the job market evolution.' },
        { title: 'Prompts & Templates', percentage: 10, description: 'Sharing highly optimized copy-paste prompts that yield 10x better results.' }
      ];

      checklist = [
        { task: 'Set up an AI newsletter', impact: 'High', description: 'Convert X traffic to email subscribers using a free platform like Beehiiv/Substack.' },
        { task: 'Create a curated resource sheet', impact: 'High', description: 'Build a database of "50 Free AI tools to automate work" to use as a follower giveaway (lead magnet).' },
        { task: 'Post within 1 hour of AI releases', impact: 'High', description: 'Be the first to write a simple breakdown when OpenAI, Anthropic, or Meta releases a model.' },
        { task: 'Use high-contrast thumbnails', impact: 'Medium', description: 'Attach clear, text-overlay images to your AI tools list tweets.' }
      ];

      templates = [
        {
          title: 'The AI Breakthrough Breakdown',
          hook: '[Company Name] just dropped [Model/Tool Name]. It completely replaces [Old Tool].\n\nHere is a 3-minute breakdown of what it does and how to use it today:',
          structure: '1. What happened\n2. Key features (bullet points)\n3. Step-by-step demo instructions\n4. Links and Newsletter subscription CTA',
          example: 'Anthropic just dropped Claude 4.5. It completely replaces standard coding tools.\n\nHere is a 3-minute breakdown...'
        },
        {
          title: 'Prompt Engineering Secrets',
          hook: '90% of people write prompts like: "Write a blog post about X."\n\nThat gets generic fluff.\n\nCopy-paste this exact system prompt to get 10x better results instead:',
          structure: 'Provide the prompt structure. Explain the role, context, constraints, and instructions.',
          example: '90% of people write prompts like: "Write a code snippet."\n\nThat gets buggy code...\n\nCopy-paste this system prompt:'
        }
      ];

      recommendations = [
        'Shift your focus from generic AI news (which everyone posts) to hyper-specific workflows (e.g., "How I built a full SaaS app in 2 hours using Cursor and Replit").',
        'Avoid technical jargon; write at a 7th-grade reading level so tech leaders and business people can both understand.',
        'Publish dynamic screen recordings of your AI agents executing tasks in real-time to maximize retweets.'
      ];
    } else if (activeNiche === 'Business & SaaS') {
      nicheFocus = 'Founders, entrepreneurs, and startup enthusiasts';
      growthBottleneck = 'Lead Generation and Conversion';
      primaryGoal = 'Drive sign-ups, demo bookings, or digital product sales';

      contentPillars = [
        { title: 'SaaS Lessons & Revenue Metrics', percentage: 40, description: 'Sharing MRR updates, client acquisition channels, churn details, and conversion lessons.' },
        { title: 'Frameworks & Systems', percentage: 30, description: 'Visual breakdowns of marketing funnels, landing pages, cold emailing, and hiring.' },
        { title: 'Founder Mindset & Burnout', percentage: 20, description: 'Personal stories of overcoming failure, bootstrapping vs VC, and product-market fit.' },
        { title: 'SaaS Showcases & Features', percentage: 10, description: 'Subtle product demos showing how your software solves a specific pain point.' }
      ];

      checklist = [
        { task: 'Optimize profile banner', impact: 'High', description: 'Use your banner to pitch your SaaS value proposition (e.g., "Get X leads in Y days").' },
        { task: 'Set up an automated DM campaign', impact: 'High', description: 'Use tools like TweetHunter or ManyChat to send your SaaS checklist automatically when users reply to a thread.' },
        { task: 'Create a clear landing page link', impact: 'High', description: 'Ensure the link in your bio leads to a high-converting page with tracking UTM parameters.' },
        { task: 'Add testimonials to your pinned tweet', impact: 'Medium', description: 'Showcase screenshots of customer reviews or revenue charts.' }
      ];

      templates = [
        {
          title: 'The Bootstrapping Journey (MRR Growth)',
          hook: 'It took us 12 months to hit $1,000 MRR.\n\nThen we went from $1k to $10k MRR in just 90 days.\n\nHere are the 3 marketing shifts that made it happen:',
          structure: '1. Detail the struggle\n2. Highlight the pivot\n3. Break down the 3 lessons/systems\n4. Share the results and SaaS link',
          example: 'It took us 12 months to hit $1,000 MRR.\n\nThen we went from $1k to $15k MRR in 90 days.\n\nHere are the 3 marketing shifts...'
        },
        {
          title: 'The "Unpopular Business Opinion"',
          hook: 'Unpopular opinion: Stop building SaaS products.\n\nBuilding software is easy. Distribution is the real filter.\n\nIf you don\'t have these 3 traffic channels, you\'re dead in the water:',
          structure: 'State an contrarian opinion, explain the rationale, give a list of solutions, ask for comments.',
          example: 'Unpopular opinion: Stop building SaaS products. Building is easy, distribution is the filter...'
        }
      ];

      recommendations = [
        'Do not just post link spam. Create native threads that solve 90% of the problem, and plug your product in the final tweet of the thread.',
        'Use "Build in Public" (#BIP) style content. Share real numbers, charts, and customer chats. Authenticity builds immense trust.',
        'Identify 10 target profiles of your ideal customers and interact with their posts daily to get on their radar.'
      ];
    } else {
      // General Niche / Finance / Creative
      nicheFocus = 'Creators, builders, and learners';
      growthBottleneck = 'Consistency and Brand Identity';
      primaryGoal = 'Build general interest, network, and grow reach';

      contentPillars = [
        { title: 'Educational Frameworks & Guides', percentage: 40, description: 'Actionable tips and deep dives into productivity, learning, and self-improvement.' },
        { title: 'Personal Story & Case Studies', percentage: 30, description: 'How you or someone else solved a major obstacle, backed by interesting stats.' },
        { title: 'Curated Lists & Tools', percentage: 20, description: 'Helpful collections of websites, books, or ideas that save time.' },
        { title: 'Engaging Questions & Debates', percentage: 10, description: 'Inviting your audience to share their thoughts on hot topics.' }
      ];

      checklist = [
        { task: 'Write an optimized bio', impact: 'High', description: 'State clearly what you write about, who you write for, and a call to action.' },
        { task: 'Pin an introductory thread', impact: 'High', description: 'Introduce who you are, your achievements, and why people should follow you.' },
        { task: 'Schedule a consistent posting calendar', impact: 'High', description: 'Commit to posting at least 2 times daily for the next 30 days.' },
        { task: 'Audit your profile photo', impact: 'Medium', description: 'Ensure you have a high-contrast, professional, and friendly avatar.' }
      ];

      templates = [
        {
          title: 'The Productivity / Self-Improvement Guide',
          hook: 'I read 50 books on [Topic] so you don\'t have to.\n\nHere are the 5 most valuable mental models that will change the way you [Action]:',
          structure: '1. Introduce the list\n2. 5 bullet points with title and brief explanation\n3. Final summary tweet asking for retweets',
          example: 'I read 50 books on business strategy so you don\'t have to.\n\nHere are the 5 most valuable mental models...'
        },
        {
          title: 'The Personal Transformation Story',
          hook: '2 years ago, I was stuck in a [Negative Situation], earning [Low Value], and feeling [Emotion].\n\nToday, I run [Positive Situation] and work [Benefits].\n\nHere is the 4-step framework I used to escape the loop:',
          structure: '1. Detail the pain points\n2. Share the trigger point\n3. Explain the 4 steps\n4. Give words of encouragement and CTA',
          example: '2 years ago, I was stuck in a dead-end 9-to-5 job, earning barely enough to survive.\n\nToday, I work from my laptop...'
        }
      ];

      recommendations = [
        'Maintain a consistent visual aesthetic and tone across all posts.',
        'Spend 80% of your X energy replying to larger accounts in your niche. High-value replies are the fastest way to get your first 1,000 followers.',
        'Use formatting (bolding, line breaks, emojis) to make your text easy to skim on mobile devices.'
      ];
    }

    const analysisResult: AnalysisResponse = {
      success: true,
      username: cleanUsername,
      avatarUrl,
      niche: activeNiche,
      followerCount,
      auditScore: {
        overall: overallScore,
        bio: bioScore,
        avatar: avatarScore,
        banner: bannerScore,
        pinnedPost: pinnedPostScore
      },
      metrics: {
        engagementRate,
        profileConversion,
        avgLikes,
        avgRetweets,
        monthlyImpressions
      },
      strategy: {
        nicheFocus,
        growthBottleneck,
        primaryGoal,
        contentPillars
      },
      checklist,
      templates,
      schedule: {
        timezone: 'UTC/EST',
        times: scheduleTimes,
        frequency: followerCount === 'under-1k' ? '1-2 posts/day' : '2-3 posts/day + 2 threads/week'
      },
      recommendations
    };

    res.status(200).json(analysisResult);

  } catch (error: any) {
    const message = error.message || 'An unexpected error occurred while analyzing the profile.';
    logger.error('Error in analyzeController:', message);

    res.status(500).json({
      success: false,
      error: message
    });
  }
}
