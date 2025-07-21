'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function LoadingSpinner({ size = 'md', color = 'blue' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`
        ${sizeClasses[size]} 
        border-2 border-transparent border-t-current
        rounded-full
        ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}
      `}
    />
  );
}
