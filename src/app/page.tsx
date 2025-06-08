"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/hero';
import FeaturedProject from '@/components/FeaturedProject';
import PageTransition from '@/components/PageTransition';
import ChatWidget from '@/components/ChatWidget';
import TechnicalSkills from '@/components/TechnicalSkills';
import ServicesSection from '@/components/ServicesSection'; // Import the new component
import CodingJourneySection from '@/components/CodingJourneySection';

// Loading component for Spline
const SplineLoading = () => (
  <div className="w-full h-[600px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-500">Loading 3D Scene...</p>
    </div>
  </div>
);

// Dynamic import for SplineComponent
const Spline = dynamic(() => import('@/components/SplineComponent'), {
  ssr: false,
  loading: SplineLoading
});

export default function Home() {
  const [splineError, setSplineError] = useState(false);
  const [showSpline, setShowSpline] = useState(false);

  const handleSplineLoad = () => setSplineError(false);
  const handleSplineError = () => setSplineError(true);

  useEffect(() => {
    if (!showSpline) {
      setSplineError(false);
    }
  }, [showSpline]);

  return (
    <PageTransition>
      <AnimatedBackground />
      <ChatWidget />
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <Hero 
            title="Building bridges between design and code"
            subtitle="I'm a web developer with a passion for creating visually stunning and highly functional websites. With expertise in modern web technologies, I bring ideas to life with clean, efficient code."
            showButtons={true}
            showProfile={true}
          />

          {/* Button to toggle Spline */}
          <div className="flex justify-center mt-12 mb-6">
            <motion.button
              onClick={() => setShowSpline(prev => !prev)}
              className="group relative px-6 py-3 text-sm font-medium rounded-full overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                color: 'var(--text-primary)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {showSpline ? (
                  <>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      ⬆️
                    </motion.span>
                    Hide 3D Scene
                  </>
                ) : (
                  <>
                    <motion.span
                      initial={{ rotate: 180 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ⬇️
                    </motion.span>
                    Show 3D Scene
                  </>
                )}
              </span>
              <div
                className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 opacity-10"
              />
            </motion.button>
          </div>

          {/* Spline Scene Section */}
          {showSpline && (
            <motion.div 
              className="mt-6 mb-24 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm w-full">
                <div className="w-full h-[600px] md:h-[700px]">
                  <Suspense fallback={<SplineLoading />}>
                    {!splineError ? (
                      <Spline
                        scene="https://prod.spline.design/RFm0kAGZX32ecRBz/scene.splinecode"
                        onLoad={handleSplineLoad}
                        onError={handleSplineError}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎨</div>
                          <p className="text-gray-600 dark:text-gray-400">3D Scene temporarily unavailable</p>
                          <button 
                            onClick={() => setSplineError(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    )}
                  </Suspense>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          )} 

          {/* Featured Project */}
          <div className="mt-24">
            <FeaturedProject 
              title="Next.js Portfolio"
              description="A modern portfolio built with Next.js featuring server-side rendering, dynamic routing, and optimized performance. This project showcases my ability to create fast, SEO-friendly web applications."
              projectUrl="/work/nextjs"
              role="Fullstack Developer & Designer"
              technologies={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Spline 3D']}
            />
          </div>

          {/* Coding Journey Section */}
          <CodingJourneySection />

          {/* Technical Skills Section */}
          <TechnicalSkills />

          {/* Services Section - Replaces the old "What I Do" section */}
          <ServicesSection />
        </div>
      </div>
    </PageTransition>
  );
}