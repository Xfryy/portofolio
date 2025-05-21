"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

interface EducationItemProps {
  period: string;
  school: string;
  description: string;
  index: number;
}

const EducationItem = ({ period, school, description, index }: EducationItemProps) => {
  return (
    <motion.div 
      className="flex gap-4 mb-8 relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * index + 0.2 }}
        >
          <FaGraduationCap size={20} />
        </motion.div>
        {/* Vertical line */}
        {index < 2 && (
          <motion.div 
            className="w-0.5 bg-gray-300 dark:bg-gray-700 h-full flex-grow mt-2"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
          />
        )}
      </div>
      
      <div className="flex-grow">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium block mb-1">{period}</span>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{school}</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </motion.div>
  );
};

export default function EducationSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="mb-12">Loading...</div>;
  }

  const educationHistory = [
    {
      period: "2022 - 2025",
      school: "SMK Jakarta 1 Pondok kopi",
      description: "Jurusan Rekayasa Perangkat Lunak (RPL), dengan fokus pada pengembangan aplikasi dan sistem informasi."
    },
    {
      period: "2019 - 2022",
      school: "SMP Nurul Anwar 72",
      description: "Pendidikan menengah pertama dengan prestasi akademik dan partisipasi aktif dalam organisasi sekolah."
    },
    {
      period: "2014 - 2019",
      school: "SD Jisc Jakarta islamic school",
      description: "Pendidikan dasar yang membentuk fondasi akademik dan keterampilan sosial awal."
    }
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
        Education
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
        {educationHistory.map((edu, index) => (
          <EducationItem 
            key={edu.school}
            period={edu.period}
            school={edu.school}
            description={edu.description}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}