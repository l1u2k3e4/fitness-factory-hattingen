import { Link } from 'react-router-dom'
import SeoHead from '@/lib/seo'
import { SITE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * AgbPage — Allgemeine Geschäftsbedingungen.
 * noindex, follow — nicht für Suchmaschinen.
 */
export default function AgbPage() {
  return (
    <>
      <SeoHead
        title="AGB | Fitness Factory Hattingen GmbH"
        description="Allgemeine Geschäftsbedingungen der Fitness Factory Hattingen GmbH."
        pagePath="/agb/"
        noindex
        jsonLd={BREADCRUMBS.agb}
      />

      <section className="py-16 md:py-24 bg-brand-bg min-h-[60vh]" aria-labelledby="agb-headline">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <article className="max-w-2xl">
            <h1
              id="agb-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-10"
            >
              Allgemeine Geschäftsbedingungen
            </h1>

            <div className="flex flex-col gap-8 font-body text-body text-brand-muted leading-relaxed">

              <section aria-labelledby="agb-geltungsbereich-headline">
                <h2 id="agb-geltungsbereich-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §1 Geltungsbereich
                </h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen gelten für alle Mitgliedschaftsverträge zwischen der
                  Fitness Factory Hattingen GmbH (nachfolgend „Studio") und dem Mitglied. Abweichende Bedingungen
                  des Mitglieds werden nicht anerkannt, es sei denn, das Studio hat ihrer Geltung ausdrücklich
                  schriftlich zugestimmt.
                </p>
              </section>

              <section aria-labelledby="agb-mitgliedschaft-headline">
                <h2 id="agb-mitgliedschaft-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §2 Mitgliedschaft und Vertragsschluss
                </h2>
                <p>
                  Der Mitgliedschaftsvertrag kommt durch die schriftliche Annahme des Mitgliedsantrags durch das
                  Studio oder durch tatsächliche Leistungserbringung zustande. Das Mitglied muss bei Vertragsschluss
                  mindestens 18 Jahre alt sein; bei Minderjährigen ist die Zustimmung eines Erziehungsberechtigten
                  erforderlich.
                </p>
              </section>

              <section aria-labelledby="agb-tarife-headline">
                <h2 id="agb-tarife-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §3 Tarife und Laufzeiten
                </h2>
                <p>Die aktuellen Mitgliedschaftstarife sind:</p>
                <ul className="mt-2 ml-4 list-disc flex flex-col gap-1">
                  <li><strong className="text-brand-text">Flex:</strong> 55,00 €/Monat, Laufzeit 1 Monat, monatlich kündbar</li>
                  <li><strong className="text-brand-text">Standard:</strong> 45,00 €/Monat, Laufzeit 12 Monate</li>
                  <li><strong className="text-brand-text">Premium:</strong> 35,00 €/Monat, Laufzeit 24 Monate</li>
                </ul>
                <p className="mt-3">
                  Zuzüglich fällt einmalig eine Anmeldegebühr von 49,00 € an. Nach Ablauf der Mindestlaufzeit
                  verlängert sich der Vertrag automatisch um jeweils einen weiteren Monat.
                </p>
              </section>

              <section aria-labelledby="agb-leistungen-headline">
                <h2 id="agb-leistungen-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §4 Leistungen des Studios
                </h2>
                <p>
                  In der Mitgliedschaft enthalten sind die Nutzung aller Trainingsgeräte, alle Live-Kurse laut
                  aktuellem Kursplan, Saunanutzung, Getränke-Flatrate, kostenlose Duschen und Parkplätze sowie
                  Ernährungsberatung und ein individueller Trainingsplan. Das Studio behält sich das Recht vor,
                  einzelne Leistungen bei Bedarf zu ändern, vorausgesetzt, der Gesamtcharakter der Mitgliedschaft
                  bleibt erhalten.
                </p>
              </section>

              <section aria-labelledby="agb-zahlung-headline">
                <h2 id="agb-zahlung-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §5 Zahlungsbedingungen
                </h2>
                <p>
                  Der monatliche Mitgliedsbeitrag ist im Voraus fällig und wird zum 1. eines jeden Monats per
                  SEPA-Lastschrift eingezogen. Kommt das Mitglied in Zahlungsverzug, ist das Studio berechtigt,
                  Mahngebühren in Höhe der gesetzlich zulässigen Verzugszinsen zu berechnen sowie die Nutzung
                  bis zum Ausgleich des Rückstands zu sperren.
                </p>
              </section>

              <section aria-labelledby="agb-kuendigung-headline">
                <h2 id="agb-kuendigung-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §6 Kündigung
                </h2>
                <p>
                  Die Kündigung muss schriftlich erfolgen (Brief, E-Mail oder persönlich vor Ort). Für den
                  Flex-Tarif gilt eine Kündigungsfrist von einem Monat zum Monatsende. Für Standard- und
                  Premium-Tarife gilt: Kündigung zum Ende der Mindestlaufzeit mit einer Frist von einem Monat;
                  danach monatlich kündbar. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
                  bleibt unberührt.
                </p>
              </section>

              <section aria-labelledby="agb-nutzung-headline">
                <h2 id="agb-nutzung-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §7 Nutzungsregeln
                </h2>
                <p>
                  Das Mitglied ist verpflichtet, die Hausordnung des Studios zu beachten. Die Mitgliedschaft ist
                  nicht übertragbar. Bei grob vertragswidrigem Verhalten behält sich das Studio das Recht zur
                  fristlosen Kündigung vor.
                </p>
              </section>

              <section aria-labelledby="agb-haftung-headline">
                <h2 id="agb-haftung-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §8 Haftung
                </h2>
                <p>
                  Das Studio haftet nicht für Schäden an eingebrachten Gegenständen, soweit diese nicht auf
                  vorsätzlichem oder grob fahrlässigem Handeln des Studios oder seiner Mitarbeiter beruhen.
                  Das Mitglied trainiert auf eigene Verantwortung und ist verpflichtet, seinen Gesundheitszustand
                  vor Aufnahme des Trainings ärztlich abklären zu lassen, sofern Zweifel bestehen.
                </p>
              </section>

              <section aria-labelledby="agb-datenschutz-headline">
                <h2 id="agb-datenschutz-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §9 Datenschutz
                </h2>
                <p>
                  Die im Rahmen der Mitgliedschaft erhobenen personenbezogenen Daten werden ausschließlich zur
                  Vertragsabwicklung verwendet. Details zur Datenverarbeitung finden Sie in unserer{' '}
                  <Link to="/datenschutz" className="text-brand-primary hover:underline">Datenschutzerklärung</Link>.
                </p>
              </section>

              <section aria-labelledby="agb-schlussbestimmungen-headline">
                <h2 id="agb-schlussbestimmungen-headline" className="font-display font-bold text-h3 text-brand-text mb-3">
                  §10 Schlussbestimmungen
                </h2>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus dem
                  Vertragsverhältnis ist, soweit gesetzlich zulässig, Hattingen. Sollten einzelne Bestimmungen
                  dieser AGB unwirksam sein, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
                </p>
                <p className="mt-3">
                  {SITE.firmenname}, {SITE.adresse.strasse}, {SITE.adresse.plz} {SITE.adresse.ort}
                </p>
                <p className="mt-1 text-brand-muted-subtle text-caption">Stand: April 2026</p>
              </section>

            </div>
          </article>
        </div>
      </section>
    </>
  )
}
