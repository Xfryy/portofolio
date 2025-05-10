"use client";

import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import BlogCard from '@/components/BlogCard';
import PageTransition from '@/components/PageTransition';

export default function Blog() {
  const posts = [
    {
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      date: "2024-01-20",
      slug: "getting-started-with-nextjs"
    },
    {
      title: "The Power of TypeScript",
      excerpt: "Why TypeScript is essential for large-scale applications",
      date: "2024-01-15",
      slug: "power-of-typescript"
    },
    {
      title: "Mastering Tailwind CSS",
      excerpt: "Tips and tricks to leverage the full power of Tailwind CSS",
      date: "2024-01-10",
      slug: "mastering-tailwind-css"
    },
    {
      title: "Framer Motion Animations",
      excerpt: "Creating smooth animations in React applications with Framer Motion",
      date: "2024-01-05",
      slug: "framer-motion-animations"
    },
  ];

  return (
    <PageTransition>
      <AnimatedBackground />
      
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blog
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Thoughts, tutorials, and insights about web development
          </motion.p>
          
          <div className="grid gap-8">
            {posts.map((post, index) => (
              <BlogCard 
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                slug={post.slug}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}