'use client';

import { motion } from 'framer-motion';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'Belum ada data',
  description = 'Belum ada pengaduan yang dikirim.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1a3a2e] bg-[#122a22]">
        {icon ?? <FileX className="h-9 w-9 text-[#6b8f82]" />}
      </div>
      <h3 className="text-lg font-semibold text-[#d1fae5] mb-2">{title}</h3>
      <p className="text-sm text-[#6b8f82] max-w-xs">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
