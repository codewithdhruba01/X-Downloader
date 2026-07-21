import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';

// Components
import DownloadForm from './components/DownloadForm';
import VideoResult from './components/VideoResult';
import HistoryPanel from './components/HistoryPanel';
import LoadingSkeleton from './components/LoadingSkeleton';
import AuroraBars from './components/ui/AuroraBars';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ProfileAnalyzer from './components/ProfileAnalyzer';

// Hooks & Services
import { useHistory } from './hooks/useHistory';
import type { HistoryItem } from './hooks/useHistory';
import { downloadTweetVideo } from './services/api';
import type { TweetVideoResponse } from './services/api';
import { getTweetId } from './utils/helpers';

export default function App() {
  const { history, addHistoryItem, removeHistoryItem, clearHistory } = useHistory();

  const [activeTab, setActiveTab] = useState<'downloader' | 'analyzer'>('downloader');
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
      {/* Aurora Bars Background - extending further down */}
      <div className="absolute top-0 left-0 right-0 h-[1100px] z-0 opacity-35 dark:opacity-50 pointer-events-none overflow-hidden">
        <AuroraBars
          barCount={32}
          colors={['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#00000000']}
          speed={0.15}
          gap={5}
          blur={12}
          background="transparent"
        />
        {/* Bottom fade mask to transition into solid background */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#fafafa] dark:from-[#070709] via-[#fafafa]/80 dark:via-[#070709]/80 to-transparent" />
      </div>

      {/* Toast Notification Provider */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'dark:bg-slate-900 dark:text-slate-100 border dark:border-slate-800 rounded-2xl shadow-xl',
          duration: 4000
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 pt-24">
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'downloader' ? (
              <motion.div
                key="downloader-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-10"
              >
                {/* Hero Section */}
                <Hero />

                {/* Form Section */}
                <motion.section
                  id="download-form-section"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <div className="p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 shadow-xl">
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

                {/* Stacked Panels: History and How to Use */}
                <section className="flex flex-col gap-12 w-full max-w-4xl mx-auto pt-20 border-t border-slate-200/5 dark:border-slate-800/10">

                  {/* History Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-3xl mx-auto"
                  >
                    <HistoryPanel
                      history={history}
                      onSelect={handleSelectHistory}
                      onRemove={removeHistoryItem}
                      onClear={clearHistory}
                    />
                  </motion.div>

                  {/* How It Works Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full"
                  >
                    <HowItWorks />
                  </motion.div>

                  {/* Legal and compliance disclaimer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-3xl mx-auto"
                  >
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
              </motion.div>
            ) : (
              <motion.div
                key="analyzer-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-28"
              >
                <ProfileAnalyzer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
