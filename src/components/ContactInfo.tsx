"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ContactInfoItem {
  icon: ReactNode;
  title: string;
  value: string;
  href: string;
}

interface ContactInfoProps {
  contactInfo: ContactInfoItem[];
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {contactInfo.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          className="p-6 text-center bg-white dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400 mb-4">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-gray-700 dark:text-gray-400">{item.value}</p>
        </motion.a>
      ))}
    </div>
  );
}