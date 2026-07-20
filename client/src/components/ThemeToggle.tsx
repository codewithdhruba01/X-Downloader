import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import DarkLight from './svg/DarkLight';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/20 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/40 text-slate-700 dark:text-slate-200 shadow-md backdrop-blur-md cursor-pointer focus:outline-none hover:bg-white/30 dark:hover:bg-slate-900/60 flex items-center justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex items-center justify-center"
      >
        <DarkLight size={20} />
      </motion.div>
    </motion.button>
  );
}
