"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toasts, dismissToast } = useToast()

  return (
    <>
      {children}
      <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-4 max-h-screen overflow-hidden">
        {toasts.map((toast) => (
          <Toast key={toast.id} open={toast.open} variant={toast.variant} onClose={() => dismissToast(toast.id)}>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </Toast>
        ))}
      </div>
    </>
  )
}

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      variant: {
        default: "bg-background border",
        destructive: "group destructive border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  open?: boolean
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open = true, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          "max-w-md transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
          className,
        )}
        {...props}
      >
        <div className="flex-1">{props.children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    )
  },
)
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h2 ref={ref} className={cn("text-sm font-semibold", className)} {...props} />,
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm opacity-90", className)} {...props} />,
)
ToastDescription.displayName = "ToastDescription"

export { ToastProvider, Toast, ToastTitle, ToastDescription }

