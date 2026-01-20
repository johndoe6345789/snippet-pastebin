import { ComponentProps, forwardRef } from "react"

const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={className}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
