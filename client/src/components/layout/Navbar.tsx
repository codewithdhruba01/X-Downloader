import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
  return (
    <header className="py-6 flex justify-between items-center mb-10 border-b border-slate-200/20 dark:border-slate-800/30">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100 font-bold text-lg"
      >
        <svg className="w-4 h-4 fill-current text-[#1da1f2]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Media</span><span className="text-[#1da1f2]">.</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => {
            const formElement = document.getElementById('download-form-section');
            if (formElement) {
              formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }
          }}
          className="px-5 py-2 rounded-full bg-[#1da1f2] hover:bg-[#1a91da] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md active:scale-95"
        >
          Download
        </button>
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
