'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import InputField from '@/components/ui/InputField';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = 'Email tidak boleh kosong';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Format email tidak valid';
    if (!password) errs.password = 'Password tidak boleh kosong';
    else if (password.length < 6) errs.password = 'Password minimal 6 karakter';
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
      const success = await login(email, password);
      if (success) {
        addToast({ type: 'success', title: 'Berhasil Masuk!', message: `Selamat datang kembali!` });
        router.push('/');
      } else {
        addToast({ type: 'error', title: 'Login Gagal', message: 'Email atau password salah.' });
        setErrors({ email: 'Email atau password tidak sesuai' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('ahmad.fauzi@email.com');
    setPassword('demo123');
    setLoading(true);
    try {
      await login('ahmad.fauzi@email.com', 'demo123');
      addToast({ type: 'success', title: 'Demo Login!', message: 'Masuk dengan akun demo.' });
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_30px_rgba(52,211,153,0.4)] mb-4">
            <Shield className="h-8 w-8 text-[#080f0d]" />
          </div>
          <h1 className="text-2xl font-bold text-[#d1fae5]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Masuk ke SchoolVoice
          </h1>
          <p className="text-sm text-[#6b8f82] mt-1">Akses platform pengaduan sekolah Anda</p>
        </div>

        <GlassCard glow padding="xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <InputField
                id="login-email"
                label="Email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                error={errors.email}
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
              />
              <InputField
                id="login-password"
                label="Password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                error={errors.password}
                hint="Minimal 8 karakter & berisi alfanumerik"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="current-password"
              />

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => setRemember((v) => !v)}
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${remember ? 'bg-[#34d399] border-[#34d399]' : 'border-[#1a3a2e] group-hover:border-[#34d399]/50'}`}
                  >
                    {remember && <span className="text-[#080f0d] text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-sm text-[#6b8f82]">Ingat saya</span>
                </label>
                <Link href="#" className="text-sm text-[#34d399] hover:text-[#10b981] transition-colors">
                  Lupa password?
                </Link>
              </div>

              <GlowButton type="submit" fullWidth size="lg" loading={loading}>
                Masuk
              </GlowButton>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1a3a2e]" />
            <span className="text-xs text-[#6b8f82]">atau</span>
            <div className="flex-1 h-px bg-[#1a3a2e]" />
          </div>

          {/* Social / Demo login */}
          <div className="space-y-3">
            <GlowButton
              variant="secondary"
              fullWidth
              size="lg"
              onClick={handleDemoLogin}
              loading={loading}
              icon={
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-700">G</div>
              }
            >
              Login dengan Google
            </GlowButton>

            <GlowButton
              variant="ghost"
              fullWidth
              size="md"
              onClick={handleDemoLogin}
              className="text-[#34d399] hover:bg-[#34d399]/10 border border-[#34d399]/20"
            >
              🚀 Demo Login (Akun Percobaan)
            </GlowButton>
          </div>

          <p className="mt-5 text-center text-sm text-[#6b8f82]">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#34d399] font-medium hover:text-[#10b981] transition-colors">
              buat akun
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
