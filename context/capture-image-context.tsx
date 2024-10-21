'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface CaptureImageContextType {
  capturedImage: string;
  setCapturedImage: (image: string) => void;
}

// Create the context
const CaptureImageContext = createContext<CaptureImageContextType | undefined>(undefined);

// Create a provider component
export const CaptureImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [capturedImage, setCapturedImage] = useState<string>('');

  return (
    <CaptureImageContext.Provider value={{ capturedImage, setCapturedImage }}>
      {children}
    </CaptureImageContext.Provider>
  );
};

// Create a custom hook to use the CaptureImageContext
export const useCaptureImageContext = () => {
  const context = useContext(CaptureImageContext);
  if (!context) {
    throw new Error('useCaptureImageContext must be used within a CaptureImageProvider');
  }
  return context;
};
