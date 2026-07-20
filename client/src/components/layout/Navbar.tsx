import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
  return (
    <header className="py-6 flex justify-between items-center mb-10 border-b border-slate-200/20 dark:border-slate-800/30">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2.5"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent tracking-tight">
              X-Media
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 tracking-wide uppercase">
              v1.0
            </span>
          </div>
          <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
            VIDEO EXTRACTOR
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
