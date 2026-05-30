'use client';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;         // Terima string bebas — nilai dari Supabase bisa berbeda
  className?: string;
  size?: 'sm' | 'md';
}

type BadgeConfig = { bg: string; text: string; dot: string; label: string };

/**
 * Map semua kemungkinan nilai status dari Supabase (bahasa Indonesia kapital)
 * maupun nilai lama (bahasa Inggris lowercase) ke config warna yang sama.
 */
const statusConfig: Record<string, BadgeConfig> = {
  // ── Nilai baru dari Supabase (insert dengan status: 'Menunggu') ──────────
  Menunggu: {
    bg: 'bg-[#fbbf24]/10 border-[#fbbf24]/30',
    text: 'text-[#fbbf24]',
    dot: 'bg-[#fbbf24]',
    label: 'Menunggu',
  },
  Diproses: {
    bg: 'bg-[#22d3ee]/10 border-[#22d3ee]/30',
    text: 'text-[#22d3ee]',
    dot: 'bg-[#22d3ee]',
    label: 'Diproses',
  },
  Selesai: {
    bg: 'bg-[#34d399]/10 border-[#34d399]/30',
    text: 'text-[#34d399]',
    dot: 'bg-[#34d399]',
    label: 'Selesai',
  },
  Ditolak: {
    bg: 'bg-[#fb7185]/10 border-[#fb7185]/30',
    text: 'text-[#fb7185]',
    dot: 'bg-[#fb7185]',
    label: 'Ditolak',
  },

  // ── Nilai lama (lowercase English) untuk backward-compatibility ─────────
  pending: {
    bg: 'bg-[#fbbf24]/10 border-[#fbbf24]/30',
    text: 'text-[#fbbf24]',
    dot: 'bg-[#fbbf24]',
    label: 'Menunggu',
  },
  diproses: {
    bg: 'bg-[#22d3ee]/10 border-[#22d3ee]/30',
    text: 'text-[#22d3ee]',
    dot: 'bg-[#22d3ee]',
    label: 'Diproses',
  },
  selesai: {
    bg: 'bg-[#34d399]/10 border-[#34d399]/30',
    text: 'text-[#34d399]',
    dot: 'bg-[#34d399]',
    label: 'Selesai',
  },
  ditolak: {
    bg: 'bg-[#fb7185]/10 border-[#fb7185]/30',
    text: 'text-[#fb7185]',
    dot: 'bg-[#fb7185]',
    label: 'Ditolak',
  },
};

/** Fallback aman jika status tidak dikenal sama sekali */
const FALLBACK: BadgeConfig = {
  bg: 'bg-[#6b8f82]/10 border-[#6b8f82]/30',
  text: 'text-[#6b8f82]',
  dot: 'bg-[#6b8f82]',
  label: 'Tidak Diketahui',
};

export default function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  // Case-insensitive lookup: coba exact match dulu, lalu lowercase, lalu fallback
  const config: BadgeConfig =
    statusConfig[status] ??
    statusConfig[status?.toLowerCase?.()] ??
    FALLBACK;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.bg,
        config.text,
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      <span className={cn('rounded-full', config.dot, size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2')} />
      {/* Tampilkan label dari config (selalu tersedia), bukan dari prop status mentah */}
      {config.label}
    </span>
  );
}
