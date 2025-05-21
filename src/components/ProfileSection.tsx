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
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
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
          animate={{ 
            scale: isExpanded ? 
              windowWidth < 768 ? 1.2 : 1.5 
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
                ? windowWidth < 768 ? '250px' : '300px'
                : '200px',
              height: isExpanded 
                ? windowWidth < 768 ? '250px' : '300px'
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
            
            {/* Pulse animation ring */}
            {!isExpanded && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ 
                  opacity: [0.7, 0.5, 0.3, 0], 
                  scale: [1, 1.05, 1.1, 1.15],
                }}
                transition={{
                  times: [0, 0.3, 0.6, 1],
                  repeat: Infinity,
                  duration: 2
                }}
                style={{
                  border: '2px solid rgba(59, 130, 246, 0.5)',
                }}
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="mt-6 space-y-4"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">{name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{location}</p>
          
          {/* Social Links */}
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
          
          {/* CTA Button */}
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