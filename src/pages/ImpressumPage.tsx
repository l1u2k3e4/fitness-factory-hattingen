import SeoHead from '@/lib/seo'
import { SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * ImpressumPage — Pflichtangaben nach §5 TMG.
 * noindex, follow — nicht für Suchmaschinen, aber Breadcrumb für internen Kontext.
 */
export default function ImpressumPage() {
  return (
    <>
      <SeoHead
        title="Impressum | Fitness Factory Hattingen GmbH"
        description="Impressum der Fitness Factory Hattingen GmbH — Pflichtangaben nach §5 TMG."
        pagePath="/impressum/"
        noindex
        jsonLd={BREADCRUMBS.impressum}
      />

      <section className="py-16 md:py-24 bg-brand-bg min-h-[60vh]" aria-labelledby="impressum-headline">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <article className="max-w-2xl">
            <h1
              id="impressum-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-10"
            >
              Impressum
            </h1>

            <div className="flex flex-col gap-8 font-body text-body text-brand-muted leading-relaxed">

              <section aria-labelledby="angaben-headline">
                <h2 id="angaben-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Angaben gemäß §5 TMG
                </h2>
                <address className="not-italic">
                  <p className="font-semibold text-brand-text">{SITE.firmenname}</p>
                  <p>{SITE.adresse.strasse}</p>
                  <p>{SITE.adresse.plz} {SITE.adresse.ort}</p>
                </address>
              </section>

              <section aria-labelledby="vertreten-headline">
                <h2 id="vertreten-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Vertreten durch
                </h2>
                <p>Geschäftsführer: Alexander Stöcker</p>
              </section>

              <section aria-labelledby="register-headline">
                <h2 id="register-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Registereintrag
                </h2>
                <dl className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <dt className="font-medium text-brand-text min-w-[160px]">Registergericht:</dt>
                    <dd>Amtsgericht Bochum</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-brand-text min-w-[160px]">Registernummer:</dt>
                    <dd>HRB 29213</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-brand-text min-w-[160px]">USt-IdNr.:</dt>
                    <dd>DE319398653</dd>
                  </div>
                </dl>
              </section>

              <section aria-labelledby="kontakt-impressum-headline">
                <h2 id="kontakt-impressum-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Kontakt
                </h2>
                <dl className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <dt className="font-medium text-brand-text min-w-[80px]">Telefon:</dt>
                    <dd>
                      <a href={SITE.kontakt.telefonLink} className="hover:text-brand-primary transition-colors">
                        {SITE.kontakt.telefon}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-brand-text min-w-[80px]">E-Mail:</dt>
                    <dd>
                      <a href={`mailto:${SITE.kontakt.email}`} className="hover:text-brand-primary transition-colors">
                        {SITE.kontakt.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </section>

              <section aria-labelledby="haftung-inhalte-headline">
                <h2 id="haftung-inhalte-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Haftung für Inhalte
                </h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-3">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                  der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section aria-labelledby="haftung-links-headline">
                <h2 id="haftung-links-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Haftung für Links
                </h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                  der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mt-3">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                  derartige Links umgehend entfernen.
                </p>
              </section>

              <section aria-labelledby="urheberrecht-headline">
                <h2 id="urheberrecht-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  Urheberrecht
                </h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                  deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                  außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                  bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet.
                </p>
                <p className="mt-3">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                  Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                  Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </section>

            </div>
          </article>
        </div>
      </section>
    </>
  )
}
