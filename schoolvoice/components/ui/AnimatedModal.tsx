'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function AnimatedModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: AnimatedModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`relative w-full ${sizeMap[size]} rounded-2xl border border-[#1a3a2e] bg-[#0d1a16] shadow-[0_0_60px_rgba(52,211,153,0.15)] overflow-hidden`}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-[#1a3a2e] px-6 py-4">
                <h2 className="text-lg font-semibold text-[#d1fae5] font-[family-name:var(--font-poppins)]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-[#6b8f82] hover:text-[#34d399] hover:bg-[#122a22] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-[#6b8f82] hover:text-[#34d399] hover:bg-[#122a22] transition-colors"
                aria-label="Tutup modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="overflow-y-auto max-h-[80vh]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
