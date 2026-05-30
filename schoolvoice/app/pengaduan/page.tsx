'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import InputField from '@/components/ui/InputField';
import SectionHeader from '@/components/ui/SectionHeader';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import { ComplaintCategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  FileText,
  MapPin,
  Paperclip,
  Send,
  Tag,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SCHOOL_NAME = 'SMA N 1 Gringsing';

const categories: { value: ComplaintCategory; label: string; color: string }[] = [
  { value: 'Bullying', label: 'Bullying', color: '#fb7185' },
  { value: 'Fasilitas Sekolah', label: 'Fasilitas Sekolah', color: '#22d3ee' },
  { value: 'Kekerasan', label: 'Kekerasan', color: '#f87171' },
  { value: 'Kebersihan', label: 'Kebersihan', color: '#a3e635' },
  { value: 'Pelayanan Guru', label: 'Pelayanan Guru', color: '#c084fc' },
  { value: 'Administrasi', label: 'Administrasi', color: '#fbbf24' },
  { value: 'Lainnya', label: 'Lainnya', color: '#6b8f82' },
];

type FormErrors = Partial<Record<string, string>>;

function generateTicketCode() {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `SV-${year}-${rand}`;
}

export default function PengaduanPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '' as ComplaintCategory | '',
    isAnonymous: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.title.trim()) errs.title = 'Judul laporan wajib diisi';
    if (!form.description.trim()) errs.description = 'Isi pengaduan wajib diisi';
    else if (form.description.trim().length < 30) errs.description = 'Deskripsi minimal 30 karakter';
    if (!form.date) errs.date = 'Tanggal kejadian wajib diisi';
    if (!form.location.trim()) errs.location = 'Lokasi kejadian wajib diisi';
    if (!form.category) errs.category = 'Pilih kategori pengaduan';
    return errs;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (files.length + selected.length > 5) {
      addToast({ type: 'warning', title: 'Batas Lampiran', message: 'Maksimal 5 file lampiran.' });
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      addToast({ type: 'error', title: 'Form Tidak Lengkap', message: 'Periksa kembali isian form.' });
      return;
    }
    setErrors({});
    setLoading(true);

    const ticketCode = generateTicketCode();
    const now = new Date().toISOString();
    const timeline = [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: now,
        description: 'Laporan Anda telah berhasil dikirim dan menunggu verifikasi.',
        completed: true,
      },
      {
        status: 'diproses',
        label: 'Sedang Diproses',
        date: '',
        description: 'Laporan sedang ditangani pihak sekolah.',
        completed: false,
      },
      {
        status: 'selesai',
        label: 'Selesai',
        date: '',
        description: 'Laporan telah diselesaikan.',
        completed: false,
      },
    ];

    const { error: sbError } = await supabase.from('complaints').insert([
      {
        ticket_code: ticketCode,
        title: form.title,
        description: form.description,
        date: form.date,
        location: form.location,
        school: SCHOOL_NAME,
        category: form.category,
        status: 'Menunggu',
        is_anonymous: form.isAnonymous,
        timeline,
      },
    ]);

    setLoading(false);

    if (sbError) {
      console.error('Insert error:', sbError);
      addToast({ type: 'error', title: 'Gagal Mengirim', message: 'Terjadi kesalahan. Coba lagi nanti.' });
      return;
    }

    setSuccessTicket(ticketCode);
    addToast({ type: 'success', title: 'Laporan Terkirim!', message: `Kode tiket: ${ticketCode}` });
  };

  const copyTicket = async () => {
    if (!successTicket) return;
    await navigator.clipboard.writeText(successTicket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── SUCCESS STATE ──────────────────────────────────────────────────────
  if (successTicket) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <GlassCard glow padding="xl" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#34d399]/20 border-2 border-[#34d399]/40"
            >
              <CheckCircle2 className="h-10 w-10 text-[#34d399]" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#d1fae5] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
              Laporan Terkirim!
            </h2>
            <p className="text-[#6b8f82] mb-6">
              Laporan Anda telah berhasil dikirim dan sedang menunggu verifikasi dari pihak sekolah.
            </p>
            <div className="bg-[#122a22] rounded-xl p-4 mb-6 border border-[#34d399]/20">
              <p className="text-xs text-[#6b8f82] mb-1">Kode Tiket Pengaduan</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-xl font-mono font-bold text-[#34d399]">{successTicket}</p>
                <button onClick={copyTicket} className="text-[#6b8f82] hover:text-[#34d399] transition-colors" aria-label="Salin kode tiket">
                  {copied ? <CheckCircle2 className="h-4 w-4 text-[#34d399]" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-[#6b8f82] mt-2">Simpan kode ini untuk melacak status laporan Anda</p>
            </div>
            <div className="flex gap-3">
              <GlowButton variant="outline" fullWidth onClick={() => router.push('/status')}>
                Cek Status
              </GlowButton>
              <GlowButton
                fullWidth
                onClick={() => {
                  setSuccessTicket(null);
                  setForm({ title: '', description: '', date: '', location: '', category: '', isAnonymous: false });
                  setFiles([]);
                }}
              >
                Laporan Baru
              </GlowButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // ── FORM ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          label="Pengaduan Online — SMA N 1 Gringsing"
          title="Sampaikan Laporan Anda"
          subtitle="Isi formulir di bawah dengan lengkap dan jelas. Laporan akan diteruskan ke pihak sekolah yang bersangkutan."
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-8">
          <GlassCard glow padding="xl">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                {/* Sekolah (fixed) */}
                <div className="flex items-center gap-2 rounded-xl border border-[#1a3a2e] bg-[#122a22]/50 px-4 py-3 text-sm text-[#d1fae5]">
                  <Building2 className="h-4 w-4 text-[#34d399] shrink-0" />
                  <span className="font-medium">{SCHOOL_NAME}</span>
                  <span className="ml-auto text-xs text-[#6b8f82] border border-[#1a3a2e] px-1.5 py-0.5 rounded">SMA</span>
                </div>

                {/* Judul */}
                <InputField
                  id="complaint-title"
                  label="Judul Laporan"
                  type="text"
                  placeholder="Ketik judul laporan yang singkat dan jelas"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  error={errors.title}
                  icon={<FileText className="h-4 w-4" />}
                />

                {/* Deskripsi */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="complaint-desc" className="text-sm font-medium text-[#d1fae5]">
                    Isi Pengaduan
                  </label>
                  <textarea
                    id="complaint-desc"
                    rows={5}
                    placeholder="Ketik isi laporan secara detail — siapa, apa, kapan, di mana, dan bagaimana kejadiannya."
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm bg-[#0d1a16] text-[#d1fae5] placeholder:text-[#6b8f82] resize-none transition-all duration-200 hover:border-[#2a5a46] focus:border-[#34d399] focus:outline-none ${errors.description ? 'border-[#fb7185]' : 'border-[#1a3a2e]'}`}
                  />
                  <div className="flex items-center justify-between">
                    {errors.description ? (
                      <p className="text-xs text-[#fb7185] flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.description}
                      </p>
                    ) : <span />}
                    <span className={`text-xs ${form.description.length < 30 ? 'text-[#fb7185]' : 'text-[#6b8f82]'}`}>
                      {form.description.length}/30 min
                    </span>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField
                    id="complaint-date"
                    label="Tanggal Kejadian"
                    type="date"
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    error={errors.date}
                    icon={<Calendar className="h-4 w-4" />}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <InputField
                    id="complaint-location"
                    label="Lokasi Kejadian"
                    type="text"
                    placeholder="Contoh: Kelas 10-A, Kantin..."
                    value={form.location}
                    onChange={(e) => set('location', e.target.value)}
                    error={errors.location}
                    icon={<MapPin className="h-4 w-4" />}
                  />
                </div>

                {/* Category dropdown */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-sm font-medium text-[#d1fae5]">Pilih Kategori Pengaduan</label>
                  <button
                    type="button"
                    id="category-select-btn"
                    onClick={() => setShowCategories((v) => !v)}
                    className={`flex items-center justify-between w-full h-11 rounded-xl border px-4 text-sm transition-all duration-200 hover:border-[#2a5a46] ${form.category ? 'text-[#d1fae5]' : 'text-[#6b8f82]'} bg-[#0d1a16] ${errors.category ? 'border-[#fb7185]' : 'border-[#1a3a2e]'} ${showCategories ? 'border-[#34d399]' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#6b8f82]" />
                      {form.category || 'Pilih Kategori Laporan Anda'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#6b8f82] transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showCategories && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute top-full mt-1 left-0 right-0 z-30 rounded-xl border border-[#1a3a2e] bg-[#0d1a16] shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                      >
                        <div className="grid grid-cols-2">
                          {categories.map(({ value, label, color }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => { set('category', value); setShowCategories(false); }}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#d1fae5] hover:bg-[#122a22] transition-colors text-left"
                            >
                              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: color }} />
                              {label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.category && (
                    <p className="text-xs text-[#fb7185] flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.category}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#d1fae5]">
                    Upload Bukti <span className="text-[#6b8f82]">(opsional, maks. 5 file)</span>
                  </label>
                  <label
                    htmlFor="complaint-files"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#1a3a2e] bg-[#122a22]/50 p-6 text-center hover:border-[#34d399]/50 hover:bg-[#122a22] transition-all"
                  >
                    <Paperclip className="h-6 w-6 text-[#6b8f82]" />
                    <span className="text-sm text-[#6b8f82]">Klik untuk unggah gambar atau PDF</span>
                    <span className="text-xs text-[#6b8f82]/70">PNG, JPG, PDF (maks 10MB per file)</span>
                    <input id="complaint-files" type="file" multiple accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg border border-[#1a3a2e] bg-[#122a22] px-3 py-1.5 text-xs text-[#d1fae5]">
                          <Paperclip className="h-3 w-3 text-[#6b8f82]" />
                          <span className="max-w-32 truncate">{file.name}</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-[#6b8f82] hover:text-[#fb7185]">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Anonymous toggle */}
                <div className="flex items-center justify-between rounded-xl border border-[#1a3a2e] bg-[#122a22]/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#34d399]/10 border border-[#34d399]/20">
                      {form.isAnonymous ? <EyeOff className="h-4 w-4 text-[#34d399]" /> : <Eye className="h-4 w-4 text-[#6b8f82]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#d1fae5]">Kirim sebagai Anonim</p>
                      <p className="text-xs text-[#6b8f82]">Identitas Anda tidak akan ditampilkan</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="anonymous-toggle"
                    onClick={() => set('isAnonymous', !form.isAnonymous)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isAnonymous ? 'bg-[#34d399]' : 'bg-[#1a3a2e]'}`}
                    aria-checked={form.isAnonymous}
                    role="switch"
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transform transition-transform ${form.isAnonymous ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Submit */}
                <GlowButton type="submit" fullWidth size="xl" loading={loading} icon={<Send className="h-5 w-5" />} iconPosition="right" className="mt-2">
                  Kirim Pengaduan ke Supabase
                </GlowButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}