'use client';

import { useTheme } from '@/context/ThemeContext';

export default function GradientBlobs() {
  const { isDark } = useTheme();

  if (!isDark) {
    // Light mode: very subtle warm blobs (f5e6b3 palette)
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="blob-animate absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f5e6b3 0%, transparent 70%)' }}
        />
        <div
          className="blob-animate-delay-2 absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #e5d09e 0%, transparent 70%)' }}
        />
        <div
          className="blob-animate-delay-4 absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #f5e6b3 0%, transparent 70%)' }}
        />
      </div>
    );
  }

  // Dark mode: emerald blobs
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="blob-animate absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="blob-animate-delay-2 absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="blob-animate-delay-4 absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)' }}
      />
    </div>
  );
}
