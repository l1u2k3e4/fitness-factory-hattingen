import SeoHead from '@/lib/seo'
import { SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * DatenschutzPage — Datenschutzerklärung nach DSGVO.
 * noindex, follow — nicht für Suchmaschinen.
 */
export default function DatenschutzPage() {
  return (
    <>
      <SeoHead
        title="Datenschutz | Fitness Factory Hattingen GmbH"
        description="Datenschutzerklärung der Fitness Factory Hattingen GmbH — Informationen nach DSGVO Art. 13."
        pagePath="/datenschutz/"
        noindex
        jsonLd={BREADCRUMBS.datenschutz}
      />

      <section className="py-16 md:py-24 bg-brand-bg min-h-[60vh]" aria-labelledby="datenschutz-headline">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <article className="max-w-2xl">
            <h1
              id="datenschutz-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-10"
            >
              Datenschutz&shy;erklärung
            </h1>

            <div className="flex flex-col gap-8 font-body text-body text-brand-muted leading-relaxed">

              <section aria-labelledby="ds-verantwortliche-headline">
                <h2 id="ds-verantwortliche-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  1. Verantwortliche Stelle
                </h2>
                <address className="not-italic">
                  <p className="font-semibold text-brand-text">{SITE.firmenname}</p>
                  <p>{SITE.adresse.strasse}</p>
                  <p>{SITE.adresse.plz} {SITE.adresse.ort}</p>
                  <p className="mt-2">
                    E-Mail:{' '}
                    <a href={`mailto:${SITE.kontakt.email}`} className="hover:text-brand-primary transition-colors">
                      {SITE.kontakt.email}
                    </a>
                  </p>
                  <p>
                    Telefon:{' '}
                    <a href={SITE.kontakt.telefonLink} className="hover:text-brand-primary transition-colors">
                      {SITE.kontakt.telefon}
                    </a>
                  </p>
                </address>
              </section>

              <section aria-labelledby="ds-erhebung-headline">
                <h2 id="ds-erhebung-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  2. Erhebung und Verarbeitung personenbezogener Daten
                </h2>
                <p>
                  Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen — z.B. durch
                  Ausfüllen unseres Kontaktformulars, eine Buchungsanfrage per E-Mail oder bei Abschluss einer
                  Mitgliedschaft. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6
                  Abs. 1 lit. a DSGVO (Einwilligung bei Kontaktformularen).
                </p>
                <p className="mt-3">
                  Beim Besuch unserer Website werden automatisch technische Informationen vom Browser übermittelt
                  (IP-Adresse, Browsertyp, Referrer). Diese Daten dienen der technischen Bereitstellung der Website
                  und werden nicht personenbezogen ausgewertet.
                </p>
              </section>

              <section aria-labelledby="ds-cookies-headline">
                <h2 id="ds-cookies-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  3. Cookies und Tracking
                </h2>
                <p>
                  Diese Website verwendet Cookies. Notwendige Cookies sind für den Betrieb der Website erforderlich
                  und werden ohne Einwilligung gesetzt. Optionale Cookies (Statistik, Marketing) werden nur nach
                  Ihrer ausdrücklichen Einwilligung gesetzt — Sie können diese im Cookie-Banner verwalten.
                </p>
                <p className="mt-3">
                  Wir setzen Google Analytics (GA4) zur Reichweitenanalyse ein. Die Datenübertragung erfolgt erst
                  nach Ihrer Einwilligung. Wir haben Google Consent Mode v2 implementiert: Vor Ihrer Einwilligung
                  werden keine Tracking-Daten übermittelt. Google Analytics ist gemäß Art. 28 DSGVO auftragsverarbeitet.
                </p>
                <p className="mt-3">
                  Wir setzen den Google Tag Manager (GTM-PQJ82LFT) zur zentralen Tag-Verwaltung ein. GTM selbst
                  speichert keine Cookies; die enthaltenen Tags (GA4, Google Ads, Facebook Pixel) werden nur nach
                  Einwilligung aktiviert.
                </p>
              </section>

              <section aria-labelledby="ds-kontaktformular-headline">
                <h2 id="ds-kontaktformular-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  4. Kontaktformular
                </h2>
                <p>
                  Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden Ihre Angaben zur
                  Bearbeitung Ihrer Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden gelöscht, sobald Ihre Anfrage
                  abschließend bearbeitet ist und keine gesetzliche Aufbewahrungspflicht entgegensteht.
                </p>
              </section>

              <section aria-labelledby="ds-maps-headline">
                <h2 id="ds-maps-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  5. Google Maps
                </h2>
                <p>
                  Auf unserer Kontaktseite binden wir Google Maps ein. Google Maps wird von Google LLC, 1600
                  Amphitheatre Parkway, Mountain View, CA 94043, USA betrieben. Google Maps wird erst nach Ihrer
                  Einwilligung (Statistik- oder Marketing-Cookies) geladen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a
                  DSGVO. Datenschutzerklärung Google:{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                </p>
              </section>

              <section aria-labelledby="ds-rechte-headline">
                <h2 id="ds-rechte-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  6. Ihre Rechte
                </h2>
                <p>Sie haben das Recht auf:</p>
                <ul className="mt-2 ml-4 list-disc flex flex-col gap-1">
                  <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer Daten, sofern keine gesetzliche Aufbewahrungspflicht besteht (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
                </ul>
                <p className="mt-3">
                  Zur Ausübung Ihrer Rechte wenden Sie sich an:{' '}
                  <a href={`mailto:${SITE.kontakt.email}`} className="text-brand-primary hover:underline">
                    {SITE.kontakt.email}
                  </a>
                </p>
                <p className="mt-3">
                  Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständige
                  Aufsichtsbehörde für NRW: Landesbeauftragte für Datenschutz und Informationsfreiheit NRW.
                </p>
              </section>

              <section aria-labelledby="ds-sozialemedien-headline">
                <h2 id="ds-sozialemedien-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  7. Social Media
                </h2>
                <p>
                  Diese Website enthält Links zu unseren Profilen auf Instagram und Facebook. Beim Klick auf die
                  Links werden Daten an die jeweiligen Plattformen übertragen. Wir haben keinen Einfluss auf die
                  Datenverarbeitung durch diese Plattformen. Bitte beachten Sie deren Datenschutzhinweise.
                </p>
              </section>

              <section aria-labelledby="ds-aktualitaet-headline">
                <h2 id="ds-aktualitaet-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  8. Aktualität dieser Datenschutzerklärung
                </h2>
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die
                  Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher oder behördlicher Vorgaben
                  kann es notwendig werden, diese Datenschutzerklärung zu ändern.
                </p>
              </section>

            </div>
          </article>
        </div>
      </section>
    </>
  )
}
