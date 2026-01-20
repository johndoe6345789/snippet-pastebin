import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends ComponentProps<"div"> {
  ratio?: number
}

function AspectRatio({
  ratio = 16 / 9,
  style,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{
        ...style,
        aspectRatio: ratio,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export { AspectRatio }
