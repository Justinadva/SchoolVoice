'use client';

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

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sv-user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    if (email && password.length >= 6) {
      const loggedIn: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '',
        role: 'Siswa',
        createdAt: new Date().toISOString(),
      };
      setUser(loggedIn);
      localStorage.setItem('sv-user', JSON.stringify(loggedIn));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sv-user');
  }, []);

  const register = useCallback(async (data: Partial<User> & { password: string }): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      role: data.role ?? 'Siswa',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('sv-user', JSON.stringify(newUser));
    return true;
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('sv-user', JSON.stringify(updated));
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