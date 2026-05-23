'use client';

import { cn, getStatusLabel } from '@/lib/utils';
import { ComplaintStatus } from '@/types';

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ComplaintStatus, { bg: string; text: string; dot: string }> = {
  pending: {
    bg: 'bg-[#fbbf24]/10 border-[#fbbf24]/30',
    text: 'text-[#fbbf24]',
    dot: 'bg-[#fbbf24]',
  },
  diproses: {
    bg: 'bg-[#22d3ee]/10 border-[#22d3ee]/30',
    text: 'text-[#22d3ee]',
    dot: 'bg-[#22d3ee]',
  },
  selesai: {
    bg: 'bg-[#34d399]/10 border-[#34d399]/30',
    text: 'text-[#34d399]',
    dot: 'bg-[#34d399]',
  },
  ditolak: {
    bg: 'bg-[#fb7185]/10 border-[#fb7185]/30',
    text: 'text-[#fb7185]',
    dot: 'bg-[#fb7185]',
  },
};

export default function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
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
      {getStatusLabel(status)}
    </span>
  );
}
