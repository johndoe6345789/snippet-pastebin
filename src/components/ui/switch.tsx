import { ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<ComponentProps<"input">, "type"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <div className={cn("mat-mdc-slide-toggle", className)}>
      <button type="button" className="mdc-switch" role="switch" aria-checked={checked}>
        <div className="mdc-switch__track" />
        <div className="mdc-switch__handle-track">
          <div className="mdc-switch__handle">
            <div className="mdc-switch__shadow">
              <div className="mdc-elevation-overlay" />
            </div>
            <div className="mdc-switch__ripple" />
          </div>
        </div>
        <input
          ref={ref}
          type="checkbox"
          className="mdc-switch__native-control"
          role="switch"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
      </button>
    </div>
  )
)
Switch.displayName = "Switch"
