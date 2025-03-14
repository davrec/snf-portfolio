import Link from "next/link"
import { LineChartIcon as ChartLineUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ChartLineUp className="h-6 w-6" />
            <span className="text-lg font-bold">SNF Portfolio</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Track your investments with real-time data and powerful analytics.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:underline">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:underline">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:underline">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 border-t py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SNF Portfolio. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

