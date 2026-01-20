import { ComponentProps, ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface CollapsibleProps extends ComponentProps<"div"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

function Collapsible({
  open,
  onOpenChange,
  defaultOpen = false,
  children,
  className,
  ...props
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const actualOpen = open !== undefined ? open : isOpen

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <div
      data-slot="collapsible"
      data-state={actualOpen ? "open" : "closed"}
      className={cn("w-full", className)}
      {...props}
    >
      {typeof children === "function"
        ? children({ open: actualOpen, onOpenChange: handleOpenChange })
        : children}
    </div>
  )
}

function CollapsibleTrigger({
  onClick,
  children,
  className,
  asChild = false,
  ...props
}: ComponentProps<"button"> & { children?: ReactNode; asChild?: boolean }) {
  const Comp = asChild ? "div" : "button"

  return (
    <Comp
      data-slot="collapsible-trigger"
      className={cn(
        "mat-mdc-button",
        "flex items-center justify-between w-full",
        "px-3 py-2 rounded-md",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "transition-colors",
        asChild && "cursor-pointer",
        className
      )}
      onClick={asChild ? undefined : onClick}
      {...props}
    >
      {children}
    </Comp>
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden transition-all duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:collapse",
        className
      )}
      {...props}
    >
      <div className="px-3 py-2">
        {children}
      </div>
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
