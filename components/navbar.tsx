"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LineChartIcon as ChartLineUp, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ChartLineUp className="h-6 w-6" />
          <span className="text-lg font-bold">SNF Portfolio</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Link href="/login" className="hidden md:block">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register" className="hidden md:block">
            <Button size="sm">Sign up</Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">
                  Home
                </Link>
                <Link href="/features" onClick={() => setIsOpen(false)} className="hover:underline">
                  Features
                </Link>
                <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:underline">
                  Pricing
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="hover:underline">
                  About
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

