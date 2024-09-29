"use client"
import { Suspense, useState } from "react";
import AdminHeader from "@/components/layout/admin/header";
import AdminSidebar from "@/components/layout/sidebar";
import AdminBottomNav from "@/components/layout/admin/adminBottomNav";
import Loading from "./loading";
import { ScanResultProvider } from "@/context/scan-result-context";
import ResultDisplay from "@/components/common/scanImage/scan-result";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const role = "admin";
    return (
      <div className="flex h-auto lg:h-screen relative bg-muted/80 dark:bg-muted/20 ">
        <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={role}/>
        <div className="w-full flex-1 flex flex-col overflow-hidden relative">
          <AdminHeader toggleSidebar={toggleSidebar}/>
          <Suspense fallback={<Loading/>}>
          <ScanResultProvider>
            {/* <div className="flex-1 relative"> */}
              {children}
              <ResultDisplay/>
            {/* </div> */}
          </ScanResultProvider>
          </Suspense>
          <AdminBottomNav role={role}/>
          <Toaster />
        </div>
      </div>
    );
  }
  
