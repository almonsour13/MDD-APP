'use client'

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, ChevronDown, Settings, Leaf, Menu, User, Upload } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface AdminHeaderProps {
  toggleSidebar: () => void
}

const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const [pageTitle, setPageTitle] = useState("");
  const pathname = usePathname()

  useEffect(() => {
    // Convert pathname to title case and remove hyphens
    const title = pathname
      .split('/')
      .pop()
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Set the page title, defaulting to 'Dashboard' if the title is 'Admin'
    setPageTitle(title && title !== "Admin" ? title : 'Dashboard');
    
    // Update document title
    document.title = `Admin | ${title && title !== "Admin" ? title : 'Dashboard'}`;
  }, [pathname]);
  return (
    <header className="bg-primary-foreground dark:bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/upload"
              className="text-white flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hidden lg:block"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuItem>New upload</DropdownMenuItem>
                <DropdownMenuItem>Analysis complete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle/>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="text-white"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent border-none text-white shadow-none">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminHeader