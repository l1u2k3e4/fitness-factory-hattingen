import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Play } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { assetUrl } from '@/lib/assetUrl'
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { useDynamicGalerie } from '@/contexts/ContentContext'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov']

function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

/**
 * GalerieSection — Studio-Foto-Galerie.
 * Weißer Hintergrund, scharfe Ecken, Lightbox bei Klick.
 */
export default function GalerieSection() {
  const GALERIE = useDynamicGalerie()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const activeBild = lightboxIndex !== null ? GALERIE.bilder[lightboxIndex] : null

  return (
    <section
      id="galerie"
      className="py-16 md:py-24 bg-brand-bg"
      aria-labelledby="galerie-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{GALERIE.sectionBadge}</Badge>
          <h2
            id="galerie-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {GALERIE.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {GALERIE.subheadline}
          </p>
        </div>

        {/* Galerie-Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          role="list"
          aria-label="Galerie — Fitness Factory Hattingen"
        >
          {GALERIE.bilder.map((bild, index) => {
            const hasRealImage = bild.src && !bild.src.startsWith('[TBD')
            return (
              <motion.div
                key={index}
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
                  {hasRealImage ? (
                    isVideo(bild.src) ? (
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
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-brand-surface">
                      <div
                        className="w-14 h-14 rounded-card bg-brand-primary-light border border-brand-primary/20 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="font-display font-black text-h4 text-brand-primary/50">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="font-body text-body-sm text-brand-muted text-center px-4">
                        {bild.kategorie}
                      </p>
                      <p className="font-body text-caption text-brand-muted-subtle">
                        Foto folgt
                      </p>
                    </div>
                  )}

                  {/* Hover-Overlay */}
                  <div
                    className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {isVideo(bild.src) ? (
                      <Play className="w-10 h-10 text-white" />
                    ) : (
                      <ZoomIn className="w-8 h-8 text-white" />
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
                  <div className="absolute bottom-3 left-3" aria-hidden="true">
                    <span className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.15em] text-white bg-brand-dark/80 backdrop-blur-sm border border-white/20 rounded-badge px-3 py-1">
                      {bild.kategorie}
                    </span>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center font-body text-caption text-brand-muted mt-6"
        >
          Komm vorbei — der beste Eindruck entsteht live.
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && activeBild && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeBild.alt}
          >
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="initial"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-card-lg overflow-hidden border border-brand-dark-border shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            >
              {activeBild.src && !activeBild.src.startsWith('[TBD') ? (
                isVideo(activeBild.src) ? (
                  <video
                    src={assetUrl(activeBild.src)}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark-soft"
                  />
                ) : (
                  <OptimizedImage
                    src={activeBild.src}
                    alt={activeBild.alt}
                    width={1200}
                    height={900}
                    className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark-soft"
                    loading="eager"
                  />
                )
              ) : (
                <div className="aspect-video bg-brand-dark-soft flex items-center justify-center">
                  <p className="font-body text-brand-dark-muted">{activeBild.kategorie} — Foto folgt</p>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4">
                <p className="font-body text-body-sm text-brand-light">{activeBild.alt}</p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-card bg-brand-dark/80 backdrop-blur-sm border border-brand-dark-border text-brand-dark-muted hover:text-brand-light transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Lightbox schließen"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
