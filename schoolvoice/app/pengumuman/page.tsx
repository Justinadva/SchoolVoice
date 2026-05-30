'use client';

import AnimatedModal from '@/components/ui/AnimatedModal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import { Announcement } from '@/types';
import { motion } from 'framer-motion';
import { Bookmark, Building2, Calendar, ChevronRight, Loader2, Pin, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const categoryColors: Record<string, string> = {
  'Pengumuman Sistem': '#34d399',
  Akademik: '#22d3ee',
  Penting: '#fb7185',
  'Lomba & Kompetisi': '#c084fc',
  Fasilitas: '#fbbf24',
};

function AnnouncementCard({ ann, onClick }: { ann: Announcement; onClick: () => void }) {
  const color = categoryColors[ann.category] ?? '#6b8f82';
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border bg-[#0d1a16]/80 backdrop-blur-sm transition-all duration-300 p-5 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] ${
        ann.isPriority ? 'border-[#fb7185]/30 hover:border-[#fb7185]/60' : 'border-[#1a3a2e] hover:border-[#2a5a46]'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {ann.isPriority && (
            <span className="flex items-center gap-1 text-xs bg-[#fb7185]/10 text-[#fb7185] border border-[#fb7185]/20 px-2 py-0.5 rounded-full font-medium">
              <Pin className="h-3 w-3" /> Prioritas
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
          <Building2 className="h-3.5 w-3.5" /> {ann.school}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark className="h-3.5 w-3.5" /> {ann.author}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Calendar className="h-3.5 w-3.5" /> {formatDate(ann.publishDate)}
        </span>
      </div>
    </motion.div>
  );
}

export default function PengumumanPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      const { data, error: sbError } = await supabase
        .from('announcements')
        .select('*')
        .order('publish_date', { ascending: false });

      if (sbError) {
        setError('Gagal memuat pengumuman. Silakan coba lagi nanti.');
      } else {
        const mapped: Announcement[] = (data ?? []).map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          category: item.category,
          isPriority: item.is_priority,
          publishDate: item.publish_date,
          school: item.school,
          author: item.author,
        }));
        setAnnouncements(mapped);
      }
      setLoading(false);
    };
    fetchAnnouncements();
  }, []);

  const priority = announcements.filter((a) => a.isPriority);
  const regular = announcements.filter((a) => !a.isPriority);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Informasi Sekolah — SMA N 1 Gringsing"
          title="Pengumuman Terkini"
          subtitle="Pantau pengumuman resmi dari sekolah, termasuk jadwal, kebijakan, dan informasi penting lainnya."
        />

        {/* Loading */}
        {loading && (
          <div className="mt-16 flex flex-col items-center gap-3 text-[#6b8f82]">
            <Loader2 className="h-8 w-8 animate-spin text-[#34d399]" />
            <p className="text-sm">Memuat pengumuman...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-xl border border-[#fb7185]/20 bg-[#fb7185]/5 p-6 text-center">
            <p className="text-[#fb7185] font-medium">{error}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {priority.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-[#fb7185]" />
                  <h2 className="text-sm font-semibold text-[#fb7185] uppercase tracking-wider">Pengumuman Penting</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {priority.map((ann) => (
                    <AnnouncementCard key={ann.id} ann={ann} onClick={() => setSelected(ann)} />
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="h-4 w-4 text-[#6b8f82]" />
                <h2 className="text-sm font-semibold text-[#6b8f82] uppercase tracking-wider">Pengumuman Lainnya</h2>
              </div>
              {regular.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regular.map((ann) => (
                    <AnnouncementCard key={ann.id} ann={ann} onClick={() => setSelected(ann)} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-[#6b8f82] text-sm border border-dashed border-[#1a3a2e] rounded-xl">
                  {announcements.length === 0 ? 'Belum ada pengumuman saat ini.' : 'Tidak ada pengumuman tambahan.'}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatedModal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.category} size="lg">
        {selected && (
          <div className="p-6">
            {selected.isPriority && (
              <span className="inline-flex items-center gap-1 mb-3 text-xs bg-[#fb7185]/10 text-[#fb7185] border border-[#fb7185]/20 px-2.5 py-1 rounded-full">
                <Pin className="h-3.5 w-3.5" /> Prioritas
              </span>
            )}
            <h2 className="text-xl font-bold text-[#d1fae5] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              {selected.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-[#6b8f82] mb-5 pb-5 border-b border-[#1a3a2e]">
              <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" />{selected.school}</span>
              <span className="flex items-center gap-1.5"><Bookmark className="h-4 w-4" />{selected.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(selected.publishDate)}</span>
            </div>
            <p className="text-sm text-[#d1fae5]/90 leading-relaxed whitespace-pre-line">{selected.content}</p>
          </div>
        )}
      </AnimatedModal>
    </div>
  );
}