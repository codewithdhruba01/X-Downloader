/**
 * Formats a duration in milliseconds to a human-readable string (e.g., "3:45", "0:12", "1:15:30").
 */
export function formatDuration(ms?: number): string {
  if (ms === undefined || isNaN(ms)) return '';
  
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

/**
 * Formats a timestamp into a friendly date string.
 */
export function formatHistoryDate(timestamp: number): string {
  const date = new Date(timestamp);
  
  // Return format: "July 20, 8:30 PM"
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Simple client-side helper to extract Tweet ID.
 */
export function getTweetId(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/\/status\/(\d+)/i);
  return match ? match[1] : '';
}
