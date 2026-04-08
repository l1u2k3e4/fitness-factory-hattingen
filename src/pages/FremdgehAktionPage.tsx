import { motion } from 'framer-motion'
import { MessageCircle, Phone, Check, AlertCircle, Zap } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_FREMDGEH, PREISE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * FremdgehAktionPage — Landing-Page für die 3-Monate-Gratis-Aktion.
 * Struktur: Problem → Lösung → Beweis → Angebot → Bedingungen → CTA
 */
export default function FremdgehAktionPage() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: erklaerungRef, inView: erklaerungInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: bedRef, inView: bedInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <>
      <SeoHead
        title={META.fremdgehAktion.title}
        description={META.fremdgehAktion.description}
        keywords={META.fremdgehAktion.keywords}
        pagePath="/fremdgeh-aktion/"
        jsonLd={BREADCRUMBS.fremdgehAktion}
      />

      {/* ================================================================
          BLOCK 1 — Hero / Angebot
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-surface"
        aria-labelledby="fremdgeh-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={heroRef}
            variants={staggerContainer}
            initial="initial"
            animate={heroInView ? 'animate' : 'initial'}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Badge variant="primary">{PAGE_FREMDGEH.hero.badge}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              id="fremdgeh-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_FREMDGEH.hero.headline}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-body-lg text-brand-muted leading-relaxed mb-8 max-w-[55ch] mx-auto"
            >
              {PAGE_FREMDGEH.hero.subheadline}
            </motion.p>

            {/* Preis-Highlight */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex flex-col items-center gap-2 bg-brand-bg border-2 border-brand-primary rounded-card-lg px-8 py-6 mb-8 shadow-card-hover"
            >
              <div className="flex items-end gap-1.5">
                <span
                  className="font-display font-black text-display xl:text-[5rem] text-brand-primary leading-none"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  0&nbsp;€
                </span>
                <span className="font-body text-body-lg text-brand-muted pb-2">/3 Monate</span>
              </div>
              <p className="font-body text-body-sm text-brand-muted">
                + einmalig 49&nbsp;€ Anmeldegebühr
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button
                href={PAGE_FREMDGEH.cta.ctaWhatsApp.href}
                variant="whatsapp"
                size="lg"
                icon={MessageCircle}
                aria-label="Fremdgeh-Aktion per WhatsApp anfragen"
              >
                {PAGE_FREMDGEH.cta.ctaWhatsApp.label}
              </Button>
              <Button
                href={PAGE_FREMDGEH.cta.ctaTelefon.href}
                variant="ghost"
                size="lg"
                icon={Phone}
                aria-label="Anrufen und Fremdgeh-Aktion besprechen"
              >
                {PAGE_FREMDGEH.cta.ctaTelefon.label}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 2 — Was ist die Fremdgeh-Aktion? (Problem → Lösung)
      ================================================================ */}
      <section
        className="py-16 md:py-20 bg-brand-bg"
        aria-labelledby="fremdgeh-erklaerung-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={erklaerungRef}
            variants={staggerContainer}
            initial="initial"
            animate={erklaerungInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Links: Erklärung */}
            <motion.div variants={fadeInLeft}>
              <h2
                id="fremdgeh-erklaerung-headline"
                className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-6"
              >
                {PAGE_FREMDGEH.erklaerung.headline}
              </h2>
              <div className="flex flex-col gap-4">
                <p className="font-body text-body-lg text-brand-muted leading-relaxed">
                  {PAGE_FREMDGEH.erklaerung.absatz1}
                </p>
                <p className="font-body text-body-lg text-brand-text leading-relaxed font-medium">
                  {PAGE_FREMDGEH.erklaerung.absatz2}
                </p>
                <p className="font-body text-body text-brand-muted leading-relaxed">
                  {PAGE_FREMDGEH.erklaerung.absatz3}
                </p>
              </div>
            </motion.div>

            {/* Rechts: Tarif-Vergleich */}
            <motion.div variants={fadeInRight}>
              <div className="bg-brand-surface border border-brand-primary/30 rounded-card-lg p-6 md:p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-brand-primary flex-shrink-0" aria-hidden="true" />
                  <h3 className="font-display font-bold text-h4 text-brand-text leading-tight">
                    {PREISE.fremdgehAktion.name}
                  </h3>
                </div>

                <div className="flex items-end gap-2 mb-2">
                  <span
                    className="font-display font-black text-display text-brand-primary leading-none"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    0&nbsp;€
                  </span>
                  <span className="font-body text-body-sm text-brand-muted pb-1">/3 Monate</span>
                </div>

                <p className="font-body text-body-sm text-brand-muted mb-6">
                  {PREISE.fremdgehAktion.beschreibung}
                </p>

                <ul className="flex flex-col gap-2.5" aria-label="Inklusivleistungen">
                  {['Sauna inklusive', 'Alle Live-Kurse', 'Getränke-Flatrate', 'Trainingsplan', 'Ernährungsberatung', 'Kostenlose Parkplätze'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 text-brand-success" aria-hidden="true" />
                      <span className="font-body text-body-sm text-brand-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 3 — Bedingungen (transparent kommuniziert)
      ================================================================ */}
      <section
        className="py-12 md:py-16 bg-brand-surface"
        aria-labelledby="bedingungen-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={bedRef}
            variants={staggerContainer}
            initial="initial"
            animate={bedInView ? 'animate' : 'initial'}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              id="bedingungen-headline"
              className="font-display font-bold text-h3 text-brand-text leading-tight tracking-tight mb-6 text-center"
            >
              {PAGE_FREMDGEH.bedingungen.headline}
            </motion.h2>

            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-3 mb-6"
              role="list"
              aria-label="Bedingungen der Fremdgeh-Aktion"
            >
              {PAGE_FREMDGEH.bedingungen.items.map((bedingung, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3 bg-brand-bg border border-brand-border rounded-card p-3.5"
                >
                  <Check className="w-4 h-4 flex-shrink-0 text-brand-success mt-0.5" aria-hidden="true" />
                  <span className="font-body text-body-sm text-brand-muted leading-relaxed">
                    {bedingung}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="flex items-start gap-3 bg-brand-primary-light border border-brand-primary/20 rounded-card p-4"
            >
              <AlertCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-body text-body-sm text-brand-muted leading-relaxed">
                {PAGE_FREMDGEH.bedingungen.hinweis}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 4 — CTA (jetzt wechseln)
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-bg"
        aria-labelledby="fremdgeh-cta-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2
            id="fremdgeh-cta-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-4"
          >
            {PAGE_FREMDGEH.cta.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted leading-relaxed mb-8 max-w-[50ch] mx-auto">
            {PAGE_FREMDGEH.cta.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={PAGE_FREMDGEH.cta.ctaWhatsApp.href}
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              aria-label="Per WhatsApp zur Fremdgeh-Aktion anfragen"
            >
              {PAGE_FREMDGEH.cta.ctaWhatsApp.label}
            </Button>
            <Button
              href={PAGE_FREMDGEH.cta.ctaTelefon.href}
              variant="ghost"
              size="lg"
              icon={Phone}
              aria-label="Anrufen und zur Fremdgeh-Aktion informieren"
            >
              {PAGE_FREMDGEH.cta.ctaTelefon.label}
            </Button>
            <Button
              to="/probetraining"
              variant="secondary"
              size="lg"
              aria-label="Erst Probetraining buchen"
            >
              Erst Probetraining buchen
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
