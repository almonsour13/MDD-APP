"use client"
import { useState } from "react";
import AdminHeader from "@/components/layout/admin/adminHeader";
import AdminSidebar from "@/components/layout/sidebar";
import Dashboard from "./page";
import AdminBottomNav from "@/components/layout/admin/adminBottomNav";
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
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <AdminHeader toggleSidebar={toggleSidebar}/>
          {children}
          <AdminBottomNav role={role}/>
        </div>
      </div>
    );
  }
  
