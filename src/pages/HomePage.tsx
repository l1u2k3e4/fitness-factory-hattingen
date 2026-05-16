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
 * Section-Reihenfolge:
 * Hero → TrustBar → Leistungen → Kursplan-Preview → Preise → ProbetrainingCTA →
 * Team → Galerie → Testimonials → FAQ → Kontakt
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
      <KursplanPreview />
      <PreiseSection />
      <ProbetrainingCta />
      <TeamSection />
      <GalerieSection />
      <TestimonialsSection />
      <FaqSection />
      <KontaktSection />
    </>
  )
}
