'use client'

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, UserRound } from "lucide-react"
import { Sheet, SheetTitle, SheetDescription, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(href) // Navigate to the page if href is a URL
    }
  }
  const NavLink = ({ href, menuText }: NavLinkProps) => {
    return (
      <button 
        onClick={() => handleNavClick(href)}
        className="text-sm font-medium flex justify-center items-center hover:bg-gray-100 px-4 rounded-md h-8" 
      >
        <p>{menuText}</p>
      </button>
    )
  }
  return (
    <header className="w-full flex justify-center">
      <div className="w-11/12 flex items-center justify-between h-16">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">MDD</span>
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="#banner" menuText="Home"/>
          <NavLink href="#about" menuText="About"/>
          <NavLink href="#contact" menuText="Contact"/>
          <Link
            href="/signin"
            className="inline-flex gap-1 h-8 items-center justify-center rounded-md bg-primary px-3 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            <UserRound className="w-4 h-4"/>
            <span>Signin</span>
          </Link>
        </nav>
        {/* Mobile menu */}
        <div className="ml-auto block md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-4">
              <SheetHeader className="text-left px-2">
                <SheetTitle className="text-2xl font-bold">MDD</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 py-4">
                <button onClick={() => handleNavClick("#banner")} className="text-md font-semibold flex justify-start items-center hover:bg-gray-100 px-2 rounded-md h-10">
                  Home
                </button>
                <button onClick={() => handleNavClick("#about")} className="text-md font-semibold flex justify-start items-center hover:bg-gray-100 px-2 rounded-md h-10">
                  About
                </button>
                <button onClick={() => handleNavClick("#contact")} className="text-md font-semibold flex justify-start items-center hover:bg-gray-100 px-2 rounded-md h-10">
                  Contact
                </button>
                <button
                  onClick={() => handleNavClick("/signin")}
                  className="inline-flex gap-1 h-10 items-center justify-center rounded-md bg-primary px-4 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <UserRound className="w-4 h-4"/>
                  <span>Signin</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  menuText: string
}


export default Header
