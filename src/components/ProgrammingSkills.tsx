"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  delay: number;
}

const SkillBar = ({ name, percentage, color, delay }: SkillBarProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div 
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function ProgrammingSkills() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="mb-12">Loading...</div>;
  }

  const skills = [
    { name: "JavaScript", percentage: 25, color: "#F7DF1E" },
    { name: "TypeScript", percentage: 38, color: "#3178C6" },
    { name: "React", percentage: 20, color: "#61DAFB" },
    { name: "Next.js", percentage: 41, color: "#000000" },
    { name: "HTML/CSS", percentage: 60, color: "#E34F26" },
    { name: "Tailwind CSS", percentage: 32, color: "#06B6D4" },
    { name: "PHP", percentage: 21, color: "#777BB4" },
    { name: "Python", percentage: 5, color: "#3776AB" }
  ];

  return (
    <div className="mb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white"
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
        Programming Skills
      </motion.h2>
      
      <motion.div 
        className="rounded-xl p-6 backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {skills.map((skill, index) => (
            <SkillBar 
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              color={skill.color}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}