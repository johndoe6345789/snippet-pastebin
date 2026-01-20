import { ComponentProps, forwardRef } from 'react'
import styles from './checkbox.module.scss'
import { cn } from '@/lib/utils'
import { Check, Minus } from '@phosphor-icons/react'

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, indeterminate, ...props }, ref) => (
    <label className={cn(styles.container, className)}>
      <input
        ref={ref}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <span className={styles.indicator}>
        {indeterminate ? (
          <Minus className={styles.icon} weight="bold" />
        ) : checked ? (
          <Check className={styles.icon} weight="bold" />
        ) : null}
      </span>
    </label>
  )
)
Checkbox.displayName = 'Checkbox'
