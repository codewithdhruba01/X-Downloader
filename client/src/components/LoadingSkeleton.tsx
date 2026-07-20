import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full glass-panel rounded-3xl p-6 glow-border overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Thumbnail Skeleton */}
        <div className="w-full md:w-2/5 aspect-video md:aspect-[9/16] max-h-[380px] bg-slate-200/50 dark:bg-slate-800/40 rounded-2xl animate-pulse flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          <svg className="w-12 h-12 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Right Side: Meta & Qualities Skeletons */}
        <div className="flex-1 flex flex-col justify-between py-2 gap-4">
          <div className="space-y-4">
            {/* User Info Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/40 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-28 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
                <div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
              </div>
            </div>

            {/* Description Text Skeleton */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
              <div className="h-4 w-11/12 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
            </div>
            
            {/* Duration / Stats Skeleton */}
            <div className="h-4 w-20 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse pt-1" />
          </div>

          {/* Qualities Grid Skeleton */}
          <div className="space-y-3 mt-6">
            <div className="h-4 w-32 bg-slate-200/50 dark:bg-slate-800/40 rounded-md animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-14 bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
              <div className="h-14 bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
              <div className="h-14 bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
              <div className="h-14 bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
