'use client'

import React, { useEffect, useState } from 'react'
import { Bell, ChevronDown, Search, Settings, Leaf, Menu, X, Home, Trees, Images, FileText, Clipboard, Users, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const adminMenu = [
  { name: 'Dashboard', icon: Home, href: "" },
  { name: 'Trees', icon: Trees, href: "trees" },
  { name: 'Images', icon: Images, href: "images" },
  { name: 'Disease Records', icon: FileText, href: "diseases" },
  { name: 'Prescriptions', icon: Clipboard, href: "prescription" },
  { name: 'User', icon: Users, href: "users" },
  { name: 'Settings', icon: Settings, href: "settings" },
]

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar = ({ isOpen, toggleSidebar }: AdminSidebarProps) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const pathname = usePathname()

  useEffect(() => {
    const currentPath = pathname.split('/').pop() || ''
    const activeMenuItem = adminMenu.find(item => item.href === currentPath)
    if (activeMenuItem) {
      setActiveTab(activeMenuItem.name.toLowerCase().replace(' ', '-'))
    } else {
      setActiveTab('dashboard')
    }
  }, [pathname])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-primary-foreground dark:bg-background text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 border-r`}
      >
        <div className="h-16 flex items-center justify-between p-4">
          <div className="flex gap-1 items-center justify-center">
            <Image
              src="/assets/icon/icon.png"
              alt="icon"
              width={48}
              height={48}
              className="w-6 h-6"
            />
            <h2 className="text-2xl font-bold">Mango<span className='text-yellow-600'>Care</span></h2>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-4 mt-2 space-y-1">
          {adminMenu.map((item) => (
            <Link
              key={item.name}
              href={`/admin/${item.href}`}
              className={`w-full text-left px-4 py-2 rounded-lg hover:bg-primary transition-colors ${
                activeTab === item.name.toLowerCase().replace(' ', '-') ? 'bg-primary' : ''
              } flex items-center gap-3`}
              onClick={() => {
                setActiveTab(item.name.toLowerCase().replace(' ', '-'))
                toggleSidebar()
              }}
              prefetch={true}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar