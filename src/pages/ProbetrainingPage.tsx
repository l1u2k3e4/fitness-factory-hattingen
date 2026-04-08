import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, CheckCircle, Send, CalendarDays, ClipboardCheck, Dumbbell, Waves } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_PROBETRAINING, SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

// Icons für die 4 Ablauf-Schritte
const schrittIcons = [CalendarDays, ClipboardCheck, Dumbbell, Waves]

/**
 * ProbetrainingPage — Probetraining buchen.
 * 4-Block-Struktur:
 * 1. Hero + Ablauf (4 Schritte)
 * 2. Trainer-Mini-Preview
 * 3. Testimonial eines Neukunden
 * 4. CTA-Stack + Formular
 */
export default function ProbetrainingPage() {
  const { ref: ablaufRef, inView: ablaufInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: formRef, inView: formInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [formState, setFormState] = useState({
    vorname: '',
    nachname: '',
    telefon: '',
    email: '',
    wunschtermin: '',
    nachricht: '',
    datenschutz: false,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (formErrors[name]) {
      setFormErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
    }
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formState.vorname.trim()) errors.vorname = 'Bitte gib deinen Vornamen an.'
    if (!formState.nachname.trim()) errors.nachname = 'Bitte gib deinen Nachnamen an.'
    if (!formState.telefon.trim() && !formState.email.trim()) {
      errors.telefon = 'Bitte gib Telefon oder E-Mail an.'
    }
    if (!formState.datenschutz) errors.datenschutz = 'Bitte stimme der Datenschutzerklärung zu.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const subject = encodeURIComponent('Probetraining-Anfrage über die Website')
    const body = encodeURIComponent(
      `Name: ${formState.vorname} ${formState.nachname}\nTelefon: ${formState.telefon}\nE-Mail: ${formState.email}\nWunschtermin: ${formState.wunschtermin}\n\n${formState.nachricht}`
    )
    window.location.href = `mailto:${SITE.kontakt.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <>
      <SeoHead
        title={META.probetraining.title}
        description={META.probetraining.description}
        keywords={META.probetraining.keywords}
        pagePath="/probetraining/"
        jsonLd={BREADCRUMBS.probetraining}
      />

      {/* ================================================================
          BLOCK 1 — Hero + Ablauf
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-surface"
        aria-labelledby="probetraining-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
            <Badge className="mb-4">{PAGE_PROBETRAINING.hero.badge}</Badge>
            <h1
              id="probetraining-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_PROBETRAINING.hero.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {PAGE_PROBETRAINING.hero.subheadline}
            </p>
          </div>

          {/* Ablauf — 4 Schritte */}
          <motion.div
            ref={ablaufRef}
            variants={staggerContainer}
            initial="initial"
            animate={ablaufInView ? 'animate' : 'initial'}
            className="mb-6"
          >
            <h2 className="font-display font-bold text-h3 text-brand-text text-center mb-8 tracking-tight">
              {PAGE_PROBETRAINING.ablauf.headline}
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              role="list"
              aria-label="Ablauf des Probetrainings"
            >
              {PAGE_PROBETRAINING.ablauf.schritte.map((schritt, index) => {
                const Icon = schrittIcons[index] ?? CalendarDays
                return (
                  <motion.div
                    key={schritt.nummer}
                    variants={fadeInUp}
                    role="listitem"
                    className="relative"
                  >
                    <Card className="h-full flex flex-col">
                      {/* Step Number + Icon */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/25"
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5 text-brand-primary" />
                        </div>
                        <span
                          className="font-display font-black text-h2 text-brand-border leading-none"
                          aria-hidden="true"
                        >
                          {schritt.nummer}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-h4 text-brand-text mb-2 leading-tight">
                        {schritt.titel}
                      </h3>
                      <p className="font-body text-body-sm text-brand-muted leading-relaxed flex-1">
                        {schritt.text}
                      </p>
                    </Card>

                    {/* Connector (nicht beim letzten) */}
                    {index < PAGE_PROBETRAINING.ablauf.schritte.length - 1 && (
                      <div
                        className="hidden lg:block absolute top-[30px] left-[calc(100%+10px)] w-5 h-px bg-brand-border"
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 4 — CTA-Stack + Formular
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-bg"
        aria-labelledby="probetraining-form-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={formRef}
            variants={staggerContainer}
            initial="initial"
            animate={formInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Links — CTA-Stack */}
            <motion.div variants={fadeInLeft}>
              <h2
                id="probetraining-form-headline"
                className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-3"
              >
                {PAGE_PROBETRAINING.cta.headline}
              </h2>
              <p className="font-body text-body-lg text-brand-muted leading-relaxed mb-6">
                {PAGE_PROBETRAINING.cta.subheadline}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <Button
                  href={PAGE_PROBETRAINING.cta.ctaWhatsApp.href}
                  variant="whatsapp"
                  size="lg"
                  icon={MessageCircle}
                  fullWidth
                  aria-label="Probetraining per WhatsApp buchen"
                >
                  {PAGE_PROBETRAINING.cta.ctaWhatsApp.label}
                </Button>
                <Button
                  href={PAGE_PROBETRAINING.cta.ctaTelefon.href}
                  variant="ghost"
                  size="lg"
                  icon={Phone}
                  fullWidth
                  aria-label={PAGE_PROBETRAINING.cta.ctaTelefon.label}
                >
                  {PAGE_PROBETRAINING.cta.ctaTelefon.label}
                </Button>
              </div>

              {/* Öffnungszeiten Box */}
              <div className="bg-brand-surface border border-brand-border rounded-card p-4">
                <p className="font-body font-semibold text-body-sm text-brand-text mb-2">Öffnungszeiten</p>
                <ul className="flex flex-col gap-1.5">
                  {SITE.oeffnungszeiten.items.map((item) => (
                    <li key={item.tag} className="flex items-center gap-4">
                      <span className="font-body text-body-sm text-brand-text w-40 flex-shrink-0">{item.tag}</span>
                      <span className="font-body text-body-sm text-brand-muted">{item.zeit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Rechts — Formular */}
            <motion.div variants={fadeInRight}>
              <div className="bg-brand-surface border border-brand-border rounded-card-lg p-5 md:p-8 shadow-card">
                <h3 className="font-display font-bold text-h3 text-brand-text mb-1 leading-tight">
                  Online anmelden
                </h3>
                <p className="font-body text-body-sm text-brand-muted mb-6">
                  Wir melden uns innerhalb von 24 Stunden.
                </p>

                {submitted ? (
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-success" aria-hidden="true" />
                    <p className="font-display font-bold text-h4 text-brand-text">
                      Anfrage gesendet!
                    </p>
                    <p className="font-body text-body-sm text-brand-muted max-w-[35ch]">
                      Wir melden uns innerhalb von 24 Stunden bei dir, um einen Termin zu vereinbaren.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Vorname"
                        name="vorname"
                        id="probe-vorname"
                        type="text"
                        placeholder="Max"
                        required
                        autoComplete="given-name"
                        value={formState.vorname}
                        onChange={handleChange}
                        error={formErrors.vorname}
                      />
                      <Input
                        label="Nachname"
                        name="nachname"
                        id="probe-nachname"
                        type="text"
                        placeholder="Mustermann"
                        required
                        autoComplete="family-name"
                        value={formState.nachname}
                        onChange={handleChange}
                        error={formErrors.nachname}
                      />
                    </div>

                    <Input
                      label="Telefon"
                      name="telefon"
                      id="probe-telefon"
                      type="tel"
                      placeholder="0234 123456"
                      autoComplete="tel"
                      value={formState.telefon}
                      onChange={handleChange}
                      error={formErrors.telefon}
                      hint="Telefon oder E-Mail angeben — mindestens eins."
                    />

                    <Input
                      label="E-Mail"
                      name="email"
                      id="probe-email"
                      type="email"
                      placeholder="max@beispiel.de"
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      error={formErrors.email}
                    />

                    <Input
                      label="Wunschtermin (optional)"
                      name="wunschtermin"
                      id="probe-termin"
                      type="text"
                      placeholder="z.B. Montag Nachmittag"
                      value={formState.wunschtermin}
                      onChange={handleChange}
                    />

                    <Textarea
                      label="Fragen oder Anmerkungen (optional)"
                      name="nachricht"
                      id="probe-nachricht"
                      placeholder="Gibt es etwas, das wir vorab wissen sollten?"
                      rows={3}
                      value={formState.nachricht}
                      onChange={handleChange}
                    />

                    {/* Datenschutz */}
                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="datenschutz"
                          id="probe-datenschutz"
                          required
                          checked={formState.datenschutz}
                          onChange={handleChange}
                          className="mt-0.5 w-4 h-4 flex-shrink-0 rounded accent-brand-primary"
                          aria-describedby={formErrors.datenschutz ? 'probe-datenschutz-error' : undefined}
                        />
                        <span className="font-body text-caption text-brand-muted group-hover:text-brand-text transition-colors duration-150 leading-relaxed">
                          Ich habe die{' '}
                          <a href="/datenschutz" className="text-brand-primary hover:text-brand-primary-hover underline underline-offset-1">
                            Datenschutzerklärung
                          </a>{' '}
                          gelesen und stimme zu.
                        </span>
                      </label>
                      {formErrors.datenschutz && (
                        <p id="probe-datenschutz-error" role="alert" className="font-body text-caption text-brand-error">
                          {formErrors.datenschutz}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      loading={submitting}
                      icon={Send}
                      iconPosition="right"
                      aria-label="Probetraining-Anfrage absenden"
                    >
                      Probetraining anfragen
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
