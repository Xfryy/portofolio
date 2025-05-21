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
          className="p-6 text-center rounded-xl border hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
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
          <div className="inline-block p-3 rounded-full mb-4" 
            style={{
              backgroundColor: 'var(--button-primary-bg)',
              color: 'var(--button-primary-text)',
              opacity: 0.8
            }}>
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
        </motion.a>
      ))}
    </div>
  );
}