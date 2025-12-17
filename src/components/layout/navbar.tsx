"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Image from "next/image"
import { Avatar, AvatarFallback } from "../ui/avatar"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learning Path" },
  { href: "#", label: "Challenges" },
  { href: "#", label: "My Courses" },
  { href: "#", label: "Achievements" },
  { href: "#", label: "Buddy" },
  { href: "#", label: "Lexicon" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">MLera</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={`${href}-${label}`}
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  (pathname === href || (href !== "/" && pathname.startsWith(href))) ? "text-foreground" : "text-foreground/60"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden mr-4 flex items-center">
           <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">MLera</span>
          </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <Avatar className="h-8 w-8">
            <Image src="https://picsum.photos/seed/user-avatar/32/32" alt="User avatar" width={32} height={32} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
