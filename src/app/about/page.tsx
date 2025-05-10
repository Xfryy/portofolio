"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileSection from '@/components/ProfileSection';
import BioSection from '@/components/BioSection';
import SkillsSection from '@/components/SkillSection';
import PageTransition from '@/components/PageTransition';

export default function About() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Listen to profile expansion state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleProfileExpand = (expanded: boolean) => {
    setIsProfileExpanded(expanded);
  };

  return (
    <PageTransition>
      <AnimatedBackground />
      
      {/* Pointing Hands - Hidden on mobile (<768px), visible on md and up */}
      <AnimatePresence>
        {isProfileExpanded && (
          <>
            <motion.div
              className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            >
              <Image
                src="/Components/LeftHand.png"
                alt="Left pointing hand"
                width={400}
                height={400}
                className="object-contain"
              />
            </motion.div>
            <motion.div
              className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block"
              initial={{ x: 100 }}
              animate={{ x: 80 }}
              exit={{ x: 500 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            >
              <Image
                src="/Components/RightHand.png"
                alt="Right pointing hand"
                width={500}
                height={500}
                className="object-contain"
                style={{ rotate: '20deg' }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <ProfileSection 
            name="M. Faatih"
            role="Web Developer"
            location="Asia/Jakarta"
            imageUrl="/Components/Profile.jpg"
            onExpand={setIsProfileExpanded}
          />
          
          <BioSection 
            bio="My Name is Muhammad Faatih I lived in Bekasi-based design engineer with a passion for transforming complex challenges into simple, elegant design solutions. My work spans digital interfaces, interactive experiences, and the convergence of design and technology."
          />
          
          <SkillsSection />
        </div>
      </div>
    </PageTransition>
  );
}