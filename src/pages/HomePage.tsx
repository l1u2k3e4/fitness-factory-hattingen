import SeoHead from '@/lib/seo'
import { META, FAQ } from '@/data/content'
import { makeFaqPageSchema } from '@/lib/jsonld'
import {
  HeroSection,
  TrustBar,
  LeistungenSection,
  PreiseSection,
  ProbetrainingCta,
  TeamSection,
  KursplanPreview,
  GalerieSection,
  TestimonialsSection,
  FaqSection,
  KontaktSection,
} from '@/components/sections'

/**
 * HomePage — Hauptseite der Fitness Factory Website.
 * Section-Reihenfolge aus Anforderungskatalog (Section 3.1):
 * Hero → TrustBar → Leistungen → Preise → ProbetrainingCTA →
 * Team → Kursplan-Preview → Galerie → Testimonials → FAQ → Kontakt
 */
export default function HomePage() {
  const faqSchema = makeFaqPageSchema(FAQ.items)

  return (
    <>
      <SeoHead
        title={META.home.title}
        description={META.home.description}
        keywords={META.home.keywords}
        pagePath="/"
        jsonLd={faqSchema}
      />

      <HeroSection />
      <TrustBar />
      <LeistungenSection />
      <PreiseSection />
      <ProbetrainingCta />
      <TeamSection />
      <KursplanPreview />
      <GalerieSection />
      <TestimonialsSection />
      <FaqSection />
      <KontaktSection />
    </>
  )
}
