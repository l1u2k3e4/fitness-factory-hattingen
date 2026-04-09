import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { assetUrl } from '@/lib/assetUrl'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useDynamicHero } from '@/contexts/ContentContext'

/**
 * HeroSection — Hauptheld der Homepage.
 * Vollbildhöhe mit Hintergrundbild, Headline + CTA above-the-fold.
 * Alle Texte aus HERO (content.ts).
 */
export default function HeroSection() {
  const HERO = useDynamicHero()
  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)]',
        'flex items-center',
        'bg-black overflow-hidden'
      )}
      aria-label="Willkommen bei Fitness Factory Hattingen"
    >
      {/* Hintergrundbild */}
      <img
        src={assetUrl('/images/hero-bg.jpg')}
        alt=""
        width={1920}
        height={1279}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
      />

      {/* Dunkles Overlay */}
      <div
        className="absolute inset-0 bg-black/65"
        aria-hidden="true"
      />

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge>{HERO.badge}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-display-xl text-brand-light leading-none tracking-tight mb-6"
          >
            {HERO.headlineZeile1}<br />
            <span className="text-brand-primary">{HERO.headlineZeile2}</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-body text-body-lg text-brand-light-secondary leading-relaxed mb-8 max-w-[50ch]"
          >
            {HERO.subheadline.split('alles inklusive').map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}<strong className="text-white font-semibold">alles inklusive</strong></span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </motion.p>

          {/* Schnellkennzahlen — nur Desktop */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 hidden md:flex flex-wrap gap-8"
            aria-label="Studio-Kennzahlen"
          >
            {HERO.kennzahlen.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span
                  className="font-display font-black text-h2 text-brand-light leading-none"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {stat.wert}
                </span>
                <span className="font-body text-body-sm text-brand-light-secondary">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs — nur Mobile */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex md:hidden flex-col gap-3"
          >
            <Button to={HERO.ctaPrimary.href} variant="primary" size="lg" fullWidth aria-label={HERO.ctaPrimary.ariaLabel}>
              {HERO.ctaPrimary.label}
            </Button>
            <Button href="tel:+492324337777" variant="dark-outline" size="lg" icon={Phone} fullWidth>
              Jetzt anrufen
            </Button>
          </motion.div>
        </motion.div>
      </div>


    </section>
  )
}
