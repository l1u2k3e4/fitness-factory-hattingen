import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type TouchEvent as ReactTouchEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { assetUrl } from '@/lib/assetUrl'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useInView } from '@/hooks/useInView'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov']

function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

interface GalerieImage {
  src: string
  alt: string
  kategorie: string
  poster?: string
}

interface CategoryCarouselProps {
  kategorie: string
  images: GalerieImage[]
  onImageClick: (index: number) => void
}

function CategoryCarousel({ kategorie, images, onImageClick }: CategoryCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: '160px 0px 160px 0px',
    once: false,
  })

  useEffect(() => {
    if (!inView || isPaused || reducedMotion || images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [inView, isPaused, reducedMotion, images.length])

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 10000)
  }, [])

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      pauseAutoSlide()
      if (diff > 0) {
        setCurrent((prev) => (prev + 1) % images.length)
      } else {
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
      }
    }
  }

  const bild = images[current]
  const hasRealImage = bild.src && !bild.src.startsWith('[TBD')

  return (
    <div ref={ref} className="mb-10">
      <h3 className="font-display font-black text-h4 text-brand-text mb-3 px-1">
        {kategorie}
      </h3>

      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-card bg-brand-surface border border-brand-border"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={current}
            type="button"
            onClick={() => onImageClick(current)}
            className="absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
            initial={{ opacity: 0, x: reducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : -40 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
            aria-label={`${isVideo(bild.src) ? 'Video öffnen' : 'Bild öffnen'}: ${bild.alt}`}
          >
            {hasRealImage ? (
              isVideo(bild.src) ? (
                <>
                  <video
                    src={assetUrl(bild.src)}
                    poster={bild.poster ? assetUrl(bild.poster) : undefined}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm">
                      <Play className="w-7 h-7 text-white ml-0.5" />
                    </div>
                  </div>
                </>
              ) : (
                <OptimizedImage
                  src={bild.src}
                  alt={bild.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-brand-surface">
                <span className="font-body text-body-sm text-brand-muted">
                  {bild.kategorie}
                </span>
                <span className="font-body text-caption text-brand-muted-subtle">
                  Foto folgt
                </span>
              </div>
            )}
          </motion.button>
        </AnimatePresence>

        {/* Bild-Counter */}
        <div className="absolute top-3 right-3 bg-brand-dark/70 backdrop-blur-sm text-white font-body text-caption px-2 py-1 rounded-badge pointer-events-none tabular-nums">
          {current + 1}/{images.length}
        </div>

        {/* Kategorie-Badge */}
        <div className="absolute bottom-3 left-3 pointer-events-none" aria-hidden="true">
          <span className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.15em] text-white bg-brand-dark/80 backdrop-blur-sm border border-white/20 rounded-badge px-3 py-1">
            {bild.kategorie}
          </span>
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div
          className="flex justify-center gap-1.5 mt-3"
          role="tablist"
          aria-label={`Navigation für Kategorie ${kategorie}`}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Bild ${i + 1} von ${images.length}`}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                i === current ? 'bg-brand-primary w-5' : 'bg-brand-muted/40 w-2'
              }`}
              onClick={() => {
                setCurrent(i)
                pauseAutoSlide()
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface GalerieMobileCarouselProps {
  images: ReadonlyArray<GalerieImage>
}

interface LightboxState {
  kategorie: string
  index: number
}

export default function GalerieMobileCarousel({ images }: GalerieMobileCarouselProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const lbTouchStartX = useRef(0)
  const lbTouchEndX = useRef(0)

  // Gruppieren nach Kategorie — Reihenfolge nach erstem Vorkommen
  const groups: { kategorie: string; bilder: GalerieImage[] }[] = []
  for (const bild of images) {
    const kat = bild.kategorie || 'Sonstige'
    let group = groups.find((g) => g.kategorie === kat)
    if (!group) {
      group = { kategorie: kat, bilder: [] }
      groups.push(group)
    }
    group.bilder.push(bild)
  }

  const lightboxList =
    lightbox ? groups.find((g) => g.kategorie === lightbox.kategorie)?.bilder ?? [] : []
  const activeBild = lightbox ? lightboxList[lightbox.index] : null

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev && lightboxList.length > 0
        ? { ...prev, index: (prev.index + 1) % lightboxList.length }
        : prev
    )
  }, [lightboxList.length])

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev && lightboxList.length > 0
        ? { ...prev, index: (prev.index - 1 + lightboxList.length) % lightboxList.length }
        : prev
    )
  }, [lightboxList.length])

  // Keyboard Navigation
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, goNext, goPrev])

  // Body-Scroll-Lock
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const onLbTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    lbTouchStartX.current = e.touches[0].clientX
  }
  const onLbTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    lbTouchEndX.current = e.changedTouches[0].clientX
    const diff = lbTouchStartX.current - lbTouchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  return (
    <>
      <div>
        {groups.map((g) => (
          <CategoryCarousel
            key={g.kategorie}
            kategorie={g.kategorie}
            images={g.bilder}
            onImageClick={(index) => setLightbox({ kategorie: g.kategorie, index })}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && activeBild && (
          <motion.div
            key="mobile-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={activeBild.alt}
            onClick={closeLightbox}
            onTouchStart={onLbTouchStart}
            onTouchEnd={onLbTouchEnd}
          >
            <div
              className="relative w-full max-w-4xl mx-3"
              onClick={(e) => e.stopPropagation()}
            >
              {activeBild.src && !activeBild.src.startsWith('[TBD') ? (
                isVideo(activeBild.src) ? (
                  <video
                    src={assetUrl(activeBild.src)}
                    poster={activeBild.poster ? assetUrl(activeBild.poster) : undefined}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark-soft rounded-card-lg"
                  />
                ) : (
                  <OptimizedImage
                    src={activeBild.src}
                    alt={activeBild.alt}
                    width={1200}
                    height={900}
                    className="w-full h-auto max-h-[80vh] object-contain bg-brand-dark-soft rounded-card-lg"
                    loading="eager"
                  />
                )
              ) : (
                <div className="aspect-video bg-brand-dark-soft rounded-card-lg flex items-center justify-center">
                  <p className="font-body text-brand-dark-muted">
                    {activeBild.kategorie} — Foto folgt
                  </p>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4 flex items-end justify-end rounded-b-card-lg pointer-events-none">
                <span className="font-body text-body-sm text-brand-light/80 tabular-nums shrink-0">
                  {lightbox.index + 1} / {lightboxList.length}
                </span>
              </div>
            </div>

            {lightboxList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark/60 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-dark/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Lightbox schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
