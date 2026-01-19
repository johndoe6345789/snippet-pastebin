"use client"

import { ComponentProps } from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import CheckIcon from "lucide-react/dist/esm/icons/check"
import ChevronRightIcon from "lucide-react/dist/esm/icons/chevron-right"
import CircleIcon from "lucide-react/dist/esm/icons/circle"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Dropdown Menu
 *
 * Android-style menu with:
 * - 48dp minimum touch targets
 * - Proper state layers
 * - Clear focus indicators
 */

function DropdownMenu({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          // MD3 surface container
          "bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))]",
          // Shape and shadow
          "z-50 min-w-[180px] overflow-hidden rounded-lg border-0 p-1",
          "shadow-lg",
          // Constrain height and enable scrolling
          "max-h-[min(var(--radix-dropdown-menu-content-available-height),400px)]",
          "overflow-y-auto",
          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          // Transform origin
          "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // MD3 menu item - minimum 48dp height for touch
        "relative flex items-center gap-3",
        "min-h-[48px] px-3 py-2",
        "text-sm font-normal",
        "rounded-md cursor-pointer select-none outline-none",
        // State layer
        "transition-colors duration-150",
        // Default colors
        "text-[hsl(var(--popover-foreground))]",
        // Hover/focus state
        "hover:bg-[hsl(var(--muted))]",
        "focus:bg-[hsl(var(--muted))]",
        // Destructive variant
        "data-[variant=destructive]:text-destructive",
        "data-[variant=destructive]:hover:bg-destructive/10",
        "data-[variant=destructive]:focus:bg-destructive/10",
        // Disabled state
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.38]",
        // Inset for items without icons
        "data-[inset]:pl-10",
        // Icon styling
        "[&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-[hsl(var(--muted-foreground))]",
        "[&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        // MD3 checkbox item
        "relative flex items-center gap-3",
        "min-h-[48px] pl-10 pr-3 py-2",
        "text-sm font-normal",
        "rounded-md cursor-pointer select-none outline-none",
        "transition-colors duration-150",
        "hover:bg-[hsl(var(--muted))]",
        "focus:bg-[hsl(var(--muted))]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.38]",
        "[&_svg]:size-5 [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-3 flex size-5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-5 text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        // MD3 radio item
        "relative flex items-center gap-3",
        "min-h-[48px] pl-10 pr-3 py-2",
        "text-sm font-normal",
        "rounded-md cursor-pointer select-none outline-none",
        "transition-colors duration-150",
        "hover:bg-[hsl(var(--muted))]",
        "focus:bg-[hsl(var(--muted))]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.38]",
        "[&_svg]:size-5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex size-5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-primary text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        // MD3 label style
        "px-3 py-2 text-xs font-medium uppercase tracking-wider",
        "text-[hsl(var(--muted-foreground))]",
        "data-[inset]:pl-10",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("my-1 h-px bg-[hsl(var(--border))]", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs text-[hsl(var(--muted-foreground))] tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        // MD3 sub-menu trigger
        "relative flex items-center gap-3",
        "min-h-[48px] px-3 py-2",
        "text-sm font-normal",
        "rounded-md cursor-pointer select-none outline-none",
        "transition-colors duration-150",
        "hover:bg-[hsl(var(--muted))]",
        "focus:bg-[hsl(var(--muted))]",
        "data-[state=open]:bg-[hsl(var(--muted))]",
        "data-[inset]:pl-10",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-5 text-[hsl(var(--muted-foreground))]" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        // MD3 sub-menu surface
        "bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))]",
        "z-50 min-w-[180px] overflow-hidden rounded-lg border-0 p-1",
        "shadow-lg",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
