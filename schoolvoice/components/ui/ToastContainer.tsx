'use client';

import { useToast } from '@/context/ToastContext';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from 'lucide-react';

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-[#34d399]" />,
  error: <AlertCircle className="h-5 w-5 text-[#fb7185]" />,
  warning: <AlertTriangle className="h-5 w-5 text-[#fbbf24]" />,
  info: <Info className="h-5 w-5 text-[#22d3ee]" />,
};

const borders = {
  success: 'border-l-[#34d399]',
  error: 'border-l-[#fb7185]',
  warning: 'border-l-[#fbbf24]',
  info: 'border-l-[#22d3ee]',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-[360px] max-w-[calc(100vw-3rem)]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 110, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`flex items-start gap-3 rounded-xl border border-[#1a3a2e] border-l-4 bg-[#0d1a16]/95 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${borders[toast.type]}`}
          >
            <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#d1fae5]">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[#6b8f82] mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[#6b8f82] hover:text-[#d1fae5] transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
