import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { accordionContent } from '@/lib/animations'

interface AccordionItem {
  frage: string
  antwort: string
}

interface AccordionProps {
  items: readonly AccordionItem[]
  /** Mehrere Items gleichzeitig öffnen? Default: false (nur eins auf einmal) */
  multiple?: boolean
  className?: string
}

interface SingleAccordionItemProps {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  headingId: string
  panelId: string
  index: number
  isLast: boolean
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
  headingId,
  panelId,
  isLast,
}: SingleAccordionItemProps) {
  return (
    <div
      className={cn(
        'group',
        !isLast && 'border-b border-brand-border'
      )}
    >
      {/* Trigger-Button */}
      <button
        type="button"
        id={headingId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between gap-4',
          'py-5 text-left',
          'font-body font-medium text-body text-brand-text',
          'hover:text-brand-primary',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          isOpen && 'text-brand-primary'
        )}
      >
        <span className="flex-1 pr-2">{item.frage}</span>

        {/* Chevron-Icon — rotiert bei open */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            'flex-shrink-0 w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors duration-150',
            isOpen && 'text-brand-primary'
          )}
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.75} />
        </motion.span>
      </button>

      {/* Panel mit AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={panelId}
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            variants={accordionContent}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            <p className="font-body text-body text-brand-muted leading-relaxed pb-5 pr-8">
              {item.antwort}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Accordion — FAQ-Komponente mit AnimatePresence height-Animation.
 *
 * Accessibility:
 * - button aria-expanded + aria-controls
 * - role="region" + aria-labelledby auf Panel
 * - Keyboard: Tab, Enter, Space
 * - unique IDs per useId()
 *
 * Animation:
 * - Framer Motion height: 0 → auto (accordionContent variant)
 * - Chevron-Rotation 0° → 180°
 * - GPU-only: opacity + height (layout triggering aber notwendig für Accordion)
 */
export default function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())
  const uid = useId()

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!multiple) next.clear()
        next.add(index)
      }
      return next
    })
  }

  return (
    <div
      className={cn('w-full', className)}
      role="list"
    >
      {items.map((item, index) => (
        <AccordionItemComponent
          key={`${uid}-${index}`}
          item={item}
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
          headingId={`${uid}-heading-${index}`}
          panelId={`${uid}-panel-${index}`}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  )
}
