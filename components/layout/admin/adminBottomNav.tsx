'use client'

import React, { useState,useEffect } from 'react'
import { MoreHorizontal, Scan, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarItems } from '@/config/sidebar-item';

interface AdminBottomNavProps {
  role: string;
}

export default function AdminBottomNav({ role }: AdminBottomNavProps) {
  const pathname = usePathname();
  const items = sidebarItems(role);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Clean up when the component unmounts
    };
  }, [sidebarOpen]);
  const toggleMoreMenu = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/95 dark:supports-[backdrop-filter]:bg-background/90 md:hidden">
        <div className="grid grid-cols-5 gap-4 h-14 md:h-16 px-4 py-2 items-center justify-center relative">
          {items.slice(0, 2).map((item) => (
            <Link
              key={item.label}
              href={`${item.href}`}
              className={`inline-flex h-10 rounded-lg flex-col text-foreground items-center justify-center hover:text-primary transition-colors ${
                pathname === item.href ? 'bg-primary text-primary-foreground hover:text-white' : ''
              }`}
              prefetch={true}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          ))}
          <Link
            href={`/admin/scan`}
            className={`inline-flex h-10 rounded flex-col text-foreground items-center justify-center hover:text-primary transition-colors ${
              pathname === '/admin/scan' ? 'bg-primary text-primary-foreground hover:text-white' : ''
            }`}
            prefetch={true}
          >
            <Scan className="w-6 h-6" aria-hidden="true" />
          </Link>
          {items.slice(3, 4).map((item) => (
            <Link
              key={item.label}
              href={`${item.href}`}
              className={`inline-flex flex-col text-foreground h-10 rounded items-center justify-center hover:text-primary transition-colors ${
                pathname === item.href ? 'bg-primary text-primary-foreground hover:text-white' : ''
              }`}
              prefetch={true}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          ))}
          <button
            className="inline-flex flex-col text-foreground h-10 rounded items-center justify-center hover:text-primary transition-colors"
            onClick={toggleMoreMenu}
          >
            <MoreHorizontal className="w-6 h-6" aria-hidden="true" />
          </button>
          <MoreMenu
            items={items.slice(4)}
            isOpen={sidebarOpen}
            toggleSidebar={toggleMoreMenu}
          />
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleMoreMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

interface SidebarItem {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

interface MoreMenuProps {
  items: SidebarItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ items, isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 z-50 p-6 h-auto w-full bg-primary-foreground dark:bg-background mt-6 space-y-4 rounded-t-lg transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="w-full flex justify-end">
        <button
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-white text-foreground"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      {items.map((item) => (
        <Link
          key={item.label}
          href={`${item.href}`}
          className={`w-full text-left text-foreground px-4 py-2 rounded-lg hover:text-primary transition-colors ${
            pathname === item.href ? 'bg-primary text-primary-foreground' : ''
          } flex items-center gap-3`}
          prefetch={true}
        >
          <item.icon className="h-5 w-5" aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
