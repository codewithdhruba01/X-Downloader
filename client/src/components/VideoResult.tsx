import { motion } from 'framer-motion';
import { Share2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import CopyIcon from './svg/copy';
import DownloadSquare from './svg/DownloadSquare';
import confetti from 'canvas-confetti';
import type { TweetVideoResponse } from '../services/api';
import { formatDuration } from '../utils/helpers';


interface VideoResultProps {
  data: TweetVideoResponse;
  originalUrl: string;
  onClear: () => void;
}

export default function VideoResult({ data, originalUrl, onClear }: VideoResultProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Trigger celebration on mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ec4899']
    });
  }, [data.author]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Video link copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  };

  const copyTweetUrl = async () => {
    try {
      await navigator.clipboard.writeText(originalUrl);
      toast.success('Tweet URL copied!');
    } catch (err) {
      toast.error('Failed to copy URL.');
    }
  };

  // Helper to trigger direct download, or open in new tab if CORS fails
  const triggerDownload = (videoUrl: string, quality: string) => {
    toast.success(`Opening ${quality} video. If download doesn't start, right-click and save.`);
    window.open(videoUrl, '_blank');
  };

  // Get highest quality variant to play in preview
  const previewVideoUrl = data.videos[0]?.url || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', duration: 0.4 }}
      className="w-full rounded-3xl p-6 border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 relative shadow-2xl"
    >
      {/* Top action header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-200/30 dark:border-slate-800/50 pb-4">
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Download Another</span>
        </button>

        <button
          onClick={copyTweetUrl}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-sm font-medium"
          title="Copy Original Tweet Link"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Copy Post Link</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Video Preview Player */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-200/10 relative max-h-[460px] aspect-video sm:aspect-auto">
          {previewVideoUrl ? (
            <video
              src={previewVideoUrl}
              poster={data.thumbnail}
              controls
              className="w-full h-full max-h-[460px] object-contain rounded-2xl"
              preload="metadata"
            />
          ) : (
            <img
              src={data.thumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}

          {data.durationMs && (
            <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-black/75 text-xs font-semibold text-white tracking-wide shadow-md">
              {formatDuration(data.durationMs)}
            </span>
          )}
        </div>

        {/* Right Side: Meta Details and Quality Selectors */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Author Profile Info */}
            <div className="flex items-center gap-3 mb-4">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.authorName}
                  className="w-10 h-10 rounded-full border border-slate-200/50 dark:border-slate-800/50 object-cover shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                  {data.author.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight">
                  {data.authorName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  @{data.author}
                </p>
              </div>
            </div>

            {/* Tweet Text */}
            <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed mb-6 whitespace-pre-wrap select-text">
              {data.description || 'No description available for this post.'}
            </p>
          </div>

          {/* Qualities Grid */}
          <div className="mt-auto pt-4 border-t border-slate-200/20 dark:border-slate-800/30">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3 tracking-wide">
              AVAILABLE RESOLUTIONS
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.videos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 dark:bg-[#070709]/40 border border-slate-200/10 dark:border-slate-800/30 transition-all duration-200 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {video.quality}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
                      MP4 VIDEO
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Link Button */}
                    <button
                      onClick={() => copyToClipboard(video.url, index)}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                      title="Copy stream link"
                    >
                      {copiedIndex === index ? (
                        <span className="text-xs font-bold text-emerald-500">Copied</span>
                      ) : (
                        <CopyIcon size={16} />
                      )}
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={() => triggerDownload(video.url, video.quality)}
                      className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 cursor-pointer transition-all flex items-center justify-center"
                      title="Download video"
                    >
                      <DownloadSquare size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 text-center">
              Tip: If you're on a mobile device, hold down the download button and choose "Download Link".
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
