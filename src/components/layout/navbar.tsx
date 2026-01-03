"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "../icons.jsx"
import { ThemeToggle } from "../theme-toggle.jsx"
import { cn } from "../../lib/utils.js"
import { Button } from "../ui/button.jsx"
import Image from "next/image"
import { Avatar, AvatarFallback } from "../ui/avatar.jsx"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet.jsx"
import { Menu } from "lucide-react"

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
      <div className="container flex h-20 items-center">
        <div className="flex items-center md:mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold">MLera</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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

        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
          <Avatar className="h-9 w-9">
            <Image src="https://picsum.photos/seed/user-avatar/36/36" alt="User avatar" width={36} height={36} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-8">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={`${href}-${label}-mobile`}
                    href={href}
                    className={cn(
                      "text-lg transition-colors hover:text-foreground/80",
                      (pathname === href || (href !== "/" && pathname.startsWith(href))) ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
