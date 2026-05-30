import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: id });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'dd MMM yyyy, HH:mm', { locale: id });
  } catch {
    return dateStr;
  }
}

export function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: id });
  } catch {
    return dateStr;
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    // Supabase values (Indonesian capitalised)
    Menunggu: 'Menunggu',
    Diproses: 'Diproses',
    Selesai: 'Selesai',
    Ditolak: 'Ditolak',
    // Legacy lowercase English
    pending: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
  };
  return labels[status] ?? labels[status?.toLowerCase()] ?? status ?? 'Tidak Diketahui';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Menunggu: '#fbbf24',
    Diproses: '#22d3ee',
    Selesai: '#34d399',
    Ditolak: '#fb7185',
    pending: '#fbbf24',
    diproses: '#22d3ee',
    selesai: '#34d399',
    ditolak: '#fb7185',
  };
  return colors[status] ?? colors[status?.toLowerCase()] ?? '#6b8f82';
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
