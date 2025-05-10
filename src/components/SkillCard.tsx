"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTheme } from 'next-themes';

interface SkillCardProps {
  title: string;
  skills: string;
  delay: number;
  icon: ReactNode;
}

export default function SkillCard({ title, skills, delay, icon }: SkillCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div 
      className="rounded-xl p-5 backdrop-blur-sm transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--card-bg)', // Dynamic card background
        borderColor: 'var(--card-border)', // Dynamic border color
        color: 'var(--text-primary)', // Ensure text is visible
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {skills}
      </p>
    </motion.div>
  );
}
