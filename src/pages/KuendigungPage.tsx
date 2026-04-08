import SeoHead from '@/lib/seo'
import { SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'
import Badge from '@/components/ui/Badge'

/**
 * KuendigungPage — Kündigungsinformationen.
 * PROMPT 2.7: Vollständige Kündigungs-Seite mit Formular oder Kontaktinfos.
 */
export default function KuendigungPage() {
  return (
    <>
      <SeoHead
        title="Kündigung | Fitness Factory Hattingen GmbH"
        description="Informationen zur Kündigung deiner Mitgliedschaft bei Fitness Factory Hattingen."
        pagePath="/kuendigung/"
        noindex
        jsonLd={BREADCRUMBS.kuendigung}
      />

      <section className="py-16 md:py-24 bg-brand-bg min-h-[60vh]" aria-labelledby="kuendigung-headline">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-xl">
            <Badge variant="muted" className="mb-4">Kündigung</Badge>
            <h1
              id="kuendigung-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              Mitgliedschaft kündigen
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed mb-8">
              Wir sind traurig, dich gehen zu sehen. Für deine Kündigung wende dich bitte direkt an uns:
            </p>

            <address className="not-italic font-body text-body text-brand-muted leading-relaxed">
              <p className="font-semibold text-brand-text mb-2">{SITE.firmenname}</p>
              <p>{SITE.adresse.strasse}</p>
              <p>{SITE.adresse.plz} {SITE.adresse.ort}</p>
              <p className="mt-3">
                Telefon:{' '}
                <a href={SITE.kontakt.telefonLink} className="text-brand-primary hover:text-brand-primary-hover transition-colors">
                  {SITE.kontakt.telefon}
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a href={`mailto:${SITE.kontakt.email}`} className="text-brand-primary hover:text-brand-primary-hover transition-colors">
                  {SITE.kontakt.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>
    </>
  )
}
