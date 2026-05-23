'use client';

import AnimatedModal from '@/components/ui/AnimatedModal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { dummyAnnouncements } from '@/data/dummy';
import { formatDate } from '@/lib/utils';
import { Announcement } from '@/types';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, ChevronRight, Pin, Sparkles } from 'lucide-react';
import { useState } from 'react';

const categoryColors: Record<string, string> = {
  'Pengumuman Sistem': '#34d399',
  Akademik: '#22d3ee',
  Penting: '#fb7185',
  'Lomba & Kompetisi': '#c084fc',
  Fasilitas: '#fbbf24',
};

function AnnouncementCardUI({ ann, onClick }: { ann: Announcement; onClick: () => void }) {
  const color = categoryColors[ann.category] ?? '#6b8f82';
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border bg-[#0d1a16]/80 backdrop-blur-sm transition-all duration-300 p-5 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] ${ann.isPriority ? 'border-[#fb7185]/30 hover:border-[#fb7185]/60' : 'border-[#1a3a2e] hover:border-[#2a5a46]'}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {ann.isPriority && (
            <span className="flex items-center gap-1 text-xs bg-[#fb7185]/10 text-[#fb7185] border border-[#fb7185]/20 px-2 py-0.5 rounded-full font-medium">
              <Pin className="h-3 w-3" />
              Prioritas
            </span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded-full border font-medium"
            style={{ color, background: `${color}15`, borderColor: `${color}30` }}
          >
            {ann.category}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-[#6b8f82] group-hover:text-[#34d399] shrink-0 transition-colors" />
      </div>

      <h3 className="text-base font-semibold text-[#d1fae5] mb-2 line-clamp-2 group-hover:text-[#34d399] transition-colors">
        {ann.title}
      </h3>
      <p className="text-sm text-[#6b8f82] line-clamp-2 mb-4">{ann.content}</p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b8f82]">
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {ann.school}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark className="h-3.5 w-3.5" />
          {ann.author}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(ann.publishDate)}
        </span>
      </div>
    </motion.div>
  );
}

export default function PengumumanPage() {
  const [selected, setSelected] = useState<Announcement | null>(null);

  const priority = dummyAnnouncements.filter((a) => a.isPriority);
  const regular = dummyAnnouncements.filter((a) => !a.isPriority);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Informasi Sekolah"
          title="Pengumuman Terkini"
          subtitle="Pantau pengumuman resmi dari sekolah, termasuk jadwal, kebijakan, dan informasi penting lainnya."
        />

        {/* Priority Section */}
        {priority.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-[#fb7185]" />
              <h2 className="text-sm font-semibold text-[#fb7185] uppercase tracking-wider">
                Pengumuman Penting
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {priority.map((ann, i) => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <AnnouncementCardUI ann={ann} onClick={() => setSelected(ann)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="h-4 w-4 text-[#6b8f82]" />
            <h2 className="text-sm font-semibold text-[#6b8f82] uppercase tracking-wider">
              Pengumuman Lainnya
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regular.map((ann, i) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <AnnouncementCardUI ann={ann} onClick={() => setSelected(ann)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatedModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.category}
        size="lg"
      >
        {selected && (
          <div className="p-6">
            {selected.isPriority && (
              <span className="inline-flex items-center gap-1 mb-3 text-xs bg-[#fb7185]/10 text-[#fb7185] border border-[#fb7185]/20 px-2.5 py-1 rounded-full">
                <Pin className="h-3.5 w-3.5" />
                Prioritas
              </span>
            )}
            <h2 className="text-xl font-bold text-[#d1fae5] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              {selected.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-[#6b8f82] mb-5 pb-5 border-b border-[#1a3a2e]">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />{selected.school}
              </span>
              <span className="flex items-center gap-1.5">
                <Bookmark className="h-4 w-4" />{selected.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />{formatDate(selected.publishDate)}
              </span>
            </div>
            <p className="text-sm text-[#d1fae5]/90 leading-relaxed whitespace-pre-line">
              {selected.content}
            </p>
          </div>
        )}
      </AnimatedModal>
    </div>
  );
}
