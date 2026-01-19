import { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Card Component
 *
 * Variants:
 * - elevated: Default card with shadow (MD3 Elevated Card)
 * - filled: Card with tonal surface color (MD3 Filled Card)
 * - outlined: Card with outline border (MD3 Outlined Card)
 */
const cardVariants = cva(
  // Base styles
  [
    "flex flex-col gap-4 rounded-xl text-card-foreground",
    "transition-all duration-200",
    "relative overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: {
        // MD3 Elevated Card - default surface with shadow
        elevated: [
          "bg-card shadow-md",
          "hover:shadow-lg",
        ].join(" "),

        // MD3 Filled Card - surface container color, no shadow
        filled: [
          "bg-secondary/50",
        ].join(" "),

        // MD3 Outlined Card - transparent with border
        outlined: [
          "bg-card border border-border",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "elevated",
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4 pt-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base font-medium leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 pb-2", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-4 pb-4 pt-2 [.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * MD3 Card Media - for images/videos at top of card
 */
function CardMedia({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "relative -mx-0 -mt-0 overflow-hidden rounded-t-xl",
        "aspect-video bg-muted",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardMedia,
  cardVariants,
}
