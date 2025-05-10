"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Card({ children, className = "", delay = 0 }: CardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDark = resolvedTheme === 'dark';
  
  return (
    <motion.div 
      className={`p-6 bg-white/90 dark:bg-gray-900/20 rounded-xl border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5, 
        boxShadow: isDark 
          ? "0 10px 30px -15px rgba(0, 0, 255, 0.2)" 
          : "0 10px 30px -15px rgba(0, 0, 200, 0.1)",
        borderColor: isDark ? "rgba(100, 100, 255, 0.3)" : "rgba(100, 100, 255, 0.5)"
      }}
    >
      {children}
    </motion.div>
  );
}