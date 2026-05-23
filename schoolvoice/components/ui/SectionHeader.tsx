'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={centered ? 'text-center' : ''}
    >
      {label && (
        <span className="inline-block mb-3 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-3 py-1 text-xs font-medium text-[#34d399] tracking-wider uppercase">
          {label}
        </span>
      )}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d1fae5]"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#6b8f82] text-base max-w-2xl" style={centered ? { margin: '12px auto 0' } : {}}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
