import { AuthProvider } from '@/context/AuthContext';
import { ComplaintProvider } from '@/context/ComplaintContext';
import { ToastProvider } from '@/context/ToastContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Inter, Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import ToastContainer from '@/components/ui/ToastContainer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import GradientBlobs from '@/components/layout/GradientBlobs';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SchoolVoice — Platform Pengaduan Sekolah',
    template: '%s | SchoolVoice',
  },
  description:
    'Sampaikan aspirasi, keluhan, kritik, dan saran Anda kepada pihak sekolah secara aman, mudah, dan transparan melalui SchoolVoice.',
  keywords: ['pengaduan sekolah', 'laporan siswa', 'platform sekolah', 'SchoolVoice', 'SMA N 1 Gringsing'],
  authors: [{ name: 'SchoolVoice Team' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'SchoolVoice — Platform Pengaduan Sekolah',
    description: 'Sampaikan aspirasi dan keluhan Anda ke sekolah secara aman & mudah.',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SchoolVoice',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      {/* Anti-flash script: apply saved theme before first paint */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('sv-theme');
                if (t === 'light') document.documentElement.classList.add('light');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ComplaintProvider>
              <ToastProvider>
                <ParticleBackground />
                <GradientBlobs />
                <div className="relative z-10">
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                </div>
                <ToastContainer />
              </ToastProvider>
            </ComplaintProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
