"use client"

import { ComponentProps } from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Switch Component
 *
 * Android-style toggle switch with:
 * - 52x32 track (MD3 spec)
 * - 24x24 handle when unchecked, 28x28 when checked
 * - State layer on handle
 * - Proper focus ring
 */
function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Track dimensions (MD3: 52x32)
        "inline-flex h-8 w-[52px] shrink-0 items-center rounded-full",
        "border-2 border-transparent",
        "transition-colors duration-200",
        "outline-none cursor-pointer",
        // Unchecked track
        "data-[state=unchecked]:bg-muted",
        "data-[state=unchecked]:border-border",
        // Checked track
        "data-[state=checked]:bg-primary",
        // Focus state
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-[0.38]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Thumb base
          "pointer-events-none block rounded-full",
          "shadow-md",
          "transition-all duration-200",
          // Unchecked: smaller thumb (24x24), positioned left
          "data-[state=unchecked]:size-6",
          "data-[state=unchecked]:translate-x-0.5",
          "data-[state=unchecked]:bg-muted-foreground",
          // Checked: larger thumb (28x28), positioned right
          "data-[state=checked]:size-7",
          "data-[state=checked]:translate-x-[22px]",
          "data-[state=checked]:bg-primary-foreground",
          // State layer effect on hover (via parent)
          "relative",
          "before:absolute before:inset-[-8px] before:rounded-full",
          "before:bg-current before:opacity-0 before:transition-opacity",
          "group-hover:before:opacity-[0.08]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
