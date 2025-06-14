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
          className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        <motion.div 
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 max-w-2xl"
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
        >          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/work"
                className="group relative inline-flex items-center gap-2 px-6 py-3 font-medium rounded-full overflow-hidden"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>View my work</span>
                  <motion.span
                    className="text-blue-500"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </span>
                <div
                  className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 opacity-10"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            </motion.div>
          </div>

          {showProfile && (
            <Link href="/about" className="flex items-center gap-4 group">
              <motion.div 
                className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/20 hover:ring-blue-500 transition-all duration-300"
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
              <div className="group-hover:text-blue-500 transition-colors duration-300">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Muhammad Faatih</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-400 transition-colors duration-300">{role}</p>
              </div>
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}