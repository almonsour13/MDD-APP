'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setCookie, getCookie, removeCookie } from '@/utils/cookies';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie('auth_token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      setCookie('auth_token', newToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    } else {
      removeCookie('auth_token');
    }
    setTokenState(newToken);
  };

  const clearToken = () => {
    removeCookie('auth_token');
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
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