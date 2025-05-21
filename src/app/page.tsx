"use client";

import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/hero';
import FeaturedProject from '@/components/FeaturedProject';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <Hero 
            title="Building bridges between design and code"
            subtitle="I'm a web developer with a passion for creating visually stunning and highly functional websites. With expertise in modern web technologies, I bring ideas to life with clean, efficient code."
            showButtons={true}
            showProfile={true}
          />

          {/* Featured Project */}
          <div className="mt-24">
            <FeaturedProject 
              title="Next.js Portfolio"
              description="A modern portfolio built with Next.js featuring server-side rendering, dynamic routing, and optimized performance. This project showcases my ability to create fast, SEO-friendly web applications."
              projectUrl="/work/nextjs"
              role="Fullstack Developer & Designer"
              technologies={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
            />
          </div>

          {/* Additional content section */}
          <div className="mt-24 border-t border-themed pt-12">
            <motion.h2 
              className="flex items-center gap-4 text-2xl md:text-3xl mb-8 text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
              What I Do
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  description: "Building responsive, accessible, and performant websites with modern technologies.",
                  icon: "💻"
                },
                {
                  title: "UI/UX Design",
                  description: "Creating intuitive user interfaces with thoughtful user experience principles.",
                  icon: "🎨"
                },
                {
                  title: "Performance Optimization",
                  description: "Ensuring your website loads quickly and runs smoothly on all devices.",
                  icon: "⚡"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl p-6 border transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text-primary)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}