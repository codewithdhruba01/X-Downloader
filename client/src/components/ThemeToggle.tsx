import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import DarkLight from './svg/DarkLight';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-600 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer focus:outline-none flex items-center justify-center transition-colors"
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
