"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProfileSectionProps {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  onExpand?: (expanded: boolean) => void;
}

export default function ProfileSection({ name, role, location, imageUrl, onExpand }: ProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onExpand?.(newState);
  };

  return (
    <>
      <div className="text-center relative z-10">
        <motion.div
          layout
          className="relative inline-block"
          animate={{ 
            scale: isExpanded ? 
              // Smaller scale on mobile, larger on desktop
              window.innerWidth < 768 ? 1.2 : 1.5 
              : 1 
          }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <motion.div
            className={`relative cursor-pointer overflow-visible ${
              isExpanded ? 'rounded-full shadow-2xl' : 'rounded-2xl'
            }`}
            style={{
              width: isExpanded 
                ? window.innerWidth < 768 ? '250px' : '300px'
                : '200px',
              height: isExpanded 
                ? window.innerWidth < 768 ? '250px' : '300px'
                : '200px',
            }}
            onClick={toggleExpand}
            layoutId="profile-image"
            whileHover={{ scale: isExpanded ? 1 : 1.05 }}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover rounded-full"
              priority
            />
            <motion.div
              initial={false}
              animate={{
                boxShadow: isExpanded
                  ? '0 0 50px rgba(59, 130, 246, 0.5)'
                  : '0 0 0px rgba(59, 130, 246, 0)'
              }}
              className="absolute inset-0 rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="mt-6 space-y-2"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{location}</p>
        </motion.div>
      </div>

      {/* Overlay for expanded state */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0"
            onClick={toggleExpand}
          />
        )}
      </AnimatePresence>
    </>
  );
}