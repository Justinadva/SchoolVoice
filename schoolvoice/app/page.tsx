'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeader from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Eye,
  Lock,
  MessageSquare,
  School,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: 'Pengaduan Cepat',
    description: 'Kirim laporan dalam hitungan menit. Formulir simpel dan mudah dipahami oleh semua kalangan.',
    color: '#fbbf24',
  },
  {
    icon: Lock,
    title: 'Privasi Terjamin',
    description: 'Opsi laporan anonim tersedia. Identitas Anda sepenuhnya dilindungi dan dijaga kerahasiaannya.',
    color: '#34d399',
  },
  {
    icon: Eye,
    title: 'Tracking Status',
    description: 'Pantau perkembangan laporan Anda secara real-time menggunakan kode tiket unik.',
    color: '#22d3ee',
  },
  {
    icon: MessageSquare,
    title: 'Respon Transparan',
    description: 'Dapatkan balasan resmi dari pihak sekolah langsung di platform, tersimpan dan terdokumentasi.',
    color: '#c084fc',
  },
];

const stats = [
  { label: 'Laporan Masuk', value: '2,340+', icon: ClipboardList },
  { label: 'Terselesaikan', value: '89%', icon: CheckCircle2 },
  { label: 'Kepuasan Siswa', value: '4.8★', icon: Star },
  { label: 'Respon Cepat', value: '<48 jam', icon: TrendingUp },
];

const floatingCards = [
  { status: 'Selesai', title: 'Perbaikan Toilet Lantai 2', time: '2 jam lalu', color: '#34d399' },
  { status: 'Diproses', title: 'Kasus Bullying Kelas 10-A', time: '5 jam lalu', color: '#22d3ee' },
  { status: 'Menunggu', title: 'Fasilitas Lab Rusak', time: '1 hari lalu', color: '#fbbf24' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="show">

            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-4 py-1.5 text-sm text-[#34d399] font-medium mb-6">
                <span className="h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
                Platform Pengaduan Resmi — SMA N 1 Gringsing
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d1fae5] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Sampaikan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#22d3ee]">
                Aspirasi
              </span>{' '}
              Anda ke Sekolah Secara{' '}
              <span className="text-[#34d399]">Aman &amp; Mudah</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-[#6b8f82] mb-8 leading-relaxed max-w-xl">
              Sistem pengaduan online untuk siswa, orang tua, dan masyarakat SMA N 1 Gringsing. Laporkan
              masalah, sampaikan saran, dan pantau perkembangan secara transparan.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/pengaduan">
                <GlowButton size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Buat Pengaduan
                </GlowButton>
              </Link>
              <Link href="/status">
                <GlowButton size="lg" variant="outline">
                  Cek Status Laporan
                </GlowButton>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-8">
              {['100% Aman', 'Anonim Tersedia', 'Respon Cepat'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-sm text-[#6b8f82]">
                  <CheckCircle2 className="h-4 w-4 text-[#34d399]" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Floating Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <GlassCard glow padding="lg" className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#34d399] to-[#059669]">
                    <School className="h-5 w-5 text-[#080f0d]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
                      SMA N 1 Gringsing
                    </p>
                    <p className="text-xs text-[#6b8f82]">Dashboard Pengaduan Real-time</p>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Total', val: '24', color: '#d1fae5' },
                    { label: 'Proses', val: '8', color: '#22d3ee' },
                    { label: 'Selesai', val: '14', color: '#34d399' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-[#122a22] p-3 text-center">
                      <p className="text-xl font-bold" style={{ color: s.color }}>{s.val}</p>
                      <p className="text-xs text-[#6b8f82]">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent complaints */}
                <div className="space-y-2">
                  {floatingCards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center justify-between rounded-lg bg-[#122a22] px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ background: card.color }} />
                        <p className="text-sm text-[#d1fae5] truncate">{card.title}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{ color: card.color, borderColor: `${card.color}40`, background: `${card.color}15` }}
                        >
                          {card.status}
                        </span>
                        <span className="text-xs text-[#6b8f82]">{card.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Floating stat card top-right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 z-20"
              >
                <div className="rounded-xl border border-[#34d399]/30 bg-[#0d1a16]/90 backdrop-blur px-4 py-3 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#34d399]" />
                    <span className="text-sm font-semibold text-[#34d399]">+12%</span>
                  </div>
                  <p className="text-xs text-[#6b8f82]">Laporan diselesaikan</p>
                </div>
              </motion.div>

              {/* Floating badge bottom-left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-8 z-20"
              >
                <div className="rounded-xl border border-[#22d3ee]/30 bg-[#0d1a16]/90 backdrop-blur px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#22d3ee]" />
                    <span className="text-sm font-semibold text-[#22d3ee]">Respon cepat</span>
                  </div>
                  <p className="text-xs text-[#6b8f82]">Rata-rata &lt; 48 jam</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-10 border-y border-[#1a3a2e] bg-[#0d1a16]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <motion.div key={label} variants={itemVariants} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#34d399]/10 border border-[#34d399]/20 shrink-0">
                  <Icon className="h-5 w-5 text-[#34d399]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>{value}</p>
                  <p className="text-sm text-[#6b8f82]">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <SectionHeader
          label="Kenapa SchoolVoice?"
          title="Fitur Unggulan Platform Kami"
          subtitle="Dirancang khusus untuk ekosistem sekolah modern dengan teknologi terkini dan UX yang intuitif."
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ icon: Icon, title, description, color }) => (
            <motion.div key={title} variants={itemVariants}>
              <GlassCard hover glow className="h-full flex flex-col">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <h3 className="text-base font-semibold text-[#d1fae5] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {title}
                </h3>
                <p className="text-sm text-[#6b8f82] leading-relaxed flex-1">{description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-[#34d399]/20 bg-gradient-to-br from-[#0d1a16] via-[#122a22] to-[#0d1a16] p-10 text-center shadow-[0_0_60px_rgba(52,211,153,0.1)]"
          >
            {/* Decorative lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-[#34d399] to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-[#34d399] to-transparent" />

            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-[#34d399]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Siap Menyampaikan Laporan?
              </h2>
            </div>
            <p className="text-[#6b8f82] mb-8 max-w-xl mx-auto">
              Bergabunglah dengan warga SMA N 1 Gringsing yang sudah menggunakan SchoolVoice
              untuk menciptakan lingkungan sekolah yang lebih baik dan transparan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <GlowButton size="lg">Daftar Gratis Sekarang</GlowButton>
              </Link>
              <Link href="/pengaduan">
                <GlowButton size="lg" variant="outline">
                  Buat Pengaduan Tanpa Akun
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
