'use client'

import React, { useEffect, useState } from 'react'
import { Home, Trees, Images, FileText, Clipboard, Users, Settings, MoreHorizontal, Scan } from 'lucide-react'
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

  useEffect(() => {
    const title = pathname
      .split('/')
      .pop()
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

      setActiveTab(title && title !== "Admin" ? title : '');
    document.title = `Admin | ${title && title !== "Admin" ? title : 'Dashboard'}`;
  }, [pathname]);
  const isActive = (href: string) => {
    return activeTab === (href || "")
  }

  return (
    <>
      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 z-50 w-full bg-primary-foreground dark:bg-background border-t md:hidden">
        <div className="grid grid-cols-5 gap-2 h-14 px-4 items-center justify-center relative">
          {adminMenu.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={`/admin/${item.href}`}
              className={`inline-flex h-10 rounded flex-col text-white items-center justify-center hover:bg-primary transition-colors ${
                isActive(item.href) ? 'bg-primary' : ''
              }`}
              prefetch={true}
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
            </Link>
          ))}
          <Link
            href={`/admin/scan`}
            className={`inline-flex h-10 rounded flex-col text-white items-center justify-center hover:bg-primary transition-colors ${
              isActive("scan") ? 'bg-primary' : ''
            }`}
            prefetch={true}
          >
            <Scan className="w-8 h-8" />
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
              <item.icon className="w-5 h-5" aria-hidden="true" />
            </Link>
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex flex-col text-white h-10 rounded items-center justify-center hover:bg-primary transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <nav className="mt-6 space-y-4">
                {adminMenu.slice(4).map((item) => (
                  <Link
                    key={item.name}
                    href={`/admin/${item.href}`}
                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-primary transition-colors ${
                      isActive(item.href) ? 'bg-primary' : ''
                    } flex items-center gap-3`}
                    prefetch={true}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}