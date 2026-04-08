import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { useDynamicKursplan } from '@/contexts/ContentContext'

const defaultVorschau = [
  { tag: 'Mo', kurse: ['Vinyasa-Yoga', 'Spinning', 'Wirbelsäulen-Gym'] },
  { tag: 'Di', kurse: ['Bauch-Express', 'Spinning'] },
  { tag: 'Mi', kurse: ['Tabata', 'Yoga'] },
  { tag: 'Do', kurse: ['Tae-Bo', 'Spinning'] },
  { tag: 'Fr', kurse: ['Rücken-Fit', 'Zumba'] },
  { tag: 'So', kurse: ['Spinning', 'Full Body', 'Pilates'] },
]

/**
 * KursplanPreview — Kursplan-Vorschau auf der Homepage.
 * PROMPT 2.6: Volle interaktive Kursplan-Ansicht.
 */
export default function KursplanPreview() {
  const KURSPLAN = useDynamicKursplan()
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="kursplan" className="py-16 md:py-24 bg-brand-surface" aria-labelledby="kursplan-preview-headline">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <Badge className="mb-4">Kurse</Badge>
            <h2
              id="kursplan-preview-headline"
              className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
            >
              10+ Live-Kurse.<br />Jede Woche.
            </h2>
          </div>
          <Button to="/kursplan" variant="ghost">Kompletter Kursplan</Button>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {/* Dynamische Vorschau aus Kursplan-Overrides oder statischer Default */}
          {(KURSPLAN.kurse
            ? [...KURSPLAN.kurse]
                .filter(t => ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Sonntag'].includes(t.tag))
                .map(t => ({
                  tag: t.tagKurz,
                  kurse: t.items.map(i => i.name),
                }))
            : defaultVorschau
          ).map((tag) => (
            <motion.div
              key={tag.tag}
              variants={fadeInUp}
              className="bg-brand-bg border border-brand-border rounded-card p-4 shadow-card"
            >
              <p className="font-display font-black text-h4 text-brand-primary mb-3">{tag.tag}</p>
              <ul className="flex flex-col gap-1.5">
                {tag.kurse.map((kurs) => (
                  <li key={kurs} className="font-body text-caption text-brand-muted leading-tight">
                    {kurs}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
