import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link } from 'lucide-react';
import toast from 'react-hot-toast';
import CopyIcon from './svg/copy';
import DownloadSquare from './svg/DownloadSquare';

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
            className="w-full pl-11 pr-20 py-4 rounded-2xl glass-input text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base shadow-inner"
          />

          {/* Quick actions: Paste / Clear */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            <AnimatePresence>
              {url ? (
                <motion.button
                  type="button"
                  onClick={handleClear}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handlePaste}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  title="Paste link"
                >
                  <CopyIcon size={16} />
                  <span className="hidden sm:inline">Paste</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            isLoading
              ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98]'
          } transition-all duration-200`}
          whileHover={isLoading ? {} : { scale: 1.02 }}
          whileTap={isLoading ? {} : { scale: 0.98 }}
        >
          {isLoading ? (
            <>
              {/* Spinner */}
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <DownloadSquare size={20} />
              <span>Download</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}
