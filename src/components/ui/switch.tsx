import { ComponentProps, forwardRef } from 'react'
import styles from './switch.module.scss'
import { cn } from '@/lib/utils'

interface SwitchProps extends Omit<ComponentProps<'input'>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <label className={cn(styles.container, className)}>
      <input
        ref={ref}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
    </label>
  )
)
Switch.displayName = 'Switch'
