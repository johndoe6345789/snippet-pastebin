import { ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "filled" | "outlined" | "outline" | "text" | "elevated" | "tonal" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "default", children, asChild, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"

    const variantClass = {
      filled: "mat-mdc-unelevated-button",
      outlined: "mat-mdc-outlined-button",
      outline: "mat-mdc-outlined-button",
      text: "mat-mdc-button",
      elevated: "mat-mdc-raised-button",
      tonal: "mat-tonal-button",
      secondary: "mat-mdc-button",
      destructive: "mat-mdc-unelevated-button",
      ghost: "mat-mdc-button",
      link: "mat-mdc-button",
    }[variant]

    const sizeClass = {
      default: "h-10 px-4",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    }[size]

    const variantStyles = {
      filled: "bg-blue-600 hover:bg-blue-700 text-white",
      outlined: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
      outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
      text: "hover:bg-gray-100 dark:hover:bg-gray-900",
      elevated: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white shadow-md",
      tonal: "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white",
      secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-white",
      link: "text-blue-600 dark:text-blue-400 hover:underline",
    }[variant]

    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          sizeClass,
          variantStyles,
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export const buttonVariants = () => "" // Stub for compatibility
