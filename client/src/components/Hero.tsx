import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="text-center max-w-2xl mx-auto space-y-4 pt-16 pb-4">
      <motion.a
        href="https://github.com/codewithdhruba01/X-Downloader"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2.5 p-1 pr-4 rounded-full border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 hover:bg-slate-200/5 dark:hover:bg-white/5 transition-all duration-300 shadow-sm text-xs cursor-pointer"
      >
        {/* Left Badge */}
        <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-[#1da1f2] font-semibold text-[11px] tracking-wide">
          GitHub
        </span>
        {/* Right Description */}
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          Help support the founding team
        </span>
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl sm:text-6xl font-serif tracking-normal leading-[1.1]"
      >
        Download{' '}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent italic font-medium">
          Twitter/X Videos
        </span>{' '}
        Instantly
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed"
      >
        Extract public MP4 video streams in high resolution directly from X.com. Free, fast, and no account or API keys required.
      </motion.p>
    </section>
  );
}
