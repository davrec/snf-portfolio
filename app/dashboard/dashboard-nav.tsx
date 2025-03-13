"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, CreditCard, DollarSign, Home, LineChart, Menu, PieChart, Plus, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/investments"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/investments" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <DollarSign className="h-4 w-4" />
                Investments
              </Link>
              <Link
                href="/dashboard/transactions"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/transactions" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <CreditCard className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                href="/dashboard/analytics"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/analytics" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="/dashboard/performance"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/performance" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <LineChart className="h-4 w-4" />
                Performance
              </Link>
              <Link
                href="/dashboard/allocation"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/allocation" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <PieChart className="h-4 w-4" />
                Allocation
              </Link>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/dashboard/settings" ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Link href="/dashboard/add-investment">
              <Button className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add New Investment
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/investments"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/investments" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <DollarSign className="h-4 w-4" />
                  Investments
                </Link>
                <Link
                  href="/dashboard/transactions"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/transactions" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Transactions
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/analytics" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  href="/dashboard/performance"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/performance" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <LineChart className="h-4 w-4" />
                  Performance
                </Link>
                <Link
                  href="/dashboard/allocation"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/allocation" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <PieChart className="h-4 w-4" />
                  Allocation
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === "/dashboard/settings" ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Link href="/dashboard/add-investment">
                <Button className="w-full" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add New Investment
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

