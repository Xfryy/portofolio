"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

interface ProfileSectionProps {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  onExpand?: (expanded: boolean) => void;
}

export default function ProfileSection({ name, role, location, imageUrl, onExpand }: ProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    { 
      icon: <FaGithub size={20} />, 
      url: 'https://github.com/Xfryy', 
      color: 'hover:bg-gray-700',
      label: 'GitHub'
    },
    { 
      icon: <FaLinkedin size={20} />, 
      url: 'https://www.linkedin.com/in/muhammad-faatih-al-ghifarri-candra-08a977368', 
      color: 'hover:bg-blue-600',
      label: 'LinkedIn'
    },
    { 
      icon: <FaInstagram size={20} />, 
      url: 'https://www.instagram.com/zfryyless/', 
      color: 'hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600',
      label: 'Instagram'
    },
    { 
      icon: <FaFacebook size={20} />, 
      url: 'https://www.facebook.com/share/1Acg41o7Fj/', 
      color: 'hover:bg-blue-500',
      label: 'Facebook'
    }
  ];

  return (
    <>
      <div className="text-center relative z-10 mb-16">
        {/* Enhanced Profile Container */}
        <motion.div
          layout
          className="relative inline-block"
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8
          }}
        >
          {/* Floating Elements Around Profile */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                style={{
                  top: `${20 + Math.sin(i * Math.PI / 3) * 80}%`,
                  left: `${50 + Math.cos(i * Math.PI / 3) * 80}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Main Profile Image Container */}
          <motion.div
            className={`relative cursor-pointer overflow-hidden group ${
              isExpanded ? 'rounded-full shadow-2xl' : 'rounded-3xl'
            }`}
            style={{
              width: isExpanded 
                ? windowWidth < 768 ? '280px' : '350px'
                : '220px',
              height: isExpanded 
                ? windowWidth < 768 ? '280px' : '350px'
                : '220px',
            }}
            onClick={toggleExpand}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layoutId="profile-image"
            whileHover={{ scale: isExpanded ? 1 : 1.02 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8
            }}
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full p-1">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-full"
                  priority
                  sizes="(max-width: 768px) 280px, 350px"
                />
              </div>
            </div>
            
            {/* Overlay with Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Click indicator */}
            {!isExpanded && (
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                Click to expand
              </motion.div>
            )}
            
            {/* Enhanced Pulse Animation Ring */}
            {!isExpanded && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none border-2"
                  animate={{ 
                    scale: [1, 1.2, 1.4],
                    opacity: [0, 0.4, 0],
                    borderColor: [
                      'rgba(59, 130, 246, 0)',
                      'rgba(59, 130, 246, 0.6)',
                      'rgba(147, 51, 234, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none border-2"
                  animate={{ 
                    scale: [1, 1.1, 1.25],
                    opacity: [0, 0.6, 0],
                    borderColor: [                      'rgba(59, 130, 246, 0)',
                      'rgba(59, 130, 246, 0.6)',
                      'rgba(37, 99, 235, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 0.5
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Enhanced Info Section */}
        <motion.div
          layout
          className="mt-8 space-y-6"
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-2">
              {name}
            </h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Role with icon */}
          <motion.div
            className="flex items-center justify-center gap-2 text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaCode className="text-blue-500" />
            <span className="font-medium">{role}</span>
          </motion.div>

          {/* Location with enhanced styling */}
          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FaMapMarkerAlt className="text-red-500" />
            <span>{location}</span>
          </motion.div>
          
          {/* Enhanced Social Links */}
          <motion.div 
            className="flex justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (index * 0.1), type: "spring" }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${social.color} transition-all duration-300 group-hover:text-white group-hover:shadow-lg group-hover:scale-110 backdrop-blur-sm`}
                >
                  {social.icon}
                </a>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {social.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              className="relative mt-6 px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-medium overflow-hidden group shadow-lg"
              onClick={() => window.location.href = 'mailto:contact@faatih.dev'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/20 to-black/60 backdrop-blur-md z-0"
            onClick={toggleExpand}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}