"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface FeaturedProjectProps {
  title: string;
  description: string;
  projectUrl: string;
  role: string;
  technologies: string[];
}

export default function FeaturedProject({
  title,
  description,
  projectUrl,
  role,
  technologies
}: FeaturedProjectProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const dynamicImageUrl = isDark 
    ? '/Changes/Dark.png' 
    : '/Changes/Light.jpg';

  return (
    <div className="border-t border-gray-300 dark:border-gray-800 pt-8">
      <motion.h2 
        className="flex items-center gap-4 text-xl mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="h-1 w-8 bg-blue-500 rounded-full"></span>
        Featured project
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="col-span-1 md:col-span-2 bg-white/30 dark:bg-gray-900/40 rounded-xl overflow-hidden border"
          style={{
            borderColor: 'var(--card-border)', // Dynamic border color
            backgroundColor: 'var(--card-bg)', // Ensure background contrast
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image 
              src={dynamicImageUrl} 
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority // Ensure the image loads quickly
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
            <Link 
              href={projectUrl}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:underline transition-all"
            >
              <span>View case study</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="col-span-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex gap-3 items-center">
            <motion.div 
              className="h-1 w-1 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            ></motion.div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Role</div>
          </div>
          <div style={{ color: 'var(--text-primary)' }}>{role}</div>
          
          <div className="flex gap-3 items-center mt-6">
            <motion.div 
              className="h-1 w-1 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            ></motion.div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Technologies</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.span 
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
