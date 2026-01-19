import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Button Component
 *
 * Variants:
 * - filled (default): High emphasis, primary actions (MD3 Filled Button)
 * - tonal: Medium emphasis, secondary actions (MD3 Filled Tonal Button)
 * - elevated: Medium emphasis with shadow (MD3 Elevated Button)
 * - outlined: Low emphasis, secondary actions (MD3 Outlined Button)
 * - text: Lowest emphasis, tertiary actions (MD3 Text Button)
 * - destructive: Error/danger actions
 * - ghost: Legacy support
 * - link: Text link style
 */
const buttonVariants = cva(
  // Base styles - MD3 common button properties
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full text-sm font-medium",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-[0.38]",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px]",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "relative overflow-hidden select-none",
    // State layer using pseudo-element
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
    "hover:before:opacity-[0.08] focus-visible:before:opacity-[0.12] active:before:opacity-[0.12]",
  ].join(" "),
  {
    variants: {
      variant: {
        // MD3 Filled Button - Primary, highest emphasis
        default: [
          "bg-primary text-primary-foreground",
          "shadow-sm",
          "hover:shadow-md",
          "active:shadow-sm",
        ].join(" "),

        // MD3 Filled Tonal Button - Secondary, medium emphasis
        tonal: [
          "bg-secondary text-secondary-foreground",
          "hover:shadow-sm",
        ].join(" "),

        // MD3 Elevated Button - Medium emphasis with elevation
        elevated: [
          "bg-card text-primary",
          "shadow-md",
          "hover:shadow-lg",
          "active:shadow-md",
        ].join(" "),

        // MD3 Outlined Button - Low emphasis
        outline: [
          "border border-border bg-transparent text-primary",
          "hover:bg-primary/[0.08]",
        ].join(" "),

        // MD3 Text Button - Lowest emphasis
        text: [
          "bg-transparent text-primary",
          "hover:bg-primary/[0.08]",
          "px-3",
        ].join(" "),

        // Destructive/Error variant
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-sm",
          "hover:shadow-md",
          "focus-visible:ring-destructive",
        ].join(" "),

        // Legacy secondary (maps to tonal)
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:shadow-sm",
        ].join(" "),

        // Ghost - for icon buttons and minimal UI
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
        ].join(" "),

        // Link style
        link: [
          "text-primary underline-offset-4 hover:underline",
          "bg-transparent",
        ].join(" "),
      },
      size: {
        // MD3 standard button height is 40dp
        default: "h-10 px-6 py-2.5 min-w-[64px] has-[>svg]:px-4",
        // Compact size
        sm: "h-8 px-4 gap-1.5 text-xs has-[>svg]:px-3",
        // Large for prominent actions
        lg: "h-12 px-8 text-base has-[>svg]:px-6",
        // Icon button (MD3 standard icon button is 40x40)
        icon: "size-10 p-0 min-w-0 rounded-full",
        // Small icon button
        "icon-sm": "size-8 p-0 min-w-0 rounded-full",
        // Large icon button
        "icon-lg": "size-12 p-0 min-w-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
