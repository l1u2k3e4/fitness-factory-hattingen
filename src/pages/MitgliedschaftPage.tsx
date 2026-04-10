import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Send, CheckCircle, Zap, MessageCircle, Phone } from 'lucide-react'
import {
  Flame, Coffee, Dumbbell, ClipboardList, Apple, ShowerHead, Car, Heart,
} from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { cn } from '@/lib/cn'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_MITGLIEDSCHAFT, PREISE, SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

const leistungsIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame, Coffee, Dumbbell, ClipboardList, Apple, ShowerHead, Car, Heart,
}

/**
 * MitgliedschaftPage — Mitgliedschaft & Preise.
 * Sections:
 * 1. Hero + Tarif-Übersicht (3 Tarife)
 * 2. Leistungsvergleich-Tabelle
 * 3. Fremdgeh-Hinweis
 * 4. Interesse-Formular (KEIN SEPA — M10)
 */
export default function MitgliedschaftPage() {
  const { ref: tarifRef, inView: tarifInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: leistungsRef, inView: leistungsInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: formRef, inView: formInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const [selectedTarif, setSelectedTarif] = useState<string>('Ich bin noch unentschieden')
  const [formState, setFormState] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    nachricht: '',
    datenschutz: false,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (formErrors[name]) setFormErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formState.vorname.trim()) errors.vorname = 'Bitte gib deinen Vornamen an.'
    if (!formState.nachname.trim()) errors.nachname = 'Bitte gib deinen Nachnamen an.'
    if (!formState.email.trim()) {
      errors.email = 'Bitte gib deine E-Mail an.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
    }
    if (!formState.datenschutz) errors.datenschutz = 'Bitte stimme der Datenschutzerklärung zu.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const subject = encodeURIComponent(`Mitgliedschaft-Interesse: ${selectedTarif}`)
    const body = encodeURIComponent(
      `Name: ${formState.vorname} ${formState.nachname}\nE-Mail: ${formState.email}\nTelefon: ${formState.telefon}\nTarif: ${selectedTarif}\n\n${formState.nachricht}`
    )
    window.location.href = `mailto:${SITE.kontakt.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <>
      <SeoHead
        title={META.mitgliedschaft.title}
        description={META.mitgliedschaft.description}
        keywords={META.mitgliedschaft.keywords}
        pagePath="/mitgliedschaft/"
        jsonLd={BREADCRUMBS.mitgliedschaft}
      />

      {/* ================================================================
          BLOCK 1 — Hero + Tarife
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-surface"
        aria-labelledby="mitgliedschaft-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <Badge className="mb-4">{PAGE_MITGLIEDSCHAFT.hero.badge}</Badge>
            <h1
              id="mitgliedschaft-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_MITGLIEDSCHAFT.hero.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[55ch] mx-auto">
              {PAGE_MITGLIEDSCHAFT.hero.subheadline}
            </p>
            <p className="font-body text-body-sm text-brand-primary font-semibold mt-2">
              {PAGE_MITGLIEDSCHAFT.anmeldegebuehrHinweis}
            </p>
          </div>

          {/* Tarif-Cards */}
          <motion.div
            ref={tarifRef}
            variants={staggerContainer}
            initial="initial"
            animate={tarifInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {PREISE.tarife.map((tarif) => (
              <motion.div
                key={tarif.name}
                variants={fadeInUp}
                className={cn(
                  'relative flex flex-col rounded-card-lg p-6 md:p-8 shadow-card',
                  tarif.highlight
                    ? 'bg-brand-bg border-2 border-brand-primary shadow-card-hover'
                    : 'bg-brand-bg border border-brand-border'
                )}
              >
                {tarif.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-t-card-lg" aria-hidden="true" />
                )}
                {tarif.badge && (
                  <div className="absolute -top-3.5 left-6">
                    <Badge variant={tarif.highlight ? 'primary' : 'muted'}>{tarif.badge}</Badge>
                  </div>
                )}

                <div className="mb-5 mt-1">
                  <h2 className="font-display font-black text-h3 text-brand-text mb-1 leading-tight">
                    {tarif.name}
                  </h2>
                  <p className="font-body text-body-sm text-brand-muted">{tarif.laufzeit} Laufzeit</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-end gap-1.5">
                    <span
                      className={cn(
                        'font-display font-black text-display leading-none',
                        tarif.highlight ? 'text-brand-primary' : 'text-brand-text'
                      )}
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {tarif.monatspreis}&nbsp;€
                    </span>
                    <span className="font-body text-body-sm text-brand-muted pb-1">/Monat</span>
                  </div>
                  <p className="font-body text-body-sm text-brand-muted mt-1.5">{tarif.beschreibung}</p>
                </div>

                <ul className="flex flex-col gap-2 mb-8 flex-1" aria-label="Inklusive Leistungen">
                  {tarif.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 text-brand-success" aria-hidden="true" />
                      <span className="font-body text-body-sm text-brand-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  to="/probetraining"
                  variant={tarif.highlight ? 'primary' : 'ghost'}
                  fullWidth
                  aria-label={`${tarif.name}-Tarif — Probetraining buchen`}
                >
                  Probetraining buchen
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 2 — Leistungsvergleich / Alles inklusive
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-bg"
        aria-labelledby="leistungen-vergleich-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2
              id="leistungen-vergleich-headline"
              className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
            >
              {PAGE_MITGLIEDSCHAFT.leistungsumfang.headline}
            </h2>
          </div>

          <motion.div
            ref={leistungsRef}
            variants={staggerContainer}
            initial="initial"
            animate={leistungsInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {PAGE_MITGLIEDSCHAFT.leistungsumfang.items.map((item) => {
              const Icon = leistungsIcons[item.icon] ?? Heart
              return (
                <motion.div
                  key={item.headline}
                  variants={fadeInUp}
                  className="flex gap-4 p-4 bg-brand-surface border border-brand-border rounded-card"
                >
                  <div
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-card bg-green-50 border border-green-200 mt-0.5"
                    aria-hidden="true"
                  >
                    <Icon className="w-4.5 h-4.5 text-brand-success" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-body-sm text-brand-text leading-tight mb-1">
                      {item.headline}
                    </p>
                    <p className="font-body text-caption text-brand-muted leading-relaxed">
                      {item.beschreibung}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 3 — Fremdgeh-Aktion Banner
      ================================================================ */}
      <section
        className="py-10 bg-brand-surface border-y border-brand-border"
        aria-label="Fremdgeh-Aktion"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-brand-primary flex-shrink-0" aria-hidden="true" />
              <p className="font-body text-body text-brand-text">
                {PAGE_MITGLIEDSCHAFT.fremdgehHinweis.text}{' '}
                <span className="text-brand-primary font-semibold">3 Monate für 0&nbsp;€.</span>
              </p>
            </div>
            <Button
              to={PAGE_MITGLIEDSCHAFT.fremdgehHinweis.linkHref}
              variant="ghost"
              aria-label="Zur Fremdgeh-Aktion"
            >
              {PAGE_MITGLIEDSCHAFT.fremdgehHinweis.linkLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          BLOCK 4 — Interesse-Formular (KEIN SEPA — nur Kontaktdaten + Tarif)
      ================================================================ */}
      <section
        className="py-16 md:py-24 bg-brand-bg"
        aria-labelledby="interesse-formular-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={formRef}
            variants={staggerContainer}
            initial="initial"
            animate={formInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Links — Erklärung */}
            <motion.div variants={fadeInLeft}>
              <h2
                id="interesse-formular-headline"
                className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-4"
              >
                {PAGE_MITGLIEDSCHAFT.interesseFormular.headline}
              </h2>
              <p className="font-body text-body-lg text-brand-muted leading-relaxed mb-4">
                {PAGE_MITGLIEDSCHAFT.interesseFormular.subheadline}
              </p>
              <div className="bg-brand-primary-light border border-brand-primary/20 rounded-card p-4 mb-6">
                <p className="font-body text-body-sm text-brand-primary font-medium">
                  {PAGE_MITGLIEDSCHAFT.interesseFormular.hinweis}
                </p>
              </div>

              <p className="font-body text-body-sm text-brand-muted mb-3">Lieber direkt:</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={SITE.kontakt.whatsappLink}
                  variant="whatsapp"
                  icon={MessageCircle}
                  aria-label="Per WhatsApp zur Mitgliedschaft anfragen"
                >
                  WhatsApp
                </Button>
                <Button
                  href={SITE.kontakt.telefonLink}
                  variant="ghost"
                  icon={Phone}
                  aria-label="Anrufen und Mitgliedschaft besprechen"
                >
                  {SITE.kontakt.telefon}
                </Button>
              </div>
            </motion.div>

            {/* Rechts — Formular */}
            <motion.div variants={fadeInRight}>
              <div className="bg-brand-surface border border-brand-border rounded-card-lg p-5 md:p-8 shadow-card">
                {submitted ? (
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-success" aria-hidden="true" />
                    <p className="font-display font-bold text-h4 text-brand-text">
                      {PAGE_MITGLIEDSCHAFT.interesseFormular.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Vorname"
                        name="vorname"
                        id="mitgl-vorname"
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
                        id="mitgl-nachname"
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
                      label="E-Mail"
                      name="email"
                      id="mitgl-email"
                      type="email"
                      placeholder="max@beispiel.de"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      error={formErrors.email}
                    />

                    <Input
                      label="Telefon (optional)"
                      name="telefon"
                      id="mitgl-telefon"
                      type="tel"
                      placeholder="0234 123456"
                      autoComplete="tel"
                      value={formState.telefon}
                      onChange={handleChange}
                    />

                    {/* Tarif-Select */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="mitgl-tarif"
                        className="font-body font-medium text-body-sm text-brand-text"
                      >
                        Welcher Tarif interessiert dich?
                      </label>
                      <select
                        id="mitgl-tarif"
                        name="tarif"
                        value={selectedTarif}
                        onChange={(e) => setSelectedTarif(e.target.value)}
                        className="w-full font-body text-body text-brand-text bg-brand-bg border border-brand-border rounded-input py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-[border-color,box-shadow] duration-150"
                      >
                        {PAGE_MITGLIEDSCHAFT.interesseFormular.felder
                          .find((f) => f.name === 'tarif')
                          ?.optionen?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </div>

                    <Textarea
                      label="Fragen oder Anmerkungen (optional)"
                      name="nachricht"
                      id="mitgl-nachricht"
                      placeholder="Was möchtest du wissen?"
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
                          id="mitgl-datenschutz"
                          required
                          checked={formState.datenschutz}
                          onChange={handleChange}
                          className="mt-0.5 w-4 h-4 flex-shrink-0 rounded accent-brand-primary"
                        />
                        <span className="font-body text-caption text-brand-muted group-hover:text-brand-text transition-colors duration-150 leading-relaxed">
                          {PAGE_MITGLIEDSCHAFT.interesseFormular.datenschutzText}{' '}
                          <Link to="/datenschutz" className="text-brand-primary hover:text-brand-primary-hover underline underline-offset-1">
                            Datenschutzerklärung
                          </Link>
                        </span>
                      </label>
                      {formErrors.datenschutz && (
                        <p role="alert" className="font-body text-caption text-brand-error">
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
                      aria-label="Interesse-Anfrage absenden"
                    >
                      {PAGE_MITGLIEDSCHAFT.interesseFormular.submitLabel}
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
