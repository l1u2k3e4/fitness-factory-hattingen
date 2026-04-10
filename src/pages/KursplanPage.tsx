import { useState } from 'react'
import { motion } from 'framer-motion'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_KURSPLAN } from '@/data/content'
import { useDynamicKursplan } from '@/contexts/ContentContext'
import { BREADCRUMBS } from '@/lib/jsonld'
import { cn } from '@/lib/cn'

// Wochentage für Tab-Navigation
const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
const WOCHENTAGE_KURZ = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

// Kurstypen für Dropdown-Filter
const KURS_TYPEN = ['Alle Kurse', 'Yoga', 'Spinning', 'Tabata', 'Zumba', 'Tae-Bo', 'Rücken-Fit', 'Pilates', 'Bauch-Express', 'Full Body Intervall', 'Wirbelsäulen-Gymnastik']

// Aktuellen Wochentag ermitteln (0=Sonntag, 1=Montag, ...)
function getHeuteTag(): string {
  const jsDay = new Date().getDay()
  // JS: 0=So, 1=Mo, ..., 6=Sa → Mapping auf unsere Wochentage
  const mapping = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
  return mapping[jsDay]
}

function kursMatchesTyp(kursName: string, typ: string): boolean {
  if (typ === 'Alle Kurse') return true
  return kursName.toLowerCase().includes(typ.toLowerCase())
}

/**
 * KursplanPage — Vollständige interaktive Kursübersicht.
 * Filter nach Wochentag und Kurstyp.
 * Kursbeschreibungen aus PAGE_KURSPLAN.kurseBeschreibungen.
 */
export default function KursplanPage() {
  const KURSPLAN = useDynamicKursplan()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const [filterTag, setFilterTag] = useState<string>(getHeuteTag())
  const [filterTyp, setFilterTyp] = useState<string>('Alle Kurse')

  // Wochenplan: dynamisch aus Overrides oder Default
  const wochenplan = KURSPLAN.kurse

  // Alle anzeigen oder einzelnen Tag
  const alleAnzeigen = filterTag === 'Alle'

  // Gefilterte Wochentage
  const gefilterteTage = wochenplan.filter((tag) => {
    if (!alleAnzeigen && tag.tag !== filterTag) return false
    if (filterTyp !== 'Alle Kurse') {
      return tag.items.some((item) => kursMatchesTyp(item.name, filterTyp))
    }
    return true
  })

  return (
    <>
      <SeoHead
        title={META.kursplan.title}
        description={META.kursplan.description}
        keywords={META.kursplan.keywords}
        pagePath="/kursplan/"
        jsonLd={BREADCRUMBS.kursplan}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="kursplan-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4">{PAGE_KURSPLAN.hero.badge}</Badge>
            <h1
              id="kursplan-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_KURSPLAN.hero.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed">
              {PAGE_KURSPLAN.hero.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Kursplan Hauptbereich */}
      <section
        className="pb-16 md:pb-24 bg-brand-surface"
        aria-label="Wöchentlicher Kursplan"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Filter-Bereich */}
          <div className="sticky top-[64px] md:top-[72px] z-20 bg-brand-surface border-b border-brand-border py-4 mb-8">
            {/* Wochentag-Tabs */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4" role="tablist" aria-label="Wochentag wählen">
              <button
                type="button"
                role="tab"
                onClick={() => setFilterTag('Alle')}
                className={cn(
                  'py-3 px-2 rounded-card font-display font-bold text-body transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                  filterTag === 'Alle'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-bg text-brand-muted border border-brand-border hover:border-brand-primary hover:text-brand-text'
                )}
                aria-selected={filterTag === 'Alle'}
              >
                Alle
              </button>
              {WOCHENTAGE.map((tag, i) => {
                const istHeute = tag === getHeuteTag()
                return (
                  <button
                    key={tag}
                    type="button"
                    role="tab"
                    onClick={() => setFilterTag(tag)}
                    className={cn(
                      'py-3 px-2 rounded-card font-display font-bold text-body transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                      filterTag === tag
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-brand-bg text-brand-muted border border-brand-border hover:border-brand-primary hover:text-brand-text'
                    )}
                    aria-selected={filterTag === tag}
                  >
                    <span className="md:hidden">{WOCHENTAGE_KURZ[i]}</span>
                    <span className="hidden md:inline">{tag}</span>
                    {istHeute && (
                      <span className="block text-caption font-body font-normal mt-0.5 opacity-75">
                        Heute
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Kurstyp-Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="kurstyp-filter" className="font-body font-medium text-body text-brand-text whitespace-nowrap">
                Kurstyp:
              </label>
              <select
                id="kurstyp-filter"
                value={filterTyp}
                onChange={(e) => setFilterTyp(e.target.value)}
                className="w-full md:w-auto min-w-[200px] py-3 px-4 font-body text-body text-brand-text bg-brand-bg border border-brand-border rounded-card appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {KURS_TYPEN.map((typ) => (
                  <option key={typ} value={typ}>{typ}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Wochenplan-Grid */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className={cn(
              'grid gap-4 md:gap-5',
              alleAnzeigen
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-2xl mx-auto'
            )}
          >
            {gefilterteTage.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="font-body text-body-lg text-brand-muted">
                  Keine Kurse gefunden. Filter anpassen.
                </p>
              </div>
            ) : (
              gefilterteTage.map((tag) => {
                // Items nach Typ filtern
                const items = filterTyp === 'Alle Kurse'
                  ? tag.items
                  : tag.items.filter((item) => kursMatchesTyp(item.name, filterTyp))

                if (items.length === 0) return null

                return (
                  <motion.div
                    key={tag.tag}
                    variants={fadeInUp}
                    className="bg-brand-bg border border-brand-border rounded-card-lg overflow-hidden shadow-card"
                  >
                    {/* Tag-Header */}
                    <div className="bg-brand-surface border-b border-brand-border px-4 py-3">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display font-black text-h4 text-brand-text leading-tight">
                          {tag.tag}
                        </h2>
                        <span className="font-display font-bold text-h3 text-brand-border leading-none" aria-hidden="true">
                          {tag.tagKurz}
                        </span>
                      </div>
                    </div>

                    {/* Kurs-Items */}
                    <ul className="divide-y divide-brand-border" aria-label={`Kurse am ${tag.tag}`}>
                      {items.length === 0 ? (
                        <li className="px-4 py-5 text-center">
                          <p className="font-body text-body-sm text-brand-muted italic">
                            Keine Kurse an diesem Tag
                          </p>
                        </li>
                      ) : (
                        items.map((kurs, kIdx) => (
                          <li key={`${kurs.name}-${kIdx}`} className="px-4 py-3.5">
                            <div className="mb-1.5">
                              <h3 className="font-body font-semibold text-body-sm text-brand-text leading-tight">
                                {kurs.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-3 font-body text-caption text-brand-muted">
                              <span>
                                {kurs.uhrzeit.startsWith('[TBD') ? 'Uhrzeit auf Anfrage' : kurs.uhrzeit}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {kurs.dauer.startsWith('[TBD') ? 'Dauer auf Anfrage' : kurs.dauer}
                              </span>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                )
              })
            )}
          </motion.div>

          {/* Hinweis */}
          <p className="text-center font-body text-body-sm text-brand-muted mt-8">
            {PAGE_KURSPLAN.hinweis}
          </p>
        </div>
      </section>

      {/* Kursbeschreibungen */}
      <section
        className="py-16 md:py-24 bg-brand-bg"
        aria-labelledby="kurs-beschreibungen-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2
            id="kurs-beschreibungen-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-10 md:mb-14 text-center"
          >
            Was dich in unseren Kursen erwartet
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {PAGE_KURSPLAN.kurseBeschreibungen.map((kurs) => (
              <div
                key={kurs.name}
                className="flex flex-col gap-2 bg-brand-surface border border-brand-border rounded-card p-4 md:p-5"
              >
                <div>
                  <h3 className="font-display font-bold text-h4 text-brand-text leading-tight">
                    {kurs.name}
                  </h3>
                </div>
                <p className="font-body text-body-sm text-brand-muted leading-relaxed">
                  {kurs.beschreibung}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              to={PAGE_KURSPLAN.ctaHref}
              variant="primary"
              aria-label="Probetraining buchen und Kurse kennenlernen"
            >
              {PAGE_KURSPLAN.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Hinweis-Banner */}
      <div className="bg-brand-surface border-t border-brand-border py-4">
        <p className="text-center font-body text-body-sm text-brand-muted max-w-2xl mx-auto px-4">
          Alle Kurse sind in jeder Mitgliedschaft enthalten — kein Aufpreis.
        </p>
      </div>
    </>
  )
}
