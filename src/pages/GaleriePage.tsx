import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import OptimizedImage from '@/components/ui/OptimizedImage'
import ProbetrainingCta from '@/components/sections/ProbetrainingCtaV2'
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, GALERIE_PAGE } from '@/data/content'
import { assetUrl } from '@/lib/assetUrl'
import { useDynamicGalerie } from '@/contexts/ContentContext'
import { BREADCRUMBS } from '@/lib/jsonld'
import { cn } from '@/lib/cn'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov']

function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

/**
 * GaleriePage — Studio-Fotos mit Kategorie-Filter und Lightbox.
 * Lightbox mit Prev/Next-Navigation, Keyboard- und Swipe-Support.
 */
export default function GaleriePage() {
  const GALERIE = useDynamicGalerie()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeKategorie, setActiveKategorie] = useState<string>('Alle')

  // Einzigartige Kategorien aus den Bildern
  const kategorien = ['Alle', ...Array.from(new Set(GALERIE.bilder.map((b) => b.kategorie)))]

  // Gefilterte Bilder
  const gefilterteBilder = activeKategorie === 'Alle'
    ? GALERIE.bilder
    : GALERIE.bilder.filter((b) => b.kategorie === activeKategorie)

  // Lightbox Navigation
  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! + 1) % gefilterteBilder.length)
  }, [lightboxIndex, gefilterteBilder.length])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! - 1 + gefilterteBilder.length) % gefilterteBilder.length)
  }, [lightboxIndex, gefilterteBilder.length])

  // Keyboard Navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, goNext, goPrev])

  // Body Scroll Lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const activeBild = lightboxIndex !== null ? gefilterteBilder[lightboxIndex] : null

  return (
    <>
      <SeoHead
        title={META.galerie.title}
        description={META.galerie.description}
        keywords={META.galerie.keywords}
        pagePath="/galerie/"
        jsonLd={BREADCRUMBS.galerie}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="galerie-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4">{GALERIE_PAGE.sectionBadge}</Badge>
            <h1
              id="galerie-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {GALERIE_PAGE.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {GALERIE_PAGE.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Galerie mit Filter */}
      <section
        className="py-16 md:py-20 bg-brand-bg"
        aria-label="Studio-Galerie"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Kategorie-Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Galerie-Kategorie">
            {kategorien.map((kat) => (
              <button
                key={kat}
                type="button"
                role="tab"
                onClick={() => setActiveKategorie(kat)}
                className={cn(
                  'py-2.5 px-5 rounded-card font-display font-bold text-body transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                  activeKategorie === kat
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-surface text-brand-muted border border-brand-border hover:border-brand-primary hover:text-brand-text'
                )}
                aria-selected={activeKategorie === kat}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Bilder-Grid */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            role="list"
            aria-label="Galerie-Bilder"
          >
            {gefilterteBilder.map((bild, index) => (
              <motion.div
                key={`${bild.src}-${index}`}
                variants={fadeInUp}
                role="listitem"
                className="relative group"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative w-full aspect-[4/3] rounded-card overflow-hidden bg-brand-surface border border-brand-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label={`${isVideo(bild.src) ? 'Video abspielen' : 'Bild vergrößern'}: ${bild.alt}`}
                >
                  {isVideo(bild.src) ? (
                    <video
                      src={assetUrl(bild.src)}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <OptimizedImage
                      src={bild.src}
                      alt={bild.alt}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Hover-Overlay */}
                  <div
                    className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {isVideo(bild.src) ? (
                      <Play className="w-10 h-10 text-white" />
                    ) : (
                      <ZoomIn className="w-7 h-7 text-white" />
                    )}
                  </div>

                  {/* Play-Icon für Videos (immer sichtbar) */}
                  {isVideo(bild.src) && (
                    <div
                      className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300"
                      aria-hidden="true"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Kategorie-Badge */}
                  <div className="absolute bottom-2 left-2" aria-hidden="true">
                    <span className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.15em] text-white bg-brand-dark/70 backdrop-blur-sm rounded-badge px-2.5 py-0.5">
                      {bild.kategorie}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <ProbetrainingCta />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && activeBild && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeBild.alt}
          >
            {/* Bild oder Video */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="initial"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full mx-4 rounded-card-lg overflow-hidden"
            >
              {isVideo(activeBild.src) ? (
                <video
                  src={assetUrl(activeBild.src)}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark"
                />
              ) : (
                <OptimizedImage
                  src={activeBild.src}
                  alt={activeBild.alt}
                  width={1200}
                  height={900}
                  className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark"
                  loading="eager"
                />
              )}

              {/* Info-Leiste unten */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4 flex items-end justify-between">
                <div>
                  <p className="font-body text-body-sm text-brand-light">{activeBild.alt}</p>
                  <span className="font-body text-caption text-brand-light/60">{activeBild.kategorie}</span>
                </div>
                <span className="font-body text-body-sm text-brand-light/80 tabular-nums">
                  {lightboxIndex + 1} / {gefilterteBilder.length}
                </span>
              </div>
            </motion.div>

            {/* Prev-Button */}
            {gefilterteBilder.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next-Button */}
            {gefilterteBilder.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Close-Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Lightbox schließen"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
