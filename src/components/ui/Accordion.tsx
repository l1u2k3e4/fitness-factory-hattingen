import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

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

        {/* Chevron-Icon — CSS-Transform (kein Framer Motion) */}
        <ChevronDown
          className={cn(
            'flex-shrink-0 w-5 h-5 text-brand-muted group-hover:text-brand-primary',
            'transition-[transform,color] duration-200 ease-out',
            isOpen && 'text-brand-primary rotate-180'
          )}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {/* Panel — CSS grid-rows Transition (kein Layout-Thrashing wie height:auto) */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <p className="font-body text-body text-brand-muted leading-relaxed pb-5 pr-8">
            {item.antwort}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Accordion — FAQ-Komponente mit CSS grid-rows Animation (ohne Framer Motion).
 *
 * Accessibility:
 * - button aria-expanded + aria-controls
 * - role="region" + aria-labelledby auf Panel
 * - Keyboard: Tab, Enter, Space
 * - unique IDs per useId()
 *
 * Animation:
 * - CSS: grid-template-rows 0fr → 1fr (kein height:auto Layout-Thrashing)
 * - Chevron: rotate-180 via Tailwind transition-transform
 * - Panel bleibt immer im DOM (kein AnimatePresence-Unmount)
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
