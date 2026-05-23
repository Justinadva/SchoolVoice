'use client';

import { dummyComplaints } from '@/data/dummy';
import { Complaint, ComplaintFormData } from '@/types';
import { createContext, useCallback, useContext, useState } from 'react';

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (data: ComplaintFormData) => Complaint;
  getComplaintByTicket: (code: string) => Complaint | undefined;
}

const ComplaintContext = createContext<ComplaintContextType | null>(null);

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(dummyComplaints);

  const addComplaint = useCallback((data: ComplaintFormData): Complaint => {
    const ticketCode = `SV-${new Date().getFullYear()}-${String(complaints.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      ticketCode,
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      school: data.school,
      category: data.category as Complaint['category'],
      status: 'pending',
      isAnonymous: data.isAnonymous,
      userId: 'usr-001',
      createdAt: now,
      updatedAt: now,
      timeline: [
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
      ],
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    return newComplaint;
  }, [complaints.length]);

  const getComplaintByTicket = useCallback(
    (code: string) => complaints.find((c) => c.ticketCode === code),
    [complaints]
  );

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, getComplaintByTicket }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaint() {
  const ctx = useContext(ComplaintContext);
  if (!ctx) throw new Error('useComplaint must be used within ComplaintProvider');
  return ctx;
}
