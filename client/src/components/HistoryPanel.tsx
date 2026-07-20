import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import type { HistoryItem } from '../hooks/useHistory';
import ArchiveBook from './svg/ArchiveBook';
import DownloadSquare from './svg/DownloadSquare';
import DeleteIcon from './svg/Delete';


import { formatHistoryDate, formatDuration } from '../utils/helpers';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function HistoryPanel({ history, onSelect, onRemove, onClear }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="w-full glass-panel rounded-3xl p-8 text-center flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
        <ArchiveBook size={40} className="mb-3 opacity-60" />
        <p className="text-sm font-semibold">No Download History</p>
        <p className="text-xs mt-1 max-w-[250px]">Your recently processed Twitter/X videos will appear here for quick access.</p>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-3xl p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <ArchiveBook size={20} className="text-indigo-500" />
          <h3 className="font-bold text-base">Download History</h3>
          <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs px-2 py-0.5 rounded-full font-bold">
            {history.length}
          </span>
        </div>

        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold cursor-pointer border border-rose-200 dark:border-rose-900/50 hover:bg-rose-500/5 px-3 py-1.5 rounded-xl transition-all"
        >
          <DeleteIcon size={14} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="max-h-[380px] overflow-y-auto pr-1 space-y-3">
        <AnimatePresence initial={false}>
          {history.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 dark:bg-slate-950/20 border border-slate-200/30 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all group"
            >
              {/* Video Thumbnail Preview */}
              <div
                onClick={() => onSelect(item)}
                className="w-20 h-12 rounded-xl bg-slate-900 overflow-hidden relative cursor-pointer group flex-shrink-0"
              >
                <img
                  src={item.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                {item.durationMs && (
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/75 text-[8px] font-bold text-white tracking-wide">
                    {formatDuration(item.durationMs)}
                  </span>
                )}
              </div>

              {/* Text Meta Info */}
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(item)}>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-xs truncate max-w-[120px]">
                    {item.authorName}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[80px]">
                    @{item.author}
                  </span>
                </div>
                
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 pr-2 mt-0.5">
                  {item.description || 'No tweet text'}
                </p>
                
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1 font-semibold">
                  {formatHistoryDate(item.timestamp)}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-1">
                {/* Re-download button */}
                <button
                  onClick={() => onSelect(item)}
                  className="p-2 rounded-xl text-indigo-500 hover:bg-indigo-500/10 cursor-pointer transition-colors"
                  title="Reload metadata"
                >
                  <DownloadSquare size={16} />
                </button>

                {/* Remove item button */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                  title="Delete from history"
                >
                  <DeleteIcon size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
