"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  index: number;
}

export default function BlogCard({ title, excerpt, date, slug, index }: BlogCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDark = resolvedTheme === 'dark';
  const hoverBgColor = isDark ? 'rgba(30, 41, 59, 0.2)' : 'rgba(240, 245, 255, 0.5)';
  const hoverBorderColor = isDark ? 'rgba(100, 100, 255, 0.3)' : 'rgba(100, 100, 255, 0.5)';
  
  return (
    <motion.article 
      className="border-b border-gray-300 dark:border-gray-800 pb-8 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ 
        x: 5,
        backgroundColor: hoverBgColor,
        borderColor: hoverBorderColor
      }}
    >
      <Link href={`/blog/${slug}`} className="block p-4 -m-4 rounded-lg transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors duration-300">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{excerpt}</p>
        <time className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v4l3 3"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          {date}
        </time>
      </Link>
    </motion.article>
  );
}