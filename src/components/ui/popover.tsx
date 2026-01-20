"use client"

import { ComponentProps, useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      {children}
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({ children, asChild, ...props }: ComponentProps<"button"> & { asChild?: boolean }) {
  const context = React.useContext(PopoverContext)

  const handleClick = () => {
    context?.setOpen(!context.open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      ...props,
    })
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: ComponentProps<"div"> & {
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  const context = React.useContext(PopoverContext)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!context?.open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        context.setOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        context.setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [context])

  if (!context?.open || !mounted) return null

  return createPortal(
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-pane">
        <div
          ref={contentRef}
          className={cn("mat-mdc-menu-panel", className)}
          role="dialog"
          {...props}
        >
          <div className="mat-mdc-menu-content">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function PopoverAnchor({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function PopoverClose({ children, className, ...props }: ComponentProps<"button">) {
  const context = React.useContext(PopoverContext)

  return (
    <button
      type="button"
      onClick={() => context?.setOpen(false)}
      className={cn("mat-mdc-icon-button", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }
