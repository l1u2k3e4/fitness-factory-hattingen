import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import { SITE } from '@/data/content'
import { assetUrl } from '@/lib/assetUrl'

/**
 * Footer — Vollständiger Website-Footer.
 * Enthält: Kontakt, Navigation, Öffnungszeiten, Social, Legal-Links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-brand-dark-soft border-t border-brand-dark-border mt-auto"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Spalte 1: Brand + Kontakt */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
              aria-label="Fitness Factory Hattingen — Startseite"
            >
              <img
                src={assetUrl('/images/logo-fitness-factory.png')}
                alt="Fitness Factory Hattingen"
                className="h-12 w-auto"
                width={160}
                height={48}
              />
            </Link>
            <p className="font-body text-body-sm text-brand-muted leading-relaxed mb-5 max-w-[32ch]">
              Dein Fitnessstudio in Hattingen — familiär, fair und alles inklusive.
            </p>

            <ul className="flex flex-col gap-3" aria-label="Kontaktdaten">
              <li>
                <a
                  href={SITE.kontakt.telefonLink}
                  className="flex items-center gap-2 text-brand-muted hover:text-brand-light text-body-sm font-body transition-colors duration-150"
                  aria-label={`Telefon: ${SITE.kontakt.telefon}`}
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-brand-primary" aria-hidden="true" />
                  {SITE.kontakt.telefon}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.kontakt.email}`}
                  className="flex items-center gap-2 text-brand-muted hover:text-brand-light text-body-sm font-body transition-colors duration-150"
                  aria-label={`E-Mail: ${SITE.kontakt.email}`}
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-brand-primary" aria-hidden="true" />
                  {SITE.kontakt.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.adresse.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-brand-muted hover:text-brand-light text-body-sm font-body transition-colors duration-150"
                  aria-label={`Adresse: ${SITE.adresse.vollstaendig}`}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 text-brand-primary mt-0.5" aria-hidden="true" />
                  <span>{SITE.adresse.strasse}<br />{SITE.adresse.plz} {SITE.adresse.ort}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 2: Öffnungszeiten */}
          <div>
            <h3 className="font-body font-semibold text-body-sm text-brand-light uppercase tracking-[0.1em] mb-4">
              Öffnungszeiten
            </h3>
            <ul className="flex flex-col gap-2" aria-label="Öffnungszeiten">
              {SITE.oeffnungszeiten.items.map((item) => (
                <li key={item.tag} className="flex flex-col gap-0.5">
                  <span className="font-body font-medium text-body-sm text-brand-light">{item.tag}</span>
                  <span className="font-body text-body-sm text-brand-muted">{item.zeit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Navigation */}
          <div>
            <h3 className="font-body font-semibold text-body-sm text-brand-light uppercase tracking-[0.1em] mb-4">
              Studio
            </h3>
            <ul className="flex flex-col gap-2.5" aria-label="Studio-Navigation">
              {[
                { label: 'Mitgliedschaft & Preise', href: '/mitgliedschaft' },
                { label: 'Kursplan', href: '/kursplan' },
                { label: 'Unser Team', href: '/team' },
                { label: 'Fremdgeh-Aktion', href: '/fremdgeh-aktion' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Probetraining buchen', href: '/probetraining' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-body-sm text-brand-muted hover:text-brand-light transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 4: Social + Legal */}
          <div>
            <h3 className="font-body font-semibold text-body-sm text-brand-light uppercase tracking-[0.1em] mb-4">
              Folge uns
            </h3>
            <div className="flex items-center gap-3 mb-8">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-dark border border-brand-dark-border text-brand-muted hover:text-brand-light hover:border-brand-primary/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Instagram: @fitness.factory.hattingen"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-dark border border-brand-dark-border text-brand-muted hover:text-brand-light hover:border-brand-primary/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Facebook: Fitness Factory Hattingen"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <h3 className="font-body font-semibold text-body-sm text-brand-light uppercase tracking-[0.1em] mb-3">
              Rechtliches
            </h3>
            <ul className="flex flex-col gap-2" aria-label="Rechtliche Links">
              {[
                { label: 'Impressum', href: '/impressum' },
                { label: 'Datenschutz', href: '/datenschutz' },
                { label: 'AGB', href: '/agb' },
                { label: 'Kündigung', href: '/kuendigung' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-body-sm text-brand-muted hover:text-brand-light transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-brand-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-caption text-brand-muted-subtle text-center sm:text-left">
            © {currentYear} {SITE.firmenname}. Alle Rechte vorbehalten.
          </p>
          <p className="font-body text-caption text-brand-muted-subtle">
            {SITE.adresse.vollstaendig}
          </p>
        </div>
      </div>
    </footer>
  )
}
