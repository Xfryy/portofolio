"use client";

import { motion } from 'framer-motion';

interface BioSectionProps {
  bio: string;
}

export default function BioSection({ bio }: BioSectionProps) {
  return (
    <div className="mb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-1 w-8 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>
        About Me
      </motion.h2>
      
      <motion.div 
        className="text-lg leading-relaxed"
        style={{
          color: 'var(--text-primary)', // Use primary text color for visibility
          backgroundColor: 'var(--card-bg)', // Add subtle background for contrast
          padding: '1rem', // Add padding for better spacing
          borderRadius: '0.5rem', // Add rounded corners
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {bio}
      </motion.div>
    </div>
  );
}
