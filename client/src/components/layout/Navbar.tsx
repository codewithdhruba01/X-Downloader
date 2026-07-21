import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';
import { Video, BarChart2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'downloader' | 'analyzer';
  setActiveTab: (tab: 'downloader' | 'analyzer') => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
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
        className={`w-full transition-all duration-300 pointer-events-auto flex justify-between items-center ${
          isScrolled
            ? 'max-w-2xl mt-4 px-5 py-2.5 rounded-full border border-slate-200/20 dark:border-slate-800/40 bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-md shadow-lg shadow-black/5'
            : 'max-w-5xl py-6 px-2 border-b border-slate-200/20 dark:border-slate-800/30 bg-transparent'
        }`}
      >
        <motion.div
          layout
          className="flex items-center select-none cursor-pointer"
          onClick={() => setActiveTab('downloader')}
        >
          <img
            src="/logo/Xmedia_logo.png"
            alt="X-Media Logo"
            className="hidden dark:block h-10 md:h-12 w-auto object-contain"
          />
          <img
            src="/logo/logo_light.png"
            alt="X-Media Logo"
            className="block dark:hidden h-10 md:h-12 w-auto object-contain"
          />
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200/30 dark:border-slate-850/40 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('downloader')}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-350 cursor-pointer ${
              activeTab === 'downloader'
                ? 'bg-[#1da1f2] text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Downloader</span>
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-350 cursor-pointer ${
              activeTab === 'analyzer'
                ? 'bg-[#1da1f2] text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>X Analyzer</span>
          </button>
        </div>

        <motion.div
          layout
          className="flex items-center gap-2"
        >
          <ThemeToggle />
        </motion.div>
      </header>
    </div>
  );
}

