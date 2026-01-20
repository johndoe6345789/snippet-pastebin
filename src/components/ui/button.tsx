import { ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "filled" | "outlined" | "text" | "elevated" | "tonal"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "default", children, asChild, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    
    const variantClass = {
      filled: "mat-mdc-unelevated-button",
      outlined: "mat-mdc-outlined-button",
      text: "mat-mdc-button",
      elevated: "mat-mdc-raised-button",
      tonal: "mat-tonal-button",
    }[variant]
    
    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={cn("mdc-button", "mat-mdc-button-base", variantClass, className)}
        {...props}
      >
        <span className="mat-mdc-button-persistent-ripple" />
        <span className="mdc-button__label">{children}</span>
        <span className="mat-mdc-focus-indicator" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export const buttonVariants = () => "" // Stub for compatibility
