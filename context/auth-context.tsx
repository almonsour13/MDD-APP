'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { setCookie, getCookie, removeCookie } from '@/utils/cookies';

interface AuthContextType {
  setToken: (token: string | null) => void;
  getToken: () => string | null; // Expecting string or null
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const setToken = (newToken: string | null) => {
    if (newToken) {
      setCookie('auth_token', newToken, { path: '/', maxAge: 3600 });
    } else {
      removeCookie('auth_token');
    }
  };

  const getToken = (): string | null => {
    const storedToken = getCookie('auth_token');
    return storedToken ?? null;
  };

  const clearToken = () => {
    removeCookie('auth_token');
  };

  return (
    <AuthContext.Provider value={{ setToken, getToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
