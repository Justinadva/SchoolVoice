export type ComplaintStatus = 'pending' | 'diproses' | 'selesai' | 'ditolak';

export type ComplaintCategory =
  | 'Bullying'
  | 'Fasilitas Sekolah'
  | 'Kekerasan'
  | 'Kebersihan'
  | 'Pelayanan Guru'
  | 'Administrasi'
  | 'Lainnya';

export type UserRole = 'Siswa' | 'Orang Tua' | 'Masyarakat Umum';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  ticketCode: string;
  title: string;
  description: string;
  date: string;
  location: string;
  school: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  isAnonymous: boolean;
  attachments?: string[];
  response?: string;
  responseDate?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineItem[];
}

export interface TimelineItem {
  status: ComplaintStatus;
  label: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  isPriority: boolean;
  publishDate: string;
  school: string;
  author: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  type: 'SD' | 'SMP' | 'SMA' | 'SMK';
}

export interface ComplaintFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  school: string;
  category: ComplaintCategory | '';
  isAnonymous: boolean;
  attachments: File[];
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface UserStats {
  total: number;
  selesai: number;
  diproses: number;
  pending: number;
  ditolak: number;
}
