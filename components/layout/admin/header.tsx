'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Bell, Settings, Menu, User, Scan } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, 
  DropdownMenuSubContent, DropdownMenuSubTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  toggleSidebar: () => void
}

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const [pageTitle, setPageTitle] = useState("");
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const title = pathname
      .split('/')
      .pop()
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setPageTitle(title && title !== "Admin" ? title : 'Dashboard');
    document.title = `Admin | ${title && title !== "Admin" ? title : 'Dashboard'}`;
  }, [pathname]);
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      router.push("/signin")
    } 
  }
//sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 backdrop-filter backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
        <div className="h-14 flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 h-auto text-foreground hidden md:block lg:hidden focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground ">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin/scan"
              className="text-foreground hover:text-primary transition-colors hidden md:block"
              aria-label="Upload"
            >
              <Scan className="h-5 w-5" />
            </Link>
            
            {/* Desktop view: Show notification and dark mode toggle */}
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-foreground"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">New upload complete</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Analysis finished</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-primary justify-center">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {/* Mobile view: Show notifications and dark mode in dropdown */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {theme === "dark" ? (
                      <SunIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <MoonIcon className="mr-2 h-4 w-4" />
                    )}
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <button className='w-full' onClick={handleLogout}>Log out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
    </header>
  )
}