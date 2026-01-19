import { ComponentProps, forwardRef, useId, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Material Design 3 Text Field Component
 *
 * Standard input with MD3 styling including:
 * - Filled and outlined variants
 * - Proper focus states with animated indicator
 * - Support for leading/trailing icons
 * - Helper text and error states
 */
function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-14 w-full min-w-0 rounded-t-[4px] rounded-b-none",
        "bg-[hsl(var(--muted))] px-4 pt-5 pb-2",
        "text-base text-foreground",
        "border-0 border-b-2 border-[hsl(var(--border))]",
        "transition-all duration-200",
        "outline-none",
        // Placeholder
        "placeholder:text-muted-foreground placeholder:opacity-0",
        "focus:placeholder:opacity-100",
        // Focus state - MD3 style active indicator
        "focus:border-b-primary focus:bg-[hsl(var(--muted))]/80",
        // File input styles
        "file:text-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Selection
        "selection:bg-primary/30 selection:text-foreground",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.38]",
        // Error state
        "aria-invalid:border-b-destructive aria-invalid:focus:border-b-destructive",
        className
      )}
      {...props}
    />
  )
}

/**
 * MD3 Outlined Text Field
 */
function InputOutlined({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input-outlined"
      className={cn(
        // Base styles
        "flex h-14 w-full min-w-0 rounded-[4px]",
        "bg-transparent px-4 py-4",
        "text-base text-foreground",
        "border border-[hsl(var(--border))]",
        "transition-all duration-200",
        "outline-none",
        // Placeholder
        "placeholder:text-muted-foreground",
        // Focus state
        "focus:border-2 focus:border-primary",
        // Selection
        "selection:bg-primary/30 selection:text-foreground",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.38]",
        // Error state
        "aria-invalid:border-destructive aria-invalid:focus:border-destructive",
        className
      )}
      {...props}
    />
  )
}

/**
 * MD3 Text Field with Floating Label
 */
interface TextFieldProps extends ComponentProps<"input"> {
  label: string
  helperText?: string
  error?: boolean
  errorText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  variant?: "filled" | "outlined"
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorText,
      leadingIcon,
      trailingIcon,
      variant = "filled",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(
      Boolean(props.value || props.defaultValue)
    )

    const isLabelFloating = isFocused || hasValue

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value))
      props.onChange?.(e)
    }

    const isFilled = variant === "filled"

    return (
      <div className={cn("relative w-full", className)}>
        <div
          className={cn(
            "relative flex items-center",
            isFilled
              ? "rounded-t-[4px] rounded-b-none bg-[hsl(var(--muted))]"
              : "rounded-[4px] bg-transparent",
            isFilled
              ? "border-0 border-b-2"
              : "border",
            error
              ? "border-destructive"
              : isFocused
              ? isFilled
                ? "border-b-primary"
                : "border-2 border-primary"
              : "border-[hsl(var(--border))]",
            "transition-all duration-200"
          )}
        >
          {leadingIcon && (
            <span className="pl-3 text-muted-foreground">{leadingIcon}</span>
          )}
          <div className="relative flex-1">
            <input
              ref={ref}
              id={inputId}
              data-slot="text-field"
              className={cn(
                "peer w-full bg-transparent outline-none",
                "h-14 px-4 pt-5 pb-2 text-base text-foreground",
                "placeholder:text-transparent focus:placeholder:text-muted-foreground",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.38]",
                leadingIcon && "pl-2",
                trailingIcon && "pr-2"
              )}
              placeholder={label}
              aria-invalid={error}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...props}
            />
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                "text-muted-foreground",
                isLabelFloating
                  ? "top-2 text-xs"
                  : "top-1/2 -translate-y-1/2 text-base",
                isFocused && !error && "text-primary",
                error && "text-destructive",
                leadingIcon && "left-12"
              )}
            >
              {label}
            </label>
          </div>
          {trailingIcon && (
            <span className="pr-3 text-muted-foreground">{trailingIcon}</span>
          )}
        </div>
        {(helperText || errorText) && (
          <p
            className={cn(
              "mt-1 px-4 text-xs",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error ? errorText : helperText}
          </p>
        )}
      </div>
    )
  }
)
TextField.displayName = "TextField"

export { Input, InputOutlined, TextField }
