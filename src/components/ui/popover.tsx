"use client"

import { ComponentProps } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Popover
 *
 * Android-style popover with:
 * - Proper elevation and shadow
 * - Smooth animations
 * - Accessible focus management
 */

function Popover({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // MD3 surface container high
          "bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))]",
          // Shape and shadow
          "z-50 w-[min(90vw,18rem)] max-h-[70vh] overflow-auto rounded-xl border-0 p-3 md:p-4",
          "shadow-lg",
          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          // Transform origin
          "origin-[var(--radix-popover-content-transform-origin)]",
          // Focus
          "outline-none",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

/**
 * PopoverClose - Close button for popover
 */
function PopoverClose({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(
        "absolute right-2 top-2",
        "flex items-center justify-center",
        "size-8 rounded-full",
        "text-[hsl(var(--muted-foreground))]",
        "hover:bg-[hsl(var(--muted))]",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "transition-colors duration-150",
        className
      )}
      {...props}
    />
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }
