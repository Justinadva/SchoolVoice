'use client';

import { cn, formatRelativeTime, truncate } from '@/lib/utils';
import { Complaint } from '@/types';
import { motion } from 'framer-motion';
import { Building2, Calendar, ChevronRight, MapPin, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface ComplaintCardProps {
  complaint: Complaint;
  onClick?: () => void;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  Bullying: 'text-[#fb7185] bg-[#fb7185]/10 border-[#fb7185]/20',
  'Fasilitas Sekolah': 'text-[#22d3ee] bg-[#22d3ee]/10 border-[#22d3ee]/20',
  Kekerasan: 'text-[#f87171] bg-[#f87171]/10 border-[#f87171]/20',
  Kebersihan: 'text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20',
  'Pelayanan Guru': 'text-[#c084fc] bg-[#c084fc]/10 border-[#c084fc]/20',
  Administrasi: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
  Lainnya: 'text-[#6b8f82] bg-[#6b8f82]/10 border-[#6b8f82]/20',
};

export default function ComplaintCard({ complaint, onClick, compact = false }: ComplaintCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        'group rounded-xl border border-[#1a3a2e] bg-[#0d1a16]/80 backdrop-blur-sm',
        'transition-all duration-300 hover:border-[#2a5a46] hover:shadow-[0_0_30px_rgba(52,211,153,0.08)]',
        onClick && 'cursor-pointer',
        compact ? 'p-4' : 'p-5'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs text-[#6b8f82] bg-[#122a22] px-2 py-0.5 rounded">
              {complaint.ticketCode}
            </span>
            {complaint.isAnonymous && (
              <span className="text-xs text-[#6b8f82] border border-[#1a3a2e] px-2 py-0.5 rounded">
                Anonim
              </span>
            )}
          </div>
          <h3 className="font-semibold text-[#d1fae5] mb-1.5 line-clamp-1 group-hover:text-[#34d399] transition-colors">
            {complaint.title}
          </h3>
          {!compact && (
            <p className="text-sm text-[#6b8f82] line-clamp-2 mb-3">
              {truncate(complaint.description, 120)}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-[#6b8f82]">
            <span className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {complaint.school}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {truncate(complaint.location, 25)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatRelativeTime(complaint.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusBadge status={complaint.status} size="sm" />
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full border flex items-center gap-1',
              categoryColors[complaint.category] ?? categoryColors['Lainnya']
            )}
          >
            <Tag className="h-3 w-3" />
            {complaint.category}
          </span>
          {onClick && (
            <ChevronRight className="h-4 w-4 text-[#6b8f82] group-hover:text-[#34d399] transition-colors mt-1" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
