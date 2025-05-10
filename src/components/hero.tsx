"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  showButtons?: boolean;
  showProfile?: boolean;
  imageUrl?: string;
  role?: string;
  customClass?: string;
}

export default function Hero({
  title,
  subtitle,
  showButtons = false,
  showProfile = false,
  imageUrl = "/Components/Profile.jpg",
  role = "Web Developer | Junior",
  customClass = ""
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={`flex flex-col gap-8 mb-12 relative ${customClass}`}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      
      <div className="flex-1">
        <motion.h1 
          className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        <motion.div 
          className="text-xl text-gray-600 dark:text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>{subtitle}</p>
        </motion.div>
      </div>

      {showButtons && (
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/work"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 group w-fit hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span>View my work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            
            <Link 
              href="/about"
              className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg flex items-center gap-2 transition-all duration-300 group w-fit hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
              <span>About Faatih</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {showProfile && (
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image 
                  src={imageUrl}
                  alt="Muhammad Faatih"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Muhammad Faatih</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}