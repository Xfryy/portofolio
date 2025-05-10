"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileSectionProps {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
}

export default function ProfileSection({ name, role, location, imageUrl }: ProfileSectionProps) {
  return (
    <div className="mb-16 text-center">
      <motion.div 
        className="mb-6 relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4"
        style={{
          borderColor: 'var(--border-color)', // Dynamic border color
          backgroundColor: 'var(--card-bg)', // Add background for better contrast
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src={imageUrl} 
          alt={name}
          fill
          className="object-cover"
        />
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold mb-2"
        style={{ color: 'var(--text-primary)' }} // Ensure text is visible
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {name}
      </motion.h1>
      
      <motion.div
        className="text-lg mb-4 text-blue-600 dark:text-blue-400" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {role}
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        {location}
      </motion.div>
    </div>
  );
}