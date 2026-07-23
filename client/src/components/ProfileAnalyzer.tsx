import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  User,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  ArrowRight,
  RefreshCw,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
  Target,
  FileText,
  ChevronDown
} from 'lucide-react';
import { analyzeProfile } from '../services/api';
import type { ProfileAnalysisResponse } from '../services/api';
import Button from './ui/Button';

const NICHES = [
  'Tech & Coding',
  'AI & Technology',
  'Business & SaaS',
  'Finance & Crypto',
  'Creative & Design',
  'Personal Brand & Writing'
];

const FOLLOWER_TIERS = [
  { value: 'under-1k', label: 'Under 1,000 followers' },
  { value: '1k-10k', label: '1,000 - 10,000 followers' },
  { value: '10k-50k', label: '10,000 - 50,000 followers' },
  { value: '50k+', label: '50,000+ followers' }
];

const LOADING_STEPS = [
  'Connecting to X syndication APIs...',
  'Fetching profile metadata...',
  'Analyzing profile bio structure & keywords...',
  'Evaluating header banner & avatar composition...',
  'Assessing engagement rates & metric models...',
  'Generating growth roadmap & niche benchmarks...',
  'Customizing viral tweet templates...'
];

export default function ProfileAnalyzer() {
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [followerCount, setFollowerCount] = useState(FOLLOWER_TIERS[0].value);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<ProfileAnalysisResponse | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'checklist' | 'strategy' | 'templates'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const nicheRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nicheRef.current && !nicheRef.current.contains(event.target as Node)) {
        setIsNicheOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Rotate loading steps
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => {
          if (prev < LOADING_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 900);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsLoading(true);
    setResult(null);
    const toastId = toast.loading('Initiating X Profile Analysis...');

    try {
      const data = await analyzeProfile(username, niche, followerCount);
      setResult(data);
      toast.success('Analysis completed successfully!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTemplate = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Template copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pb-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl font-serif tracking-normal leading-[1.1]"
        >
          X/Twitter{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent italic font-medium">
            Profile Analyzer
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed"
        >
          Analyze your profile, optimize your layout, and get custom growth frameworks to take your account to the next level.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {/* Form State */}
        {!isLoading && !result && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 md:p-8 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-xl max-w-xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                  X/Twitter Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-550">
                    <span className="font-semibold text-lg">@</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="elonmusk"
                    className="w-full pl-9 pr-4 py-3 rounded-2xl bg-white dark:bg-[#161618] border border-slate-200/90 dark:border-white/15 focus:border-slate-400/60 dark:focus:border-white/30 outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base font-medium shadow-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Niche Selection */}
              <div className="space-y-2 relative" ref={nicheRef}>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Your Target Niche
                </label>
                <button
                  type="button"
                  onClick={() => setIsNicheOpen(!isNicheOpen)}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#161618] border border-slate-200/90 dark:border-white/15 text-slate-900 dark:text-white text-base font-medium text-left flex items-center justify-between cursor-pointer shadow-sm transition-all duration-200"
                >
                  <span className="text-slate-800 dark:text-slate-200">{niche}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${isNicheOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isNicheOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 w-full mt-2 rounded-2xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#161618] backdrop-blur-xl shadow-xl overflow-hidden"
                    >
                      <div className="py-1.5 max-h-60 overflow-y-auto">
                        {NICHES.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              setNiche(n);
                              setIsNicheOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center justify-between transition-colors hover:bg-slate-100 dark:hover:bg-[#222226] cursor-pointer ${niche === n
                                ? 'text-[#1da1f2] dark:text-sky-400 bg-slate-50/50 dark:bg-slate-900/40'
                                : 'text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-slate-100'
                              }`}
                          >
                            <span>{n}</span>
                            {niche === n && (
                              <Check className="w-4 h-4 text-[#1da1f2] dark:text-sky-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Followers Tier Selection */}
              <div className="space-y-3 text-center">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Current Follower Size
                </label>
                <div className="flex flex-wrap justify-center gap-2.5 max-w-xl mx-auto">
                  {FOLLOWER_TIERS.map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setFollowerCount(tier.value)}
                      className={`px-4 py-2 rounded-xl border text-center text-xs font-semibold transition-all duration-300 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer ${followerCount === tier.value
                        ? 'border-[#1da1f2] bg-[#1da1f2]/10 text-[#1da1f2] dark:text-sky-400'
                        : 'border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                        }`}
                    >
                      <span>{tier.label}</span>
                      {followerCount === tier.value && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1da1f2] dark:text-sky-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Analyze Profile
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center space-y-6 border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 rounded-3xl max-w-xl mx-auto shadow-xl"
          >
            {/* Spinning Loader */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-250 dark:border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-t-[#1da1f2] border-r-indigo-500 animate-spin" />
              <div className="absolute inset-3 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#1da1f2] animate-pulse" />
              </div>
            </div>

            {/* Steps text */}
            <div className="space-y-2 w-full">
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">
                Auditing @{username.replace(/^@/, '')}
              </h3>
              <div className="h-6 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStepIdx}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-semibold text-slate-500 dark:text-indigo-400 absolute left-0 right-0"
                  >
                    {LOADING_STEPS[loadingStepIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Results State */}
        {result && !isLoading && (
          <motion.div
            key="results-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 w-full"
          >
            {/* Header Profile Info card */}
            <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={result.avatarUrl}
                    alt={result.username}
                    className="w-20 h-20 rounded-full border-4 border-[#1da1f2] object-cover bg-slate-200 dark:bg-slate-800"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
                    }}
                  />
                  <div className="absolute bottom-0 right-0 bg-[#1da1f2] text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h2 className="text-xl font-extrabold text-slate-850 dark:text-slate-100">
                      @{result.username}
                    </h2>
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 capitalize">
                      {result.followerCount.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-indigo-400">
                    Niche: {result.niche}
                  </p>
                </div>
              </div>

              {/* Audit Score Circle */}
              <div className="flex items-center gap-4 bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/30 dark:border-slate-800/40">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      className="stroke-slate-250 dark:stroke-slate-800"
                      strokeWidth="4.5"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      className="stroke-green-500"
                      strokeWidth="4.5"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={
                        2 * Math.PI * 24 * (1 - result.auditScore.overall / 100)
                      }
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-slate-850 dark:text-slate-100">
                    {result.auditScore.overall}%
                  </span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Profile Score
                  </div>
                  <div className="text-sm font-extrabold text-green-500">
                    {result.auditScore.overall >= 80
                      ? 'Optimized'
                      : result.auditScore.overall >= 60
                        ? 'Needs Tweaks'
                        : 'Needs Overhaul'}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs for Dashboard results */}
            <div className="flex border-b border-slate-200/25 dark:border-slate-800/30">
              {(
                [
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'checklist', label: 'Checklist', icon: CheckCircle2 },
                  { id: 'strategy', label: 'Strategy', icon: Target },
                  { id: 'templates', label: 'Tweet Templates', icon: FileText }
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveResultTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 border-b-2 font-bold text-xs md:text-sm transition-all cursor-pointer ${activeResultTab === tab.id
                      ? 'border-[#1da1f2] text-[#1da1f2]'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[300px]">
              {activeResultTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Audit Score Breakdown */}
                  <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                      <Award className="w-5 h-5 text-indigo-500" />
                      <span>Layout Audit Breakdown</span>
                    </h3>
                    <div className="space-y-3.5">
                      {[
                        { label: 'Bio Optimization', score: result.auditScore.bio },
                        { label: 'Avatar Integrity', score: result.auditScore.avatar },
                        { label: 'Banner Aesthetic', score: result.auditScore.banner },
                        { label: 'Pinned Post Alignment', score: result.auditScore.pinnedPost }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-600 dark:text-slate-400">
                              {item.label}
                            </span>
                            <span className="text-slate-850 dark:text-slate-100">
                              {item.score}/100
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.score >= 80
                                ? 'bg-green-500'
                                : item.score >= 60
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                                }`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark & Simulated Metrics */}
                  <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                      <TrendingUp className="w-5 h-5 text-[#1da1f2]" />
                      <span>Benchmark Metrics</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Engagement Rate', value: result.metrics.engagementRate, desc: 'Target > 2%' },
                        { label: 'Profile Conv. Rate', value: result.metrics.profileConversion, desc: 'Target > 1.5%' },
                        { label: 'Est. Monthly Reach', value: result.metrics.monthlyImpressions, desc: 'Impressions' },
                        { label: 'Avg Engagement', value: `${result.metrics.avgLikes} Likes / ${result.metrics.avgRetweets} RT`, desc: 'Per post' }
                      ].map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 rounded-2xl"
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {metric.label}
                          </div>
                          <div className="text-base font-extrabold text-slate-850 dark:text-slate-100 mt-1">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-semibold text-slate-500 dark:text-indigo-400 mt-0.5">
                            {metric.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Insights Card */}
                  <div className="md:col-span-2 p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                    <h3 className="text-base font-semibold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span>Key Growth Diagnosis</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 rounded-2xl space-y-1">
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          Niche Focus
                        </div>
                        <p className="text-xs font-normal text-slate-750 dark:text-slate-300">
                          {result.strategy.nicheFocus}
                        </p>
                      </div>

                      <div className="p-4 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-250/20 dark:border-rose-900/30 rounded-2xl space-y-1">
                        <div className="text-xs font-medium text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                          <span>Primary Bottleneck</span>
                        </div>
                        <p className="text-xs font-normal text-slate-750 dark:text-slate-200">
                          {result.strategy.growthBottleneck}
                        </p>
                      </div>

                      <div className="p-4 bg-green-500/5 dark:bg-green-500/10 border border-green-250/20 dark:border-green-900/30 rounded-2xl space-y-1">
                        <div className="text-xs font-medium text-green-500 uppercase tracking-wider">
                          Core Focus Goal
                        </div>
                        <p className="text-xs font-normal text-slate-750 dark:text-slate-200">
                          {result.strategy.primaryGoal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeResultTab === 'checklist' && (
                <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                  <h3 className="text-base font-extrabold text-slate-850 dark:text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Actionable Growth Checklist</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Complete these essential optimization milestones to prepare your account for virality.
                  </p>
                  <div className="space-y-3 pt-2">
                    {result.checklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-3.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 rounded-2xl"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 justify-between flex-wrap">
                            <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200">
                              {item.task}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.impact === 'High'
                                ? 'bg-rose-500/10 text-rose-500 dark:text-rose-455'
                                : item.impact === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-455'
                                  : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                                }`}
                            >
                              {item.impact} Impact
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeResultTab === 'strategy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Content Pillars */}
                  <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                      <span>Content Pillars</span>
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Distribute your weekly posts according to these percentage ratios:
                    </p>
                    <div className="space-y-4 pt-2">
                      {result.strategy.contentPillars.map((pillar, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-850 dark:text-slate-200">
                              {pillar.title}
                            </span>
                            <span className="text-indigo-500 dark:text-indigo-400 font-extrabold">
                              {pillar.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-500 h-full rounded-full"
                              style={{ width: `${pillar.percentage}%` }}
                            />
                          </div>
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Posting Schedule & Recommendations */}
                  <div className="flex flex-col gap-6">
                    {/* Schedule */}
                    <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4">
                      <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                        <Calendar className="w-5 h-5 text-[#1da1f2]" />
                        <span>Best Times to Post</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-455">
                          <Clock className="w-4 h-4 text-[#1da1f2]" />
                          <span>Posting Frequency: {result.schedule.frequency}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {result.schedule.times.map((time, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/40 rounded-xl text-center"
                            >
                              <div className="text-[11px] font-extrabold text-slate-850 dark:text-slate-100">
                                {time}
                              </div>
                              <div className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                                {result.schedule.timezone}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg flex-1 space-y-3">
                      <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Niche-Specific Growth Advice</span>
                      </h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                            <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeResultTab === 'templates' && (
                <div className="space-y-6">
                  {result.templates.map((template, idx) => {
                    const templateText = `${template.hook}\n\n[Body points]\n\n[CTA/Link]`;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 backdrop-blur-md shadow-lg space-y-4"
                      >
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h4 className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                            {template.title}
                          </h4>
                          <button
                            onClick={() => handleCopyTemplate(templateText, idx)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-green-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Template</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-[10px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                              Hook Structure
                            </div>
                            <pre className="p-3 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/40 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                              {template.hook}
                            </pre>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-[10px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-1">
                                Complete Structure
                              </div>
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                {template.structure}
                              </p>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider mb-1">
                                Example Hook
                              </div>
                              <p className="text-xs italic font-semibold text-slate-600 dark:text-slate-350 leading-relaxed">
                                "{template.example}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Restart Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setResult(null)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another Profile</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
