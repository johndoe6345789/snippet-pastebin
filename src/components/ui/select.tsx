import { ComponentProps, forwardRef, useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import styles from './select.module.scss'
import { cn } from '@/lib/utils'
import { CaretDown, Check } from '@phosphor-icons/react'

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextValue | null>(null)

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = useState(false)
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  )
}

export const SelectTrigger = forwardRef<HTMLButtonElement, ComponentProps<'button'> & { size?: 'sm' | 'default' }>(
  ({ className, children, size = 'default', ...props }, ref) => {
    const context = useContext(SelectContext)
    
    return (
      <button
        ref={ref}
        className={cn(styles.trigger, size === 'sm' && styles.triggerSm, className)}
        onClick={() => context?.setOpen(!context.open)}
        {...props}
      >
        {children}
        <CaretDown className={styles.icon} />
      </button>
    )
  }
)
SelectTrigger.displayName = 'SelectTrigger'

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = useContext(SelectContext)
  return <span>{context?.value || placeholder}</span>
}

export const SelectContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, position = 'popper', ...props }, ref) => {
    const context = useContext(SelectContext)
    
    if (!context?.open) return null
    
    return createPortal(
      <div className={styles.overlay} onClick={() => context.setOpen(false)}>
        <div 
          ref={ref}
          className={cn(styles.content, className)} 
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    )
  }
)
SelectContent.displayName = 'SelectContent'

export const SelectItem = forwardRef<HTMLDivElement, ComponentProps<'div'> & { value: string }>(
  ({ className, children, value, ...props }, ref) => {
    const context = useContext(SelectContext)
    const isSelected = context?.value === value
    
    return (
      <div
        ref={ref}
        className={cn(styles.item, isSelected && styles.itemSelected, className)}
        onClick={() => {
          context?.onValueChange?.(value)
          context?.setOpen(false)
        }}
        {...props}
      >
        {children}
        {isSelected && <Check className={styles.checkmark} weight="bold" />}
      </div>
    )
  }
)
SelectItem.displayName = 'SelectItem'

export const SelectGroup = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.group, className)} {...props} />
  )
)
SelectGroup.displayName = 'SelectGroup'

export const SelectLabel = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.label, className)} {...props} />
  )
)
SelectLabel.displayName = 'SelectLabel'

export const SelectSeparator = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.separator, className)} {...props} />
  )
)
SelectSeparator.displayName = 'SelectSeparator'

export const SelectScrollUpButton = () => null
export const SelectScrollDownButton = () => null
