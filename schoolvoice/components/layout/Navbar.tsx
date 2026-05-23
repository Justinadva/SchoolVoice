'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Moon,
  PlusCircle,
  Search,
  Settings,
  Shield,
  Sun,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/pengaduan', label: 'Buat Pengaduan', icon: PlusCircle },
  { href: '/status', label: 'Status Laporan', icon: Search },
  { href: '/pengumuman', label: 'Pengumuman', icon: BookOpen },
  { href: '/riwayat', label: 'Riwayat', icon: ClipboardList },
  { href: '/profil', label: 'Profil', icon: User },
];

const notifications = [
  {
    id: 'n1',
    title: 'Laporan SV-2024-001 diproses',
    desc: 'Pihak sekolah sedang menangani laporan Anda',
    time: '2 jam lalu',
    read: false,
  },
  {
    id: 'n2',
    title: 'Laporan SV-2024-002 selesai',
    desc: 'Toilet lantai 2 telah diperbaiki',
    time: '1 hari lalu',
    read: true,
  },
  {
    id: 'n3',
    title: 'Pengumuman baru dari sekolah',
    desc: 'Jadwal UAS telah diumumkan',
    time: '2 hari lalu',
    read: true,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    addToast({ type: 'info', title: 'Berhasil Keluar', message: 'Sampai jumpa kembali!' });
    router.push('/');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b border-[#1a3a2e] bg-[#0d1a16]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_16px_rgba(52,211,153,0.4)] group-hover:shadow-[0_0_24px_rgba(52,211,153,0.6)] transition-all">
              <Shield className="h-5 w-5 text-[#080f0d]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#34d399] leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>
                SchoolVoice
              </p>
              <p className="text-[10px] text-[#6b8f82] leading-none mt-0.5">School Complaint Center</p>
            </div>
          </Link>

          {/* Nav Links - horizontal scrollable */}
          <nav className="flex-1 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-1 min-w-max px-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                        isActive
                          ? 'text-[#34d399] bg-[#34d399]/10'
                          : 'text-[#6b8f82] hover:text-[#d1fae5] hover:bg-[#122a22]'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full bg-[#34d399]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <motion.button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6b8f82] hover:text-[#34d399] hover:bg-[#122a22] transition-colors"
              aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    id="notification-btn"
                    onClick={() => { setShowNotif((v) => !v); setShowUserMenu(false); }}
                    className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#6b8f82] hover:text-[#34d399] hover:bg-[#122a22] transition-colors"
                    aria-label="Notifikasi"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotif && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-[#1a3a2e] bg-[#0d1a16] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a3a2e]">
                            <h3 className="text-sm font-semibold text-[#d1fae5]">Notifikasi</h3>
                            {unreadCount > 0 && (
                              <span className="text-xs bg-[#34d399]/10 text-[#34d399] px-2 py-0.5 rounded-full border border-[#34d399]/20">
                                {unreadCount} baru
                              </span>
                            )}
                          </div>
                          <div className="divide-y divide-[#1a3a2e]">
                            {notifications.map((n) => (
                              <div
                                key={n.id}
                                className={cn(
                                  'px-4 py-3 text-sm hover:bg-[#122a22] transition-colors cursor-pointer',
                                  !n.read && 'bg-[#34d399]/5'
                                )}
                              >
                                <div className="flex items-start gap-2">
                                  {!n.read && (
                                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#34d399]" />
                                  )}
                                  <div className={cn(!n.read ? '' : 'ml-4')}>
                                    <p className="font-medium text-[#d1fae5]">{n.title}</p>
                                    <p className="text-xs text-[#6b8f82] mt-0.5">{n.desc}</p>
                                    <p className="text-xs text-[#6b8f82]/70 mt-1">{n.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    id="user-menu-btn"
                    onClick={() => { setShowUserMenu((v) => !v); setShowNotif(false); }}
                    className="flex items-center gap-2 rounded-xl border border-[#1a3a2e] bg-[#122a22] px-3 py-1.5 text-sm text-[#d1fae5] hover:border-[#34d399]/50 hover:bg-[#1a3a2e] transition-all"
                    aria-label="Menu pengguna"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34d399] text-[#080f0d] font-bold text-xs">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-24 truncate">{user?.name}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#6b8f82]" />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-[#1a3a2e] bg-[#0d1a16] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-[#1a3a2e]">
                            <p className="text-sm font-semibold text-[#d1fae5]">{user?.name}</p>
                            <p className="text-xs text-[#6b8f82]">{user?.email}</p>
                            <span className="mt-1 inline-block text-xs bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20 px-2 py-0.5 rounded-full">
                              {user?.role}
                            </span>
                          </div>
                          <div className="py-1">
                            <Link
                              href="/profil"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#d1fae5] hover:bg-[#122a22] hover:text-[#34d399] transition-colors"
                            >
                              <User className="h-4 w-4" />
                              Profil Saya
                            </Link>
                            <Link
                              href="/riwayat"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#d1fae5] hover:bg-[#122a22] hover:text-[#34d399] transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Riwayat Laporan
                            </Link>
                            <Link
                              href="/pengaduan"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#d1fae5] hover:bg-[#122a22] hover:text-[#34d399] transition-colors"
                            >
                              <Settings className="h-4 w-4" />
                              Buat Pengaduan
                            </Link>
                            {/* Theme toggle in dropdown */}
                            <button
                              onClick={() => { toggleTheme(); setShowUserMenu(false); }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#d1fae5] hover:bg-[#122a22] hover:text-[#34d399] transition-colors"
                            >
                              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                              {isDark ? 'Mode Terang' : 'Mode Gelap'}
                            </button>
                          </div>
                          <div className="border-t border-[#1a3a2e] py-1">
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#fb7185] hover:bg-[#fb7185]/10 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              Keluar
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#d1fae5] hover:text-[#34d399] transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-[#34d399] text-[#080f0d] hover:bg-[#10b981] transition-colors shadow-[0_0_16px_rgba(52,211,153,0.3)]"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
