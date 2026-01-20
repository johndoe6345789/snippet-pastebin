import { ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends ComponentProps<"div"> {
  value?: number
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mat-mdc-progress-bar", "mdc-linear-progress", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      {...props}
    >
      <div className="mdc-linear-progress__buffer">
        <div className="mdc-linear-progress__buffer-bar" />
        <div className="mdc-linear-progress__buffer-dots" />
      </div>
      <div 
        className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
        style={{ transform: `scaleX(${value / 100})` }}
      >
        <span className="mdc-linear-progress__bar-inner" />
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span className="mdc-linear-progress__bar-inner" />
      </div>
    </div>
  )
)
Progress.displayName = "Progress"
