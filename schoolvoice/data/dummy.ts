import { Announcement, Complaint, School, User } from '@/types';

export const dummyUser: User = {
  id: 'usr-001',
  name: 'Ahmad Fauzi',
  email: 'ahmad.fauzi@email.com',
  phone: '081234567890',
  role: 'Siswa',
  createdAt: '2024-08-15T08:00:00Z',
};

export const schools: School[] = [
  { id: 'sch-001', name: 'SMA N 1 Gringsing', address: 'Jl. Raya Gringsing, Gringsing, Batang, Jawa Tengah 51281', type: 'SMA' },
];

export const dummyComplaints: Complaint[] = [
  {
    id: 'cmp-001',
    ticketCode: 'SV-2024-001',
    title: 'Bullying di Kelas 10-A oleh Senior',
    description:
      'Terjadi tindakan bullying verbal dan fisik yang dilakukan oleh siswa kelas 12 terhadap adik kelas di area kantin sekolah. Kejadian berlangsung hampir setiap hari dan sudah membuat korban tidak nyaman untuk berangkat sekolah.',
    date: '2024-11-10',
    location: 'Kantin SMA N 1 Gringsing',
    school: 'SMA N 1 Gringsing',
    category: 'Bullying',
    status: 'diproses',
    isAnonymous: false,
    response:
      'Kami telah menerima laporan Anda dan sedang melakukan investigasi. Tim BK sedang menangani kasus ini dengan serius.',
    responseDate: '2024-11-12T10:00:00Z',
    userId: 'usr-001',
    createdAt: '2024-11-10T14:30:00Z',
    updatedAt: '2024-11-12T10:00:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: '2024-11-10T14:30:00Z',
        description: 'Laporan Anda telah berhasil dikirim dan menunggu verifikasi.',
        completed: true,
      },
      {
        status: 'diproses',
        label: 'Sedang Diproses',
        date: '2024-11-12T10:00:00Z',
        description: 'Laporan Anda sedang ditangani oleh pihak sekolah.',
        completed: true,
      },
      {
        status: 'selesai',
        label: 'Selesai',
        date: '',
        description: 'Laporan telah diselesaikan.',
        completed: false,
      },
    ],
  },
  {
    id: 'cmp-002',
    ticketCode: 'SV-2024-002',
    title: 'Toilet Lantai 2 Rusak dan Tidak Terawat',
    description:
      'Toilet di lantai 2 gedung B sudah rusak selama 2 minggu. Kran air tidak berfungsi, pintu engselnya lepas, dan kondisi sangat kotor. Sudah dilaporkan ke penjaga sekolah tapi belum ada tindakan.',
    date: '2024-11-08',
    location: 'Gedung B Lantai 2, SMA N 1 Gringsing',
    school: 'SMA N 1 Gringsing',
    category: 'Fasilitas Sekolah',
    status: 'selesai',
    isAnonymous: true,
    response:
      'Perbaikan telah dilakukan pada tanggal 15 November 2024. Toilet telah direnovasi dan siap digunakan kembali. Terima kasih atas laporannya.',
    responseDate: '2024-11-15T09:00:00Z',
    userId: 'usr-001',
    createdAt: '2024-11-08T09:00:00Z',
    updatedAt: '2024-11-15T09:00:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: '2024-11-08T09:00:00Z',
        description: 'Laporan Anda telah berhasil dikirim.',
        completed: true,
      },
      {
        status: 'diproses',
        label: 'Sedang Diproses',
        date: '2024-11-10T08:00:00Z',
        description: 'Tim maintenance sedang mengecek lokasi.',
        completed: true,
      },
      {
        status: 'selesai',
        label: 'Selesai',
        date: '2024-11-15T09:00:00Z',
        description: 'Perbaikan telah selesai dilakukan.',
        completed: true,
      },
    ],
  },
  {
    id: 'cmp-003',
    ticketCode: 'SV-2024-003',
    title: 'Keterlambatan Pengurusan Surat Keterangan',
    description:
      'Saya sudah mengajukan surat keterangan aktif kuliah 3 minggu yang lalu tetapi hingga saat ini belum selesai. Padahal dibutuhkan untuk keperluan beasiswa. Setiap kali ditanya ke bagian TU jawabannya selalu "besok".',
    date: '2024-11-05',
    location: 'Ruang TU SMA N 1 Gringsing',
    school: 'SMA N 1 Gringsing',
    category: 'Administrasi',
    status: 'pending',
    isAnonymous: false,
    userId: 'usr-001',
    createdAt: '2024-11-05T13:00:00Z',
    updatedAt: '2024-11-05T13:00:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: '2024-11-05T13:00:00Z',
        description: 'Laporan Anda telah berhasil dikirim dan menunggu verifikasi.',
        completed: true,
      },
      {
        status: 'diproses',
        label: 'Sedang Diproses',
        date: '',
        description: 'Laporan Anda sedang ditangani.',
        completed: false,
      },
      {
        status: 'selesai',
        label: 'Selesai',
        date: '',
        description: 'Laporan telah diselesaikan.',
        completed: false,
      },
    ],
  },
  {
    id: 'cmp-004',
    ticketCode: 'SV-2024-004',
    title: 'Guru Matematika Sering Terlambat Mengajar',
    description:
      'Guru matematika kelas 11 IPA-2 sudah 5 kali terlambat masuk kelas selama bulan November ini. Rata-rata keterlambatan 30-45 menit. Siswa hanya diberi tugas tanpa penjelasan materi.',
    date: '2024-11-12',
    location: 'Kelas 11 IPA-2, SMA N 1 Gringsing',
    school: 'SMA N 1 Gringsing',
    category: 'Pelayanan Guru',
    status: 'ditolak',
    isAnonymous: false,
    response:
      'Setelah penyelidikan, keterlambatan tersebut dikarenakan guru yang bersangkutan sedang mengurus keperluan sekolah yang sah. Laporan tidak dapat diproses lebih lanjut.',
    responseDate: '2024-11-14T11:00:00Z',
    userId: 'usr-001',
    createdAt: '2024-11-12T16:00:00Z',
    updatedAt: '2024-11-14T11:00:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: '2024-11-12T16:00:00Z',
        description: 'Laporan Anda telah berhasil dikirim.',
        completed: true,
      },
      {
        status: 'ditolak',
        label: 'Ditolak',
        date: '2024-11-14T11:00:00Z',
        description: 'Laporan tidak dapat diproses setelah investigasi.',
        completed: true,
      },
    ],
  },
  {
    id: 'cmp-005',
    ticketCode: 'SV-2024-005',
    title: 'Area Kelas Kotor dan Sampah Menumpuk',
    description:
      'Lingkungan kelas 10-C sangat kotor. Tong sampah jarang dikosongkan dan sudah penuh selama 3 hari. Sudah berdampak pada kenyamanan belajar dan ada bau tidak sedap.',
    date: '2024-11-14',
    location: 'Kelas 10-C SMA N 1 Gringsing',
    school: 'SMA N 1 Gringsing',
    category: 'Kebersihan',
    status: 'diproses',
    isAnonymous: true,
    response: 'Petugas kebersihan telah diarahkan untuk membersihkan area kelas secara rutin.',
    responseDate: '2024-11-15T07:00:00Z',
    userId: 'usr-001',
    createdAt: '2024-11-14T10:00:00Z',
    updatedAt: '2024-11-15T07:00:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Laporan Diterima',
        date: '2024-11-14T10:00:00Z',
        description: 'Laporan diterima.',
        completed: true,
      },
      {
        status: 'diproses',
        label: 'Sedang Diproses',
        date: '2024-11-15T07:00:00Z',
        description: 'Petugas kebersihan ditugaskan.',
        completed: true,
      },
      {
        status: 'selesai',
        label: 'Selesai',
        date: '',
        description: '',
        completed: false,
      },
    ],
  },
];

export const dummyAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Sistem SchoolVoice Kini Resmi Diluncurkan!',
    content:
      'Kami dengan bangga mengumumkan bahwa platform pengaduan online SchoolVoice kini resmi dapat digunakan oleh seluruh sivitas akademika. SchoolVoice hadir untuk memberikan saluran aspirasi yang aman, mudah, dan transparan bagi seluruh warga sekolah. Sampaikan keluhan, saran, dan kritik Anda untuk bersama-sama membangun lingkungan sekolah yang lebih baik.',
    category: 'Pengumuman Sistem',
    isPriority: true,
    publishDate: '2024-11-01T08:00:00Z',
    school: 'SMA N 1 Gringsing',
    author: 'Admin SchoolVoice',
  },
  {
    id: 'ann-002',
    title: 'Jadwal Ujian Akhir Semester Ganjil 2024/2025',
    content:
      'Ujian Akhir Semester (UAS) Ganjil akan dilaksanakan mulai tanggal 2-13 Desember 2024. Siswa diwajibkan hadir tepat waktu. Bagi yang tidak bisa hadir karena sakit, wajib menyertakan surat keterangan dokter. Jadwal lengkap telah ditempel di papan pengumuman masing-masing kelas.',
    category: 'Akademik',
    isPriority: false,
    publishDate: '2024-11-15T10:00:00Z',
    school: 'SMA N 1 Gringsing',
    author: 'Wakil Kepala Bidang Kurikulum',
  },
  {
    id: 'ann-003',
    title: 'Peringatan: Tindakan Bullying Tidak Ditoleransi',
    content:
      'Dalam rangka menjaga keamanan dan kenyamanan lingkungan sekolah, sekolah kembali menegaskan bahwa segala bentuk tindakan bullying, baik verbal maupun fisik, adalah pelanggaran serius. Siswa yang terbukti melakukan bullying akan mendapatkan sanksi berat sesuai tata tertib sekolah. Laporan dapat disampaikan melalui SchoolVoice atau langsung ke guru BK.',
    category: 'Penting',
    isPriority: true,
    publishDate: '2024-11-10T09:00:00Z',
    school: 'SMA N 1 Gringsing',
    author: 'Kepala Sekolah',
  },
  {
    id: 'ann-004',
    title: 'Lomba Karya Tulis Ilmiah Tingkat Provinsi',
    content:
      'Sekolah membuka pendaftaran untuk lomba karya tulis ilmiah tingkat provinsi Jawa Barat. Tema: "Inovasi Teknologi untuk Pendidikan Berkualitas". Pendaftaran dibuka sampai 25 November 2024. Informasi lebih lanjut hubungi guru pembimbing atau kunjungi ruang OSIS.',
    category: 'Lomba & Kompetisi',
    isPriority: false,
    publishDate: '2024-11-13T11:00:00Z',
    school: 'SMA N 1 Gringsing',
    author: 'Koordinator Ekstrakurikuler',
  },
  {
    id: 'ann-005',
    title: 'Perbaikan Fasilitas Lab Komputer Selesai',
    content:
      'Perbaikan dan upgrade fasilitas laboratorium komputer telah selesai dilaksanakan. Seluruh unit komputer telah diganti dengan unit baru dengan spesifikasi yang lebih baik. Lab komputer siap digunakan kembali mulai Senin, 18 November 2024. Jadwal penggunaan lab akan diatur oleh guru TIK masing-masing kelas.',
    category: 'Fasilitas',
    isPriority: false,
    publishDate: '2024-11-16T08:00:00Z',
    school: 'SMA N 1 Gringsing',
    author: 'Wakil Kepala Bidang Sarana',
  },
];

export const userStats = {
  total: dummyComplaints.length,
  selesai: dummyComplaints.filter((c) => c.status === 'selesai').length,
  diproses: dummyComplaints.filter((c) => c.status === 'diproses').length,
  pending: dummyComplaints.filter((c) => c.status === 'pending').length,
  ditolak: dummyComplaints.filter((c) => c.status === 'ditolak').length,
};
