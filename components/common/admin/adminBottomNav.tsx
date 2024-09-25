'use client'

import React, { useEffect, useState } from 'react'
import { Home, Trees, Images, FileText, Clipboard, Users, Settings, MoreHorizontal, Scan,X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const adminMenu = [
  { name: 'Dashboard', icon: Home, href: "" },
  { name: 'Trees', icon: Trees, href: "trees" },
  { name: 'Images', icon: Images, href: "images" },
  { name: 'Prescriptions', icon: Clipboard, href: "prescription" },
  { name: 'Users', icon: Users, href: "users" },
  { name: 'Settings', icon: Settings, href: "settings" },
  { name: 'Diseases', icon: FileText, href: "diseases" },
]

export default function AdminBottomNav() {
  const [activeTab, setActiveTab] = useState('')
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleMoreMenu = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    const currentPath = pathname.split('/').pop() || ''
    const title = currentPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    setActiveTab(title && title !== "Admin" ? title : 'Dashboard')
    document.title = `Admin | ${title && title !== "Admin" ? title : 'Dashboard'}`
  }, [pathname])

  const isActive = (href: string) => {
    const currentPath = pathname.split('/').pop() || ''
    return (currentPath === href) || (href === "" && (currentPath === "admin" || currentPath === ""))
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full bg-primary-foreground/90 dark:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-primary-foreground/95 dark:supports-[backdrop-filter]:bg-background/90 md:hidden">
        <div className="grid grid-cols-5 gap-2 h-14 md:h-16 px-4 items-center justify-center relative">
          {adminMenu.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={`/admin/${item.href}`}
              className={`inline-flex h-10 rounded flex-col text-white items-center justify-center hover:bg-primary transition-colors ${
                isActive(item.href) ? 'bg-primary' : ''
              }`}
              prefetch={true}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          ))}
          <Link
            href={`/admin/scan`}
            className={`inline-flex h-10 rounded flex-col text-white items-center justify-center hover:bg-primary transition-colors ${
              isActive("scan") ? 'bg-primary' : ''
            }`}
            prefetch={true}
          >
            <Scan className="w-6 h-6" aria-hidden="true" />
          </Link>
          {adminMenu.slice(3, 4).map((item) => (
            <Link
              key={item.name}
              href={`/admin/${item.href}`}
              className={`inline-flex flex-col text-white h-10 rounded items-center justify-center hover:bg-primary transition-colors ${
                isActive(item.href) ? 'bg-primary' : ''
              }`}
              prefetch={true}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          ))}
          <button className="inline-flex flex-col text-white h-10 rounded items-center justify-center hover:bg-primary transition-colors"
          onClick={toggleMoreMenu}
          >
            <MoreHorizontal className="w-6 h-6" aria-hidden="true" />
          </button>
          <MoreMenu items={adminMenu.slice(4)} isActive={isActive} isOpen={sidebarOpen} toggleSidebar={toggleMoreMenu}/>
        </div>
      </div>
    </>
  )
}

interface MoreMenuProps {
  items: typeof adminMenu
  isActive: (href: string) => boolean
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ items, isActive, isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
        )}
      <nav className={`absolute bottom-0 z-50 p-4 h-auto w-full bg-primary-foreground dark:bg-background mt-6 space-y-4 rounded-t-lg
        transform ${isOpen ? '-translate-y-0' : 'translate-y-full'}
        transition-all duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="w-full flex justify-end">
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden focus:outline-none focus:ring-2 focus:ring-white text-white"
            aria-label="Close sidebar"
            >
            <X className="h-6 w-6" />
          </button>
        </div>
        {items.map((item) => (
          <Link
            key={item.name}
            href={`/admin/${item.href}`}
            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-primary text-white transition-colors ${
              isActive(item.href) ? 'bg-primary' : ''
            } flex items-center gap-3`}
            prefetch={true}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}