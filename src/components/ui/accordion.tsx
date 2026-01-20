import { ComponentProps, forwardRef, useState, createContext, useContext } from 'react'
import styles from './accordion.module.scss'
import { cn } from '@/lib/utils'
import { CaretDown } from '@phosphor-icons/react'

interface AccordionContextValue {
  openItems: Set<string>
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

interface AccordionProps extends ComponentProps<'div'> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

export function Accordion({ 
  type = 'single', 
  defaultValue,
  children, 
  className,
  ...props 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set()
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
  })
  
  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (type === 'single') {
          next.clear()
        }
        next.add(value)
      }
      return next
    })
  }
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn(styles.accordion, className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export const AccordionItem = forwardRef<HTMLDivElement, ComponentProps<'div'> & { value: string }>(
  ({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn(styles.item, className)} data-value={value} {...props} />
  )
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps extends ComponentProps<'button'> {
  value?: string
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AccordionContext)
    const item = (ref as any)?.current?.closest('[data-value]')
    const value = item?.getAttribute('data-value') || ''
    const isOpen = context?.openItems.has(value)
    
    return (
      <button 
        ref={ref} 
        className={cn(styles.trigger, className)} 
        onClick={() => context?.toggleItem(value)}
        {...props}
      >
        {children}
        <CaretDown className={cn(styles.icon, isOpen && styles.iconOpen)} weight="bold" />
      </button>
    )
  }
)
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AccordionContext)
    const item = (ref as any)?.current?.closest('[data-value]')
    const value = item?.getAttribute('data-value') || ''
    const isOpen = context?.openItems.has(value)
    
    return (
      <div 
        ref={ref} 
        className={cn(styles.content, !isOpen && styles.contentClosed, className)} 
        {...props}
      >
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = 'AccordionContent'
