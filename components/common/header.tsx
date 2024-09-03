import Link from "next/link"
import React from "react"
import { Menu } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { UserRound } from "lucide-react"

const Header = () => {
    return(
        <header className="w-full flex justify-center">
        <div className="w-11/12 flex items-center justify-between h-16">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            {/* <MountainIcon className="h-6 w-6" /> */}
            <span className="text-lg font-semibold">MDD</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/upload" menuText="Home"/>
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
          <div className="ml-auto md:hidden">
            <button className="bg-transparent text-black shadow-none">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </header>
    )
}
interface NavLinkProps{
  href:string
  menuText:string
}
const NavLink = ({href,menuText}:NavLinkProps) => {
  return(
    <Link href={href} className="text-sm font-medium hover:bg-gray-100 p-2 px-4 rounded-md h-8" prefetch={false}>
        {menuText}
    </Link>
  )
}
export default Header;