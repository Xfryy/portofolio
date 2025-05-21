"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

interface ProfileSectionProps {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  onExpand?: (expanded: boolean) => void;
}

export default function ProfileSection({ name, role, location, imageUrl, onExpand }: ProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onExpand?.(newState);
  };

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/faatih' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/faatih' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com/faatih' },
    { icon: <FaDribbble size={20} />, url: 'https://dribbble.com/faatih' }
  ];

  return (
    <>
      <div className="text-center relative z-10 mb-16">
        <motion.div
          layout
          className="relative inline-block"
          transition={{ 
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.5
          }}
        >
          <motion.div
            className={`relative cursor-pointer overflow-hidden ${
              isExpanded ? 'rounded-full shadow-2xl' : 'rounded-2xl'
            }`}
            style={{
              width: isExpanded 
                ? windowWidth < 768 ? '250px' : '300px'
                : '200px',
              height: isExpanded 
                ? windowWidth < 768 ? '250px' : '300px'
                : '200px',
            }}
            onClick={toggleExpand}
            layoutId="profile-image"
            whileHover={{ scale: isExpanded ? 1 : 1.05 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 0.5
            }}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover rounded-full"
              priority
              sizes="(max-width: 768px) 250px, 300px"
            />
            
            
            {/* Improved Pulse Animation Ring */}
            {!isExpanded && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ 
                  opacity: 0,
                  scale: 1,
                  borderWidth: '4px',
                  borderColor: 'rgba(59, 130, 246, 0)'
                }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.15, 1.3],
                  borderColor: [
                    'rgba(59, 130, 246, 0)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(59, 130, 246, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  times: [0, 0.5, 1]
                }}
                style={{
                  borderStyle: 'solid'
                }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Rest of the component remains the same */}
        <motion.div
          layout
          className="mt-6 space-y-4"
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">{name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{location}</p>
          
          <motion.div 
            className="flex justify-center gap-4 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = 'mailto:contact@faatih.dev'}
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0"
            onClick={toggleExpand}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}