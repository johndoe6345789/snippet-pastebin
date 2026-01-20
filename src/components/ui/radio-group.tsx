import { ComponentProps, forwardRef, createContext, useContext } from 'react'
import styles from './radio-group.module.scss'
import { cn } from '@/lib/utils'
import { Circle } from '@phosphor-icons/react'

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

interface RadioGroupProps extends ComponentProps<'div'> {
  value?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn(styles.group, className)} role="radiogroup" {...props} />
    </RadioGroupContext.Provider>
  )
)
RadioGroup.displayName = 'RadioGroup'

export const RadioGroupItem = forwardRef<HTMLInputElement, ComponentProps<'input'> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(RadioGroupContext)
    const isChecked = context?.value === value
    
    return (
      <label className={cn(styles.item, className)}>
        <input
          ref={ref}
          type="radio"
          className={styles.input}
          checked={isChecked}
          onChange={() => context?.onValueChange?.(value)}
          {...props}
        />
        <span className={styles.indicator}>
          {isChecked && <Circle className={styles.icon} weight="fill" />}
        </span>
      </label>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'
