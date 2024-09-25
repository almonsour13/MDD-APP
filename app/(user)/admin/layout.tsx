"use client"
import { useState } from "react";
import AdminHeader from "@/components/common/admin/adminHeader";
import AdminSidebar from "@/components/common/admin/adminSidebar";
import Dashboard from "./page";
import AdminBottomNav from "@/components/common/admin/adminBottomNav";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    return (
      <div className="flex h-auto lg:h-screen relative bg-primary-foreground dark:bg-background">
        <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <AdminHeader toggleSidebar={toggleSidebar}/>
          {children}
          <AdminBottomNav/>
        </div>
      </div>
    );
  }
  
