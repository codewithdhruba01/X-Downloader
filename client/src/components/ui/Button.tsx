import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  icon,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const baseStyles = 'rounded-2xl font-medium flex items-center justify-center gap-2 border transition-all duration-200 cursor-pointer shadow-sm';

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-12 px-6 text-sm sm:text-base min-w-[120px]',
    lg: 'h-14 px-8 text-base sm:text-lg min-w-[140px]',
  }[size];

  const variantStyles = {
    primary: isButtonDisabled
      ? 'bg-slate-100 dark:bg-[#161618] text-slate-400 dark:text-slate-500 border-slate-200 dark:border-white/10 cursor-not-allowed'
      : 'bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-[#222226] text-slate-900 dark:text-white border-slate-200/90 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30',
    secondary: 'bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700',
    danger: 'bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
  }[variant];

  return (
    <motion.button
      disabled={isButtonDisabled}
      whileHover={isButtonDisabled ? {} : { scale: 1.02 }}
      whileTap={isButtonDisabled ? {} : { scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{loadingText}</span>
        </div>
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </motion.button>
  );
}
