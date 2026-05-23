'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import InputField from '@/components/ui/InputField';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';
import { Lock, Mail, Phone, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const roles: UserRole[] = ['Siswa', 'Orang Tua', 'Masyarakat Umum'];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Siswa' as UserRole,
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = 'Nama lengkap wajib diisi';
    if (!form.email) errs.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid';
    if (!form.phone) errs.phone = 'Nomor HP wajib diisi';
    else if (!/^[0-9]{10,13}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Nomor HP tidak valid';
    if (!form.password) errs.password = 'Password wajib diisi';
    else if (form.password.length < 8) errs.password = 'Password minimal 8 karakter';
    if (!form.confirmPassword) errs.confirmPassword = 'Konfirmasi password wajib diisi';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Password tidak cocok';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const success = await register({ name: form.name, email: form.email, phone: form.phone, role: form.role, password: form.password });
      if (success) {
        addToast({ type: 'success', title: 'Registrasi Berhasil!', message: 'Akun Anda telah dibuat. Selamat datang!' });
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_30px_rgba(52,211,153,0.4)] mb-4">
            <Shield className="h-8 w-8 text-[#080f0d]" />
          </div>
          <h1 className="text-2xl font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Daftar Akun SchoolVoice
          </h1>
          <p className="text-sm text-[#6b8f82] mt-1">Buat akun dan mulai sampaikan laporan Anda</p>
        </div>

        <GlassCard glow padding="xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <InputField
                id="reg-name"
                label="Nama Lengkap"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                error={errors.name}
                icon={<User className="h-4 w-4" />}
                autoComplete="name"
              />
              <InputField
                id="reg-email"
                label="Email"
                type="email"
                placeholder="Masukkan email Anda"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                error={errors.email}
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
              />
              <InputField
                id="reg-phone"
                label="Nomor HP"
                type="tel"
                placeholder="Contoh: 081234567890"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                error={errors.phone}
                icon={<Phone className="h-4 w-4" />}
                autoComplete="tel"
              />

              {/* Role selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#d1fae5]">Peran / Role</label>
                <div className="flex gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => set('role', role)}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                        form.role === role
                          ? 'bg-[#34d399] text-[#080f0d] border-[#34d399]'
                          : 'bg-transparent text-[#6b8f82] border-[#1a3a2e] hover:border-[#34d399]/50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <InputField
                id="reg-password"
                label="Password"
                type="password"
                placeholder="Min. 8 karakter"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                error={errors.password}
                hint="Minimal 8 karakter & berisi alfanumerik"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
              />
              <InputField
                id="reg-confirm-password"
                label="Konfirmasi Password"
                type="password"
                placeholder="Ulangi password Anda"
                value={form.confirmPassword}
                onChange={(e) => set('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
              />

              {/* Password match indicator */}
              {form.password && form.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`text-xs flex items-center gap-1.5 ${form.password === form.confirmPassword ? 'text-[#34d399]' : 'text-[#fb7185]'}`}
                >
                  <span>{form.password === form.confirmPassword ? '✓' : '✗'}</span>
                  {form.password === form.confirmPassword ? 'Password cocok' : 'Password tidak cocok'}
                </motion.div>
              )}

              <GlowButton type="submit" fullWidth size="lg" loading={loading} className="mt-2">
                Daftar Sekarang
              </GlowButton>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-[#6b8f82]">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#34d399] font-medium hover:text-[#10b981] transition-colors">
              masuk
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
