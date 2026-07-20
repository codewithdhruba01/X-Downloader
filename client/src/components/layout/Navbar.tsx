import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none">
      <header
        className={`w-full transition-all duration-300 pointer-events-auto flex justify-between items-center ${isScrolled
            ? 'max-w-xl mt-4 px-5 py-2.5 rounded-full border border-slate-200/20 dark:border-slate-800/40 bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-md shadow-lg shadow-black/5'
            : 'max-w-5xl py-6 px-2 border-b border-slate-200/20 dark:border-slate-800/30 bg-transparent'
          }`}
      >
        <motion.div
          layout
          className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100 font-bold text-lg select-none"
        >
          <svg className="w-4 h-4 fill-current text-[#1da1f2]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Media</span><span className="text-[#1da1f2]">.</span>
        </motion.div>

        <motion.div
          layout
          className="flex items-center gap-3"
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
            className={`rounded-full bg-[#1da1f2] hover:bg-[#1a91da] text-white font-semibold transition-all duration-300 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center ${isScrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'
              }`}
          >
            Download
          </button>
          <ThemeToggle />
        </motion.div>
      </header>
    </div>
  );
}
