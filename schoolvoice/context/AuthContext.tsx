'use client';

import { dummyUser } from '@/data/dummy';
import { User } from '@/types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: Partial<User> & { password: string }) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate persisted session
    const stored = localStorage.getItem('sv_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    if (email === dummyUser.email || email === 'demo@schoolvoice.id') {
      setUser(dummyUser);
      localStorage.setItem('sv_user', JSON.stringify(dummyUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sv_user');
  }, []);

  const register = useCallback(async (data: Partial<User> & { password: string }): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      role: data.role || 'Siswa',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('sv_user', JSON.stringify(newUser));
    return true;
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('sv_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
