'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CameraContextType {
  isCameraOpen: boolean;
  toggleCamera: () => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const toggleCamera = () => {
    setIsCameraOpen((prev) => !prev);
  };

  return (
    <CameraContext.Provider value={{ isCameraOpen, toggleCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};
