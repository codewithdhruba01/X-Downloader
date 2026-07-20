import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  url: string;
  author: string;
  authorName: string;
  avatar?: string;
  thumbnail: string;
  description: string;
  durationMs?: number;
  timestamp: number;
  videos: {
    quality: string;
    url: string;
  }[];
}

const HISTORY_KEY = 'x_downloader_history';
const MAX_HISTORY_ITEMS = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load history from LocalStorage:', error);
    }
  }, []);

  // Save history helper
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history to LocalStorage:', error);
    }
  };

  // Add an item to history
  const addHistoryItem = (item: Omit<HistoryItem, 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      timestamp: Date.now()
    };

    // Filter out existing duplicates of the same tweet ID
    const filtered = history.filter((h) => h.id !== item.id);
    
    // Add new item to the top and slice to max length
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    saveHistory(updated);
  };

  // Remove a specific history item
  const removeHistoryItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistory(updated);
  };

  // Clear all history
  const clearHistory = () => {
    saveHistory([]);
  };

  return {
    history,
    addHistoryItem,
    removeHistoryItem,
    clearHistory
  };
}
