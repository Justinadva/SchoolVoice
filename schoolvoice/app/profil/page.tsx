'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import InputField from '@/components/ui/InputField';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';
import {
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  Edit3,
  LogIn,
  Mail,
  Phone,
  Save,
  Shield,
  User,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const roles: UserRole[] = ['Siswa', 'Orang Tua', 'Masyarakat Umum'];

interface Stats {
  total: number;
  selesai: number;
  diproses: number;
  pending: number;
  ditolak: number;
}

export default function ProfilPage() {
  const { user, isLoggedIn, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Siswa' as UserRole });
  const [stats, setStats] = useState<Stats>({ total: 0, selesai: 0, diproses: 0, pending: 0, ditolak: 0 });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    }
  }, [user]);

  // Load user-specific stats from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('complaints')
        .select('status')
        .order('created_at', { ascending: false });

      if (data) {
        setStats({
          total: data.length,
          selesai: data.filter((c: any) => c.status === 'selesai').length,
          diproses: data.filter((c: any) => c.status === 'diproses').length,
          pending: data.filter((c: any) => c.status === 'pending' || c.status === 'Menunggu').length,
          ditolak: data.filter((c: any) => c.status === 'ditolak').length,
        });
      }
    };
    fetchStats();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateProfile(form);
    setEditing(false);
    setSaving(false);
    addToast({ type: 'success', title: 'Profil Diperbarui', message: 'Data profil berhasil disimpan.' });
  };

  const handleCancel = () => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    setEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
        <GlassCard glow padding="xl" className="max-w-sm w-full text-center">
          <div className="flex h-20 w-20 mx-auto mb-5 items-center justify-center rounded-2xl border border-[#34d399]/20 bg-[#34d399]/10">
            <User className="h-10 w-10 text-[#34d399]" />
          </div>
          <h2 className="text-xl font-bold text-[#d1fae5] mb-2">Silakan Masuk Terlebih Dahulu</h2>
          <p className="text-sm text-[#6b8f82] mb-6">Anda harus login untuk mengakses halaman profil.</p>
          <Link href="/login">
            <GlowButton fullWidth size="lg" icon={<LogIn className="h-4 w-4" />}>
              Masuk Sekarang
            </GlowButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Akun Saya"
          title="Profil Pengguna"
          subtitle="Kelola informasi akun dan lihat statistik laporan Anda."
        />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Left - Avatar & Stats */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard glow padding="lg" className="text-center">
                <div className="relative inline-block mb-4">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] text-[#080f0d] text-3xl font-bold shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#0d1a16] border border-[#34d399]/30 text-[#34d399] hover:bg-[#34d399]/10 transition-colors"
                    aria-label="Ubah foto profil"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {user?.name}
                </h2>
                <p className="text-sm text-[#6b8f82]">{user?.email}</p>
                <span className="mt-2 inline-block text-xs bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20 px-3 py-1 rounded-full">
                  {user?.role}
                </span>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard padding="md">
                <p className="text-xs font-semibold text-[#6b8f82] uppercase tracking-wider mb-3">Statistik Laporan</p>
                <div className="space-y-2">
                  {[
                    { label: 'Total Laporan', val: stats.total, icon: ClipboardList, color: '#d1fae5' },
                    { label: 'Selesai', val: stats.selesai, icon: CheckCircle2, color: '#34d399' },
                    { label: 'Diproses', val: stats.diproses, icon: Clock, color: '#22d3ee' },
                    { label: 'Menunggu', val: stats.pending, icon: Clock, color: '#fbbf24' },
                    { label: 'Ditolak', val: stats.ditolak, icon: XCircle, color: '#fb7185' },
                  ].map(({ label, val, icon: Icon, color }) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-[#122a22] px-3 py-2">
                      <div className="flex items-center gap-2 text-sm text-[#6b8f82]">
                        <Icon className="h-4 w-4" style={{ color }} />
                        {label}
                      </div>
                      <span className="text-sm font-bold" style={{ color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right - Edit form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard glow padding="xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#34d399]" />
                    <h3 className="text-base font-semibold text-[#d1fae5]">Informasi Akun</h3>
                  </div>
                  {!editing ? (
                    <GlowButton variant="secondary" size="sm" icon={<Edit3 className="h-4 w-4" />} onClick={() => setEditing(true)}>
                      Edit Profil
                    </GlowButton>
                  ) : (
                    <div className="flex gap-2">
                      <GlowButton variant="ghost" size="sm" onClick={handleCancel}>Batal</GlowButton>
                      <GlowButton size="sm" icon={<Save className="h-4 w-4" />} loading={saving} onClick={handleSave}>Simpan</GlowButton>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <InputField
                    id="profile-name"
                    label="Nama Lengkap"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    disabled={!editing}
                    icon={<User className="h-4 w-4" />}
                    className={!editing ? 'opacity-70' : ''}
                  />
                  <InputField
                    id="profile-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    disabled={!editing}
                    icon={<Mail className="h-4 w-4" />}
                    className={!editing ? 'opacity-70' : ''}
                  />
                  <InputField
                    id="profile-phone"
                    label="Nomor HP"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    disabled={!editing}
                    icon={<Phone className="h-4 w-4" />}
                    className={!editing ? 'opacity-70' : ''}
                  />

                  {/* Role selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#d1fae5]">Peran / Role</label>
                    <div className="flex gap-2">
                      {roles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          disabled={!editing}
                          onClick={() => editing && setForm((p) => ({ ...p, role }))}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                            form.role === role
                              ? 'bg-[#34d399] text-[#080f0d] border-[#34d399]'
                              : 'bg-transparent text-[#6b8f82] border-[#1a3a2e]'
                          } ${!editing ? 'cursor-default opacity-70' : 'hover:border-[#34d399]/50 cursor-pointer'}`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account info read-only */}
                  <div className="rounded-xl bg-[#122a22] border border-[#1a3a2e] p-4 mt-2">
                    <p className="text-xs font-medium text-[#6b8f82] uppercase tracking-wider mb-3">Informasi Akun</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6b8f82]">ID Pengguna</span>
                        <span className="font-mono text-xs text-[#d1fae5]">{user?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b8f82]">Bergabung</span>
                        <span className="text-[#d1fae5]">
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
                            : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b8f82]">Status Akun</span>
                        <span className="flex items-center gap-1 text-[#34d399]">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
