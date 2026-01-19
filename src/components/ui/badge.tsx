import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Badge Component
 *
 * Used for:
 * - Status indicators
 * - Labels
 * - Small counts (notification badges use a different pattern)
 */
const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-1",
    "rounded-full px-2.5 py-0.5",
    "text-xs font-medium",
    "whitespace-nowrap shrink-0 w-fit",
    "transition-colors duration-200",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        // Filled badge (primary)
        default: [
          "border-transparent bg-primary text-primary-foreground",
          "[a&]:hover:bg-primary/90",
        ].join(" "),

        // Tonal badge (secondary container)
        secondary: [
          "border-transparent bg-secondary text-secondary-foreground",
          "[a&]:hover:bg-secondary/90",
        ].join(" "),

        // Error badge
        destructive: [
          "border-transparent bg-destructive text-destructive-foreground",
          "[a&]:hover:bg-destructive/90",
        ].join(" "),

        // Outlined badge
        outline: [
          "border border-border bg-transparent text-foreground",
          "[a&]:hover:bg-muted",
        ].join(" "),

        // Success badge
        success: [
          "border-transparent bg-[hsl(145,60%,35%)] text-white",
          "[a&]:hover:opacity-90",
        ].join(" "),

        // Warning badge
        warning: [
          "border-transparent bg-[hsl(40,80%,45%)] text-white",
          "[a&]:hover:opacity-90",
        ].join(" "),

        // Info badge
        info: [
          "border-transparent bg-[hsl(210,70%,45%)] text-white",
          "[a&]:hover:opacity-90",
        ].join(" "),
      },
      size: {
        default: "h-5 px-2.5 text-xs",
        sm: "h-4 px-2 text-[10px]",
        lg: "h-6 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/**
 * MD3 Small Badge (for notification counts)
 * Can be a dot or show a number
 */
function SmallBadge({
  className,
  count,
  max = 99,
  ...props
}: ComponentProps<"span"> & {
  count?: number
  max?: number
}) {
  const showDot = count === undefined || count === 0
  const displayCount = count && count > max ? `${max}+` : count

  return (
    <span
      data-slot="small-badge"
      className={cn(
        "inline-flex items-center justify-center",
        "bg-destructive text-destructive-foreground",
        "font-medium",
        showDot
          ? "size-2 rounded-full"
          : "min-w-[16px] h-4 px-1 rounded-full text-[10px]",
        className
      )}
      {...props}
    >
      {!showDot && displayCount}
    </span>
  )
}

export { Badge, SmallBadge, badgeVariants }
