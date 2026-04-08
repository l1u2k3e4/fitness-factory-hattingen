import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, Send, CheckCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { SITE, KONTAKT } from '@/data/content'
import { getConsent } from '@/components/layout/CookieConsent'

/**
 * Öffnet die beste verfügbare Navigations-App für die Route zum Studio.
 * iOS → Apple Maps, Android → Google Maps App, Desktop → Google Maps Web
 */
function openRouteNavigation(_?: React.MouseEvent) {
  const destination = encodeURIComponent('Im Vogelsang 95, 45527 Hattingen, Germany')
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)

  if (isIOS) {
    window.open(`maps://maps.apple.com/?daddr=${destination}&dirflg=d`, '_blank')
  } else if (isAndroid) {
    window.open(`google.navigation:q=${destination}`, '_blank')
    setTimeout(() => {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank')
    }, 500)
  } else {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank')
  }
}

/**
 * KontaktSection — Kontaktinfos + Google Maps (Cookie-gated) + Kontaktformular.
 * Weißer Hintergrund, scharfe Ecken, CI-konform.
 */
export default function KontaktSection({ showHeader = true }: { showHeader?: boolean } = {}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [mapsConsented, setMapsConsented] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    nachricht: '',
    datenschutz: false,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const consent = getConsent()
    if (consent && (consent.statistics || consent.marketing)) {
      setMapsConsented(true)
    }
  }, [])

  useEffect(() => {
    const handleConsentChange = () => {
      const consent = getConsent()
      if (consent && (consent.statistics || consent.marketing)) {
        setMapsConsented(true)
      }
    }
    window.addEventListener('cookie-consent-update', handleConsentChange)
    return () => window.removeEventListener('cookie-consent-update', handleConsentChange)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formState.name.trim()) errors.name = 'Bitte gib deinen Namen an.'
    if (!formState.email.trim()) {
      errors.email = 'Bitte gib deine E-Mail-Adresse an.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
    }
    if (!formState.nachricht.trim()) errors.nachricht = 'Bitte schreib uns eine kurze Nachricht.'
    if (!formState.datenschutz) errors.datenschutz = 'Bitte stimme der Datenschutzerklärung zu.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const subject = encodeURIComponent('Anfrage über die Website')
      const body = encodeURIComponent(
        `Name: ${formState.name}\nE-Mail: ${formState.email}\n\n${formState.nachricht}`
      )
      window.location.href = `mailto:${SITE.kontakt.email}?subject=${subject}&body=${body}`
      setSubmitted(true)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="py-16 md:py-24 bg-brand-bg"
      aria-labelledby="kontakt-headline"
      id="kontakt"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        {showHeader && (
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{KONTAKT.sectionBadge}</Badge>
          <h2
            id="kontakt-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {KONTAKT.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {KONTAKT.subheadline}
          </p>
        </div>
        )}

        {/* Split-Layout */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-10"
        >
          {/* Linke Seite: Kontaktdaten */}
          <motion.div variants={fadeInLeft} className="flex flex-col gap-6">
            <ul className="flex flex-col gap-5" aria-label="Kontaktdaten">
              {/* Telefon */}
              <li>
                <a
                  href={SITE.kontakt.telefonLink}
                  className="flex items-start gap-4 group"
                  aria-label={`Telefon: ${SITE.kontakt.telefon}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20" aria-hidden="true">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-muted mb-0.5">Telefon</p>
                    <p className="font-display font-bold text-h4 text-brand-text group-hover:text-brand-primary transition-colors duration-150">
                      {SITE.kontakt.telefon}
                    </p>
                  </div>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={SITE.kontakt.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                  aria-label={`WhatsApp: ${SITE.kontakt.whatsapp}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-green-50 border border-green-200" aria-hidden="true">
                    <MessageCircle className="w-5 h-5 text-brand-whatsapp" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-muted mb-0.5">WhatsApp</p>
                    <p className="font-display font-bold text-h4 text-brand-text group-hover:text-brand-whatsapp transition-colors duration-150">
                      {SITE.kontakt.whatsapp}
                    </p>
                  </div>
                </a>
              </li>

              {/* E-Mail */}
              <li>
                <a
                  href={`mailto:${SITE.kontakt.email}`}
                  className="flex items-start gap-4 group"
                  aria-label={`E-Mail: ${SITE.kontakt.email}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20" aria-hidden="true">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-muted mb-0.5">E-Mail</p>
                    <p className="font-display font-bold text-h4 text-brand-text group-hover:text-brand-primary transition-colors duration-150 break-all">
                      {SITE.kontakt.email}
                    </p>
                  </div>
                </a>
              </li>

              {/* Adresse */}
              <li>
                <a
                  href={SITE.adresse.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                  aria-label={`Adresse: ${SITE.adresse.vollstaendig}`}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20" aria-hidden="true">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-muted mb-0.5">Adresse</p>
                    <p className="font-display font-bold text-h4 text-brand-text group-hover:text-brand-primary transition-colors duration-150">
                      {SITE.adresse.strasse},<br />{SITE.adresse.plz} {SITE.adresse.ort}
                    </p>
                    <p className="font-body text-body-sm text-brand-muted mt-1">
                      {KONTAKT.anfahrtHinweis}
                    </p>
                  </div>
                </a>
              </li>

              {/* Öffnungszeiten */}
              <li>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20" aria-hidden="true">
                    <Clock className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-muted mb-2">Öffnungszeiten</p>
                    <ul className="flex flex-col gap-1.5" aria-label="Öffnungszeiten">
                      {SITE.oeffnungszeiten.items.map((item) => (
                        <li key={item.tag} className="flex items-center gap-4">
                          <span className="font-body font-medium text-body-sm text-brand-text w-40 flex-shrink-0">
                            {item.tag}
                          </span>
                          <span className="font-body text-body-sm text-brand-muted">{item.zeit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

            {/* CTA-Stack */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Button
                href={SITE.kontakt.telefonLink}
                variant="ghost"
                icon={Phone}
                aria-label="Jetzt anrufen"
              >
                Anrufen
              </Button>
              <Button
                href={SITE.kontakt.whatsappLink}
                variant="whatsapp"
                icon={MessageCircle}
                aria-label="WhatsApp schreiben"
              >
                WhatsApp
              </Button>
              <Button
                onClick={openRouteNavigation}
                variant="secondary"
                icon={Navigation}
                aria-label="Route zum Studio planen"
              >
                Route planen
              </Button>
            </div>
          </motion.div>

          {/* Rechte Seite: Google Maps + Kontaktformular */}
          <motion.div variants={fadeInRight} className="flex flex-col gap-6">
            {/* Google Maps (Cookie-gated) */}
            <div
              className="relative rounded-card overflow-hidden border border-brand-border h-[280px] md:h-[320px] bg-brand-surface"
              aria-label="Karte: Fitness Factory Hattingen, Im Vogelsang 95"
            >
              {mapsConsented ? (
                <>
                  <iframe
                    src={SITE.adresse.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Fitness Factory Hattingen auf Google Maps"
                  />
                  {/* Overlay mit Adresse */}
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-bg/95 backdrop-blur-sm border-t border-brand-border px-4 py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display font-bold text-body-sm text-brand-text leading-tight">
                        Fitness Factory Hattingen
                      </p>
                      <p className="font-body text-caption text-brand-muted">
                        Im Vogelsang 95, 45527 Hattingen
                      </p>
                    </div>
                    <a
                      href={SITE.adresse.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 font-body text-caption text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors duration-150"
                    >
                      In Maps öffnen
                    </a>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-6">
                  <MapPin className="w-8 h-8 text-brand-primary" aria-hidden="true" />
                  <div>
                    <p className="font-body font-medium text-body-sm text-brand-text mb-1">
                      Im Vogelsang 95, 45527 Hattingen
                    </p>
                    <p className="font-body text-caption text-brand-muted max-w-[30ch] mx-auto leading-relaxed">
                      Google Maps lädt nach Cookie-Zustimmung.
                    </p>
                  </div>
                  <a
                    href={SITE.adresse.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-body-sm text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors duration-150"
                  >
                    In Google Maps öffnen →
                  </a>
                </div>
              )}
            </div>

            {/* Kontaktformular */}
            <div className="bg-brand-surface border border-brand-border rounded-card-lg p-5 md:p-6">
              <h3 className="font-display font-bold text-h4 text-brand-text mb-1">
                Direkt schreiben
              </h3>
              <p className="font-body text-body-sm text-brand-muted mb-5">
                Wir antworten innerhalb von 24 Stunden.
              </p>

              {submitted ? (
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <CheckCircle className="w-10 h-10 text-brand-success" aria-hidden="true" />
                  <p className="font-body font-medium text-body text-brand-text">
                    Danke für deine Nachricht!
                  </p>
                  <p className="font-body text-body-sm text-brand-muted">
                    Wir melden uns innerhalb von 24 Stunden bei dir.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <Input
                    label="Name"
                    name="name"
                    id="kontakt-name"
                    type="text"
                    placeholder="Dein Name"
                    required
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange}
                    error={formErrors.name}
                  />
                  <Input
                    label="E-Mail"
                    name="email"
                    id="kontakt-email"
                    type="email"
                    placeholder="deine@email.de"
                    required
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    error={formErrors.email}
                  />
                  <Textarea
                    label="Nachricht"
                    name="nachricht"
                    id="kontakt-nachricht"
                    placeholder="Deine Frage oder Nachricht..."
                    required
                    rows={3}
                    value={formState.nachricht}
                    onChange={handleChange}
                    error={formErrors.nachricht}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="datenschutz"
                        id="kontakt-datenschutz"
                        required
                        checked={formState.datenschutz}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 rounded accent-brand-primary"
                        aria-describedby={formErrors.datenschutz ? 'kontakt-datenschutz-error' : undefined}
                      />
                      <span className="font-body text-caption text-brand-muted group-hover:text-brand-text transition-colors duration-150 leading-relaxed">
                        Ich habe die{' '}
                        <a
                          href="/datenschutz"
                          className="text-brand-primary hover:text-brand-primary-hover underline underline-offset-1"
                        >
                          Datenschutzerklärung
                        </a>{' '}
                        gelesen und stimme der Verarbeitung meiner Daten zu.
                      </span>
                    </label>
                    {formErrors.datenschutz && (
                      <p
                        id="kontakt-datenschutz-error"
                        role="alert"
                        className="font-body text-caption text-brand-error"
                      >
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
                    aria-label="Nachricht absenden"
                  >
                    Nachricht senden
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
