'use client';

import ComplaintCard from '@/components/ui/ComplaintCard';
import AnimatedModal from '@/components/ui/AnimatedModal';
import EmptyState from '@/components/ui/EmptyState';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeader from '@/components/ui/SectionHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { useComplaint } from '@/context/ComplaintContext';
import { formatDate, formatDateTime } from '@/lib/utils';
import { ComplaintStatus, Complaint } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Calendar, ChevronLeft, ChevronRight, ClipboardList, Filter, MapPin, MessageSquare, PlusCircle, Search, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 5;
const statusFilters: { value: ComplaintStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'diproses', label: 'Diproses' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'ditolak', label: 'Ditolak' },
];

export default function RiwayatPage() {
  const { complaints } = useComplaint();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.ticketCode.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [complaints, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (status: ComplaintStatus | 'all') => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const stats = {
    total: complaints.length,
    selesai: complaints.filter((c) => c.status === 'selesai').length,
    diproses: complaints.filter((c) => c.status === 'diproses').length,
    pending: complaints.filter((c) => c.status === 'pending').length,
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <SectionHeader
            label="Riwayat Laporan"
            title="Dashboard Pengaduan"
            subtitle="Pantau semua laporan yang pernah Anda kirimkan."
          />
          <Link href="/pengaduan">
            <GlowButton icon={<PlusCircle className="h-4 w-4" />}>
              Buat Laporan
            </GlowButton>
          </Link>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: 'Total Laporan', val: stats.total, color: '#d1fae5' },
            { label: 'Selesai', val: stats.selesai, color: '#34d399' },
            { label: 'Diproses', val: stats.diproses, color: '#22d3ee' },
            { label: 'Menunggu', val: stats.pending, color: '#fbbf24' },
          ].map(({ label, val, color }) => (
            <GlassCard key={label} padding="md">
              <p className="text-2xl font-bold" style={{ color, fontFamily: 'var(--font-poppins)' }}>{val}</p>
              <p className="text-xs text-[#6b8f82] mt-0.5">{label}</p>
            </GlassCard>
          ))}
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <GlassCard padding="md">
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b8f82]" />
                <input
                  type="text"
                  id="history-search"
                  placeholder="Cari judul, kode tiket, atau kategori..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full h-9 rounded-xl border border-[#1a3a2e] bg-[#122a22] pl-9 pr-4 text-sm text-[#d1fae5] placeholder:text-[#6b8f82] focus:border-[#34d399] transition-colors"
                />
              </div>

              {/* Status filters */}
              <div className="flex items-center gap-1.5">
                <Filter className="h-4 w-4 text-[#6b8f82]" />
                <div className="flex gap-1">
                  {statusFilters.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleFilterChange(value)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        statusFilter === value
                          ? 'bg-[#34d399] text-[#080f0d]'
                          : 'bg-[#122a22] text-[#6b8f82] border border-[#1a3a2e] hover:border-[#34d399]/50 hover:text-[#d1fae5]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* List */}
        <AnimatePresence mode="wait">
          {paginated.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GlassCard>
                <EmptyState
                  title="Belum Ada Laporan"
                  description={search || statusFilter !== 'all' ? 'Tidak ada laporan yang sesuai filter.' : 'Belum ada pengaduan yang dikirim. Buat laporan pertama Anda!'}
                  icon={<ClipboardList className="h-9 w-9 text-[#6b8f82]" />}
                  action={
                    <Link href="/pengaduan">
                      <GlowButton icon={<PlusCircle className="h-4 w-4" />}>Buat Pengaduan</GlowButton>
                    </Link>
                  }
                />
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {paginated.map((complaint, i) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ComplaintCard
                    complaint={complaint}
                    onClick={() => setSelected(complaint)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-[#6b8f82]">
              Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laporan
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1a3a2e] text-[#6b8f82] hover:border-[#34d399] hover:text-[#34d399] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                    currentPage === p
                      ? 'bg-[#34d399] text-[#080f0d] font-bold'
                      : 'border border-[#1a3a2e] text-[#6b8f82] hover:border-[#34d399] hover:text-[#34d399]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1a3a2e] text-[#6b8f82] hover:border-[#34d399] hover:text-[#34d399] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatedModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.ticketCode}
        size="lg"
      >
        {selected && (
          <div className="p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-[#d1fae5]">{selected.title}</h3>
              <StatusBadge status={selected.status} />
            </div>
            <p className="text-sm text-[#6b8f82] leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#6b8f82]">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(selected.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b8f82]">
                <MapPin className="h-4 w-4" />
                <span>{selected.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b8f82]">
                <Building2 className="h-4 w-4" />
                <span>{selected.school}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b8f82]">
                <Tag className="h-4 w-4" />
                <span>{selected.category}</span>
              </div>
            </div>
            {selected.response && (
              <div className="rounded-xl border border-[#34d399]/20 bg-[#34d399]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-[#34d399]" />
                  <p className="text-sm font-semibold text-[#34d399]">Balasan Sekolah</p>
                  {selected.responseDate && <span className="text-xs text-[#6b8f82]">• {formatDateTime(selected.responseDate)}</span>}
                </div>
                <p className="text-sm text-[#d1fae5]/90">{selected.response}</p>
              </div>
            )}
          </div>
        )}
      </AnimatedModal>
    </div>
  );
}
