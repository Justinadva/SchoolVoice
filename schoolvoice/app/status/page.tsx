'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import InputField from '@/components/ui/InputField';
import SectionHeader from '@/components/ui/SectionHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { supabase } from '@/lib/supabase';
import { Complaint } from '@/types';
import { formatDate, formatDateTime } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  MessageSquare,
  Search,
  Tag,
  Ticket,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

function TimelineStep({
  label,
  date,
  description,
  completed,
  isLast,
}: {
  label: string;
  date: string;
  description: string;
  completed: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
            completed
              ? 'border-[#34d399] bg-[#34d399]/20 text-[#34d399]'
              : 'border-[#1a3a2e] bg-[#122a22] text-[#6b8f82]'
          }`}
        >
          {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 min-h-8 ${completed ? 'bg-[#34d399]/40' : 'bg-[#1a3a2e]'}`} />
        )}
      </div>
      <div className="pb-6 flex-1">
        <p className={`font-semibold text-sm ${completed ? 'text-[#d1fae5]' : 'text-[#6b8f82]'}`}>{label}</p>
        {date && <p className="text-xs text-[#6b8f82] mt-0.5">{formatDateTime(date)}</p>}
        <p className={`text-sm mt-1 ${completed ? 'text-[#6b8f82]' : 'text-[#6b8f82]/60'}`}>{description}</p>
      </div>
    </div>
  );
}

function ComplaintDetail({ complaint }: { complaint: Complaint }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassCard glow padding="lg">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6 pb-5 border-b border-[#1a3a2e]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm text-[#6b8f82] bg-[#122a22] px-2 py-0.5 rounded border border-[#1a3a2e]">
                {complaint.ticketCode}
              </span>
              {complaint.isAnonymous && (
                <span className="text-xs text-[#6b8f82] border border-[#1a3a2e] px-2 py-0.5 rounded">Anonim</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
              {complaint.title}
            </h2>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6b8f82] uppercase tracking-wider mb-2">Detail Pengaduan</p>
              <p className="text-sm text-[#d1fae5] leading-relaxed">{complaint.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: 'Tanggal', value: formatDate(complaint.date) },
                { icon: Tag, label: 'Kategori', value: complaint.category },
                { icon: MapPin, label: 'Lokasi', value: complaint.location },
                { icon: Building2, label: 'Sekolah', value: complaint.school },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-[#122a22] p-3">
                  <div className="flex items-center gap-1.5 text-[#6b8f82] mb-1">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </div>
                  <p className="text-sm text-[#d1fae5] truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* School response */}
            {complaint.response && (
              <div className="rounded-xl border border-[#34d399]/20 bg-[#34d399]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-[#34d399]" />
                  <p className="text-sm font-semibold text-[#34d399]">Balasan Sekolah</p>
                  {complaint.responseDate && (
                    <span className="text-xs text-[#6b8f82]">• {formatDateTime(complaint.responseDate)}</span>
                  )}
                </div>
                <p className="text-sm text-[#d1fae5]/90">{complaint.response}</p>
              </div>
            )}

            {complaint.status === 'ditolak' && !complaint.response && (
              <div className="rounded-xl border border-[#fb7185]/20 bg-[#fb7185]/5 p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-[#fb7185]" />
                  <p className="text-sm text-[#fb7185]">Laporan ini ditolak oleh pihak sekolah.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — Timeline */}
          <div>
            <p className="text-xs font-medium text-[#6b8f82] uppercase tracking-wider mb-4">Timeline Progress</p>
            {Array.isArray(complaint.timeline) && complaint.timeline.length > 0 ? (
              complaint.timeline.map((step: any, i: number) => (
                <TimelineStep
                  key={i}
                  label={step.label}
                  date={step.date ?? ''}
                  description={step.description}
                  completed={step.completed}
                  isLast={i === complaint.timeline.length - 1}
                />
              ))
            ) : (
              <p className="text-sm text-[#6b8f82]">Belum ada timeline tersedia.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-[#1a3a2e] flex items-center gap-2 text-xs text-[#6b8f82]">
          <Clock className="h-3.5 w-3.5" />
          <span>Dikirim: {formatDateTime(complaint.createdAt)}</span>
          {complaint.updatedAt !== complaint.createdAt && (
            <span>• Diperbarui: {formatDateTime(complaint.updatedAt)}</span>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/** Map Supabase snake_case → Complaint camelCase */
function mapRow(item: any): Complaint {
  return {
    id: item.id,
    ticketCode: item.ticket_code,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    school: item.school,
    category: item.category,
    status: item.status,
    isAnonymous: item.is_anonymous,
    response: item.response,
    responseDate: item.response_date,
    userId: item.user_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    timeline: item.timeline ?? [],
  };
}

export default function StatusPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = ticketCode.trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setSearched(false);
    setResult(null);
    setNotFound(false);

    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .ilike('ticket_code', code)
      .single();

    if (error || !data) {
      setResult(null);
      setNotFound(true);
    } else {
      setResult(mapRow(data));
    }

    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Tracking Laporan"
          title="Cek Status Pengaduan"
          subtitle="Masukkan kode tiket yang Anda terima saat mengirim laporan untuk melihat perkembangannya."
        />

        {/* Search form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <GlassCard padding="lg">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <InputField
                  id="ticket-code-input"
                  type="text"
                  placeholder="Contoh: SV-2026-1234"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
                  icon={<Ticket className="h-4 w-4" />}
                />
              </div>
              <GlowButton type="submit" size="lg" loading={loading} icon={<Search className="h-4 w-4" />}>
                Cari Status
              </GlowButton>
            </form>
            <p className="mt-3 text-xs text-[#6b8f82]">
              Masukkan kode tiket yang Anda terima setelah mengirim laporan, contoh: <span className="font-mono text-[#34d399]">SV-2026-1234</span>
            </p>
          </GlassCard>
        </motion.div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {searched && (
            <div className="mt-6">
              {result ? (
                <ComplaintDetail complaint={result} />
              ) : notFound ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <GlassCard padding="xl">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-2xl border border-[#fb7185]/20 bg-[#fb7185]/10 flex items-center justify-center mb-4">
                        <XCircle className="h-8 w-8 text-[#fb7185]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#d1fae5] mb-2">Laporan Tidak Ditemukan</h3>
                      <p className="text-sm text-[#6b8f82] max-w-sm">
                        Kode tiket <span className="font-mono text-[#d1fae5]">&quot;{ticketCode}&quot;</span> tidak ditemukan.
                        Pastikan kode yang dimasukkan sudah benar.
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : null}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
