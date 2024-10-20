'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, Scan, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { sidebarItems } from '@/config/sidebar-item'

interface AdminBottomNavProps {
  role: string
}

export default function AdminBottomNav({ role }: AdminBottomNavProps) {
  const pathname = usePathname()
  const items = sidebarItems(role)
  const moreItems = items.slice(4)
  const isMoreActive = moreItems.some(item => item.href === pathname)

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full backdrop-filter backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm rounded-t-xl md:hidden">
      <div className="px-4">
        <div className="flex h-16 items-center justify-between">
          {items.slice(0, 2).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
          {/* <NavItem
            item={{
              href: '/admin/scan',
              icon: Scan,
              label: 'Scan',
            }}
            pathname={pathname}
          /> */}
            <Link href="/admin/scan" className='h-12 w-12 bg-primary rounded-lg flex items-center justify-center'>
              <Scan className='h-8 w-8 text-white'/>
            </Link>
          {items.slice(3, 4).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant={"default"} 
                size="icon" 
                className={`h-10 bg-transparent shadow-none hover:bg-transparent w-10 relative ${isMoreActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <MoreHorizontal className="h-5 w-5" />
                <AnimatePresence>
                  {isMoreActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-1 w-10 rounded-full bg-primary"
                      layoutId="bottomNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <span className="sr-only">More menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <MoreMenu items={moreItems} pathname={pathname} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  item: {
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    label: string
  }
  pathname: string
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
        isActive
          ? 'text-primary font-bold'
          : 'text-muted-foreground hover:text-primary'
      }`}
      prefetch={true}
    >
      <item.icon className="h-5 w-5" />
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="absolute -bottom-1 left-0 h-1 w-10 rounded-full bg-primary"
            layoutId="bottomNav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <span className="sr-only">{item.label}</span>
    </Link>
  )
}

interface MoreMenuProps {
  items: {
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    label: string
  }[]
  pathname: string
}

function MoreMenu({ items, pathname }: MoreMenuProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 py-4">
        <h2 className="px-2 text-lg font-semibold tracking-tight">More Options</h2>
        <div className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              prefetch={true}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}