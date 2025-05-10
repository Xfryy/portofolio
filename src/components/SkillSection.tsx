"use client";

import { motion } from 'framer-motion';
import SkillCard from './SkillCard';

import { useEffect, useState } from 'react';

export default function SkillsSection() {

  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="mb-12">Loading...</div>;
  }
  
  return (
    <div className="mb-12">
      <motion.h2 
        className={`text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white`}
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
        Skills & Tools
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkillCard 
          title="Design"
          skills="UI/UX Design, Visual Design, Prototyping, User Research, Design Systems"
          delay={0.2}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
              <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
              <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          }
        />
        
        <SkillCard 
          title="Development"
          skills="React, TypeScript, Next.js, Tailwind CSS, Framer Motion, Three.js"
          delay={0.3}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          }
        />
        
        <SkillCard 
          title="Tools"
          skills="Figma, Adobe Suite, VS Code, Git, Vercel, Notion, Framer"
          delay={0.4}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <polyline points="11 3 11 11 14 8 17 11 17 3"></polyline>
            </svg>
          }
        />
      </div>
    </div>
  );
}
