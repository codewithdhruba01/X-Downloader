import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Info, ShieldAlert, Sparkles } from 'lucide-react';

// Components
import DownloadForm from './components/DownloadForm';
import VideoResult from './components/VideoResult';
import HistoryPanel from './components/HistoryPanel';
import LoadingSkeleton from './components/LoadingSkeleton';
import AuroraBars from './components/ui/AuroraBars';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Hooks & Services
import { useHistory } from './hooks/useHistory';
import type { HistoryItem } from './hooks/useHistory';
import { downloadTweetVideo } from './services/api';
import type { TweetVideoResponse } from './services/api';
import { getTweetId } from './utils/helpers';

export default function App() {
  const { history, addHistoryItem, removeHistoryItem, clearHistory } = useHistory();
  
  const [videoData, setVideoData] = useState<TweetVideoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    setVideoData(null);
    setCurrentUrl(url);

    const toastId = toast.loading('Extracting video streams from Twitter/X...');

    try {
      const data = await downloadTweetVideo(url);
      setVideoData(data);
      
      const tweetId = getTweetId(url);
      
      // Save to download history
      addHistoryItem({
        id: tweetId || String(Date.now()),
        url: url,
        author: data.author,
        authorName: data.authorName,
        avatar: data.avatar,
        thumbnail: data.thumbnail,
        description: data.description,
        durationMs: data.durationMs,
        videos: data.videos,
      });

      toast.success('Video streams extracted successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Failed to extract video. Please check the URL.', { id: toastId });
      setCurrentUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCurrentUrl(item.url);
    setVideoData({
      success: true,
      author: item.author,
      authorName: item.authorName,
      avatar: item.avatar,
      thumbnail: item.thumbnail,
      description: item.description,
      durationMs: item.durationMs,
      videos: item.videos
    });
    
    toast.success(`Loaded video from history: @${item.author}`);
    
    // Scroll smoothly to top form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearResult = () => {
    setVideoData(null);
    setCurrentUrl('');
  };

  return (
    <div className="bg-gradient-mesh min-h-screen pb-16 flex flex-col justify-between relative overflow-x-hidden">
      {/* Full Page Aurora Bars Background */}
      <div className="fixed inset-0 z-0 opacity-35 dark:opacity-50 pointer-events-none">
        <AuroraBars
          barCount={32}
          colors={['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#00000000']}
          speed={0.15}
          gap={5}
          blur={12}
          background="transparent"
        />
      </div>

      {/* Toast Notification Provider */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'dark:bg-slate-900 dark:text-slate-100 border dark:border-slate-800 rounded-2xl shadow-xl',
          duration: 4000
        }} 
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="space-y-10">
          
          {/* Hero Section */}
          <section className="text-center max-w-2xl mx-auto space-y-4 py-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold shadow-inner border border-indigo-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Educational Video Downloader Tool</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.15]"
            >
              Download{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
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

          {/* Form Section */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-white/20 dark:border-slate-800/40">
              <DownloadForm onSubmit={handleDownload} isLoading={isLoading} />
            </div>
          </motion.section>

          {/* Results Display */}
          <section className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {isLoading && (
                <div key="loading">
                  <LoadingSkeleton />
                </div>
              )}

              {videoData && !isLoading && (
                <div key="result">
                  <VideoResult
                    data={videoData}
                    originalUrl={currentUrl}
                    onClear={handleClearResult}
                  />
                </div>
              )}
            </AnimatePresence>
          </section>

          {/* Dual Panel: History & Information */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-6">
            
            {/* History Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <HistoryPanel
                history={history}
                onSelect={handleSelectHistory}
                onRemove={removeHistoryItem}
                onClear={clearHistory}
              />
            </motion.div>

            {/* Instruction and Disclaimer Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              {/* How it works info card */}
              <div className="glass-panel rounded-3xl p-6 flex-1 border border-white/25 dark:border-slate-800/30">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-sm mb-4">
                  <Info className="w-4 h-4 text-indigo-500" />
                  <span>HOW TO USE</span>
                </h3>
                <ol className="text-xs text-slate-500 dark:text-slate-400 space-y-3 pl-4 list-decimal leading-relaxed font-medium">
                  <li>Find the post containing the video on Twitter/X.</li>
                  <li>Copy the post link from your browser's address bar or the share menu.</li>
                  <li>Paste the link into the download input field above.</li>
                  <li>Click <strong>Download</strong> and choose your desired video resolution quality.</li>
                </ol>
              </div>

              {/* Legal and compliance disclaimer */}
              <div className="glass-panel rounded-3xl p-6 bg-rose-50/20 dark:bg-rose-950/5 border border-rose-250/20 dark:border-rose-900/30">
                <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 text-xs mb-3 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Educational Disclaimer</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  This tool is built solely for educational and research purposes. It only accesses content that is already exposed in public tweet widgets. Users are fully responsible for complying with the platform's Terms of Service and local copyright laws. Do not distribute copyrighted material.
                </p>
              </div>
            </motion.div>

          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
