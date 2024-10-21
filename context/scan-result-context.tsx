'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface ScanResult {
  imageUrl: string | null;
  treeCode: string;
  disease: string;
  confidence: number;
  severity: string;
  affectedArea: string;
  recommendations: string[];
  additionalInfo: string;
}

interface ScanResultContextType {
  scanResult: ScanResult | null;
  setScanResult: React.Dispatch<React.SetStateAction<ScanResult | null>>;
}

const ScanResultContext = createContext<ScanResultContextType | undefined>(undefined);

export const useScanResult = () => {
  const context = useContext(ScanResultContext);
  if (context === undefined) {
    throw new Error('useScanResult must be used within a ScanResultProvider');
  }
  return context;
};

export const ScanResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  return (
    <ScanResultContext.Provider value={{ scanResult, setScanResult }}>
      {children}
    </ScanResultContext.Provider>
  );
};