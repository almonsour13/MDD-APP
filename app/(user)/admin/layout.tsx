'use client'

import { Suspense, useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import AdminHeader from "@/components/layout/admin/header"
import AdminSidebar from "@/components/layout/sidebar"
import AdminBottomNav from "@/components/layout/admin/adminBottomNav"
import Loading from "./loading"
import { ScanResultProvider } from "@/context/scan-result-context"
import ResultDisplay from "@/components/common/scan/scan-result"
import { Toaster } from "@/components/ui/toaster"
import ImageScannerScreen from "@/components/common/scan/mobile-capture-image"
import { useCameraContext } from "@/context/user-camera-context"
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const {isCameraOpen, toggleCamera} = useCameraContext();
  const role = "admin"
  const pathname = usePathname();

  const isCapturePage = pathname === '/admin/scan' || pathname === '/user/scan'; // Adjust this path as needed

  if (isCapturePage && isCameraOpen) {
    return <ImageScannerScreen />;
  }

  //md:bg-muted/80 dark:bg-background md:dark:bg-muted/20
  return (
    <div className="flex h-auto min-h-screen relative bg-background">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={role}/>
      <div className="w-full flex-1 flex flex-col overflow-hidden relative">
        <AdminHeader toggleSidebar={toggleSidebar}/>    
        <Suspense fallback={<Loading/>}>
          <ScanResultProvider>
            <main className="flex-1 overflow-y-auto">
              {children}
              <ResultDisplay/>
            </main>
          </ScanResultProvider>
        </Suspense>
        <AdminBottomNav role={role}/>
        <Toaster />
      </div>
    </div>
  )
}