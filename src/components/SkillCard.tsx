"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SkillCardProps {
  title: string;
  skills: string;
  delay: number;
  icon: ReactNode;
}

export default function SkillCard({ title, skills, delay, icon }: SkillCardProps) {
  return (
    <motion.div 
      className="rounded-xl p-5 backdrop-blur-sm transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        color: 'var(--text-primary)',
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
