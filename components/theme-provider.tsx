"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { ToastProvider } from "@/components/ui/toast"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ToastProvider>{children}</ToastProvider>
    </NextThemesProvider>
  )
}

