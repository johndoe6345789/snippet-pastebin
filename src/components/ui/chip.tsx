'use client'

import { ComponentProps, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * Material Design 3 Chip Component
 *
 * Types:
 * - assist: Actions in context (Assist Chip)
 * - filter: Toggleable filters (Filter Chip)
 * - input: User input, removable (Input Chip)
 * - suggestion: Dynamic suggestions (Suggestion Chip)
 */
const chipVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "h-8 px-4 rounded-lg",
    "text-sm font-medium",
    "transition-all duration-200",
    "cursor-pointer select-none",
    "outline-none",
    "relative overflow-hidden",
    // State layer
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
    "hover:before:opacity-[0.08] focus-visible:before:opacity-[0.12] active:before:opacity-[0.12]",
    // Focus ring
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-[0.38]",
    // Icon sizing
    "[&_svg]:size-[18px] [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Assist Chip - outlined, for contextual actions
        assist: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted/50",
        ].join(" "),

        // Filter Chip - toggleable, outlined or filled when selected
        filter: [
          "border border-border bg-transparent text-foreground",
          "data-[selected=true]:bg-secondary data-[selected=true]:border-transparent data-[selected=true]:text-secondary-foreground",
        ].join(" "),

        // Input Chip - user input, removable
        input: [
          "border border-border bg-transparent text-foreground",
          "pr-2",
        ].join(" "),

        // Suggestion Chip - outlined, for suggestions
        suggestion: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted/50",
        ].join(" "),

        // Filled variant
        filled: [
          "bg-secondary text-secondary-foreground border-transparent",
        ].join(" "),
      },
      size: {
        default: "h-8 px-4 text-sm",
        sm: "h-6 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "assist",
      size: "default",
    },
  }
)

interface ChipProps
  extends ComponentProps<"button">,
    VariantProps<typeof chipVariants> {
  leadingIcon?: React.ReactNode
  selected?: boolean
  onRemove?: () => void
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      leadingIcon,
      selected,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const isInput = variant === "input"
    const isFilter = variant === "filter"

    return (
      <button
        ref={ref}
        data-slot="chip"
        data-selected={isFilter ? selected : undefined}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {isFilter && selected && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="currentColor"
            />
          </svg>
        )}
        {leadingIcon && !isFilter && leadingIcon}
        <span className="relative z-10">{children}</span>
        {isInput && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className={cn(
              "relative z-10 flex items-center justify-center",
              "size-[18px] rounded-full",
              "hover:bg-foreground/10",
              "transition-colors duration-200"
            )}
          >
            <X weight="bold" className="size-3" />
          </button>
        )}
      </button>
    )
  }
)
Chip.displayName = "Chip"

/**
 * Chip Group container
 */
function ChipGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-group"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

export { Chip, ChipGroup, chipVariants }
