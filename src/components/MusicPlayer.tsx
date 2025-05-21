"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function MusicPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    isExpanded, 
    togglePlay, 
    toggleExpanded,
    nextSong,
    prevSong,
    progress 
  } = useMusicPlayer();
  
  const [isMounted, setIsMounted] = useState(false);
  const [isDiskRotating, setIsDiskRotating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle disk rotation
  useEffect(() => {
    setIsDiskRotating(isPlaying);
  }, [isPlaying]);

  // Client-side only mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render on server side
  if (!isMounted || !currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.25 }}
      >
        <motion.div
          layout
          className="bg-black/80 backdrop-blur-lg border border-white/20 overflow-hidden"
          style={{ borderRadius: isExpanded ? '0.75rem' : '9999px' }}
          animate={{ 
            width: isExpanded ? 300 : 80,
            height: isExpanded ? 96 : 80
          }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 300
          }}
        >
          <div className="flex items-center h-full">
            {/* Album Cover */}
            <div 
              className="relative min-w-[80px] w-20 h-20 cursor-pointer overflow-hidden"
              style={{
                borderRadius: '9999px'
              }}
              onClick={toggleExpanded}
            >
              <motion.div
                className="w-full h-full"
                animate={{ 
                  rotate: isDiskRotating ? 360 : 0 
                }}
                transition={{ 
                  rotate: { 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }
                }}
                style={{ 
                  borderRadius: '9999px'
                }}
              >
                <Image
                  src={imageError ? '/music/default-cover.jpg' : currentSong.cover}
                  alt={currentSong.title}
                  fill
                  className="object-cover rounded-full"
                  priority
                  onError={() => setImageError(true)}
                />
              </motion.div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <motion.div
                className="flex-1 flex flex-col justify-between h-full pl-4 pr-2 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-medium truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {currentSong.artist}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-700/50 h-1 rounded-full mb-2 mt-1">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={prevSong}
                    className="text-white/80 hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={togglePlay}
                    className="text-white/80 hover:text-white bg-blue-500/20 rounded-full p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={nextSong}
                    className="text-white/80 hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}