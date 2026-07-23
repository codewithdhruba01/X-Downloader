import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link } from 'lucide-react';
import toast from 'react-hot-toast';
import CopyIcon from './svg/copy';

interface DownloadFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function DownloadForm({ onSubmit, isLoading }: DownloadFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      toast.error('Please enter a Twitter/X URL first.');
      return;
    }

    onSubmit(trimmedUrl);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        toast.success('Pasted from clipboard!');
      } else {
        toast.error('Clipboard is empty.');
      }
    } catch (err) {
      toast.error('Could not read clipboard. Please paste manually.');
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          {/* URL Icon prefix */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Link className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Paste Twitter/X link here (e.g., https://x.com/.../status/...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="w-full pl-11 pr-28 py-3.5 rounded-2xl glass-input text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base shadow-inner h-12"
          />

          {/* Quick actions: Paste / Clear */}
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <AnimatePresence mode="wait">
              {url ? (
                <motion.button
                  key="clear-btn"
                  type="button"
                  onClick={handleClear}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-9 px-3 rounded-xl font-medium text-xs flex items-center gap-1.5 border transition-all duration-200 cursor-pointer shadow-sm bg-white dark:bg-[#161618] hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 border-slate-200/90 dark:border-white/15 hover:border-rose-300 dark:hover:border-rose-800/50"
                  title="Clear input"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </motion.button>
              ) : (
                <motion.button
                  key="paste-btn"
                  type="button"
                  onClick={handlePaste}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-9 px-3.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 border transition-all duration-200 cursor-pointer shadow-sm bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-[#222226] text-slate-900 dark:text-white border-slate-200/90 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30"
                  title="Paste link from clipboard"
                >
                  <CopyIcon size={14} />
                  <span>Paste</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Download Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={isLoading ? {} : { scale: 1.02 }}
          whileTap={isLoading ? {} : { scale: 0.97 }}
          className={`h-12 px-6 rounded-2xl font-medium text-sm sm:text-base flex items-center justify-center border transition-all duration-200 cursor-pointer shadow-sm w-full sm:w-auto min-w-[120px] ${
            isLoading
              ? 'bg-slate-100 dark:bg-[#161618] text-slate-400 dark:text-slate-500 border-slate-200 dark:border-white/10 cursor-not-allowed'
              : 'bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-[#222226] text-slate-900 dark:text-white border-slate-200/90 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </div>
          ) : (
            <span>Download</span>
          )}
        </motion.button>
      </div>
    </form>
  );
}
