import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"

type Md3Variant = "default" | "tonal" | "elevated" | "outline" | "text"
type Md3Size = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"

const variantClass: Record<Md3Variant, string> = {
  default: "mdc-button mdc-button--filled",
  tonal: "mdc-button mdc-button--filled-tonal",
  elevated: "mdc-button mdc-button--elevated",
  outline: "mdc-button mdc-button--outlined",
  text: "mdc-button mdc-button--text",
}

const sizeClass: Record<Md3Size, string> = {
  default: "",
  sm: "mdc-button--small",
  lg: "mdc-button--large",
  icon: "mdc-button--icon",
  "icon-sm": "mdc-button--icon mdc-button--small",
  "icon-lg": "mdc-button--icon mdc-button--large",
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: Md3Variant
  size?: Md3Size
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "button"
  const classes = [variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ")

  return (
    <Comp className={classes} {...props}>
      <span className="mdc-button__ripple" />
      <span className="mdc-button__focus-ring" />
      <span className="mdc-button__label">{children}</span>
    </Comp>
  )
}

export { Button }
