import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContentProvider } from '@/contexts/ContentContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/ui/PageLoader'
// HomePage: NICHT lazy — Hauptseite muss sofort laden (kein Code-Split)
import HomePage from '@/pages/HomePage'

// Alle Unterseiten: lazy — eigene Chunks, nur bei Bedarf geladen
const ProbetrainingPage = lazy(() => import('@/pages/ProbetrainingPage'))
const MitgliedschaftPage = lazy(() => import('@/pages/MitgliedschaftPage'))
const KursplanPage = lazy(() => import('@/pages/KursplanPage'))
const TeamPage = lazy(() => import('@/pages/TeamPage'))
const FremdgehAktionPage = lazy(() => import('@/pages/FremdgehAktionPage'))
const FaqPage = lazy(() => import('@/pages/FaqPage'))
const UeberUnsPage = lazy(() => import('@/pages/UeberUnsPage'))
const GaleriePage = lazy(() => import('@/pages/GaleriePage'))
const KontaktPage = lazy(() => import('@/pages/KontaktPage'))
// Legal-Seiten: lazy (selten besucht, minimaler Nutzen beim Preloading)
const ImpressumPage = lazy(() => import('@/pages/ImpressumPage'))
const DatenschutzPage = lazy(() => import('@/pages/DatenschutzPage'))
const AgbPage = lazy(() => import('@/pages/AgbPage'))
const KuendigungPage = lazy(() => import('@/pages/KuendigungPage'))
// Buchungssystem: lazy
const MeinBereichPage = lazy(() => import('@/pages/MeinBereichPage'))
// Trainer-Dashboard: lazy
const TrainerLoginPage = lazy(() => import('@/pages/trainer/TrainerLoginPage'))
const TrainerLayout = lazy(() => import('@/pages/trainer/TrainerLayout'))
const TrainerHeutePage = lazy(() => import('@/pages/trainer/TrainerHeutePage'))
const TrainerWochePage = lazy(() => import('@/pages/trainer/TrainerWochePage'))
const TrainerStatistikenPage = lazy(() => import('@/pages/trainer/TrainerStatistikenPage'))

/**
 * App — Routing-Root der Fitness Factory Website.
 * Alle Seiten teilen das gemeinsame Layout (Nav + Footer + Floating Buttons).
 * Code-Splitting: HomePage eager, alle Unterseiten lazy via React.lazy().
 */
export default function App() {
  return (
    <ContentProvider>
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Website mit Layout (Nav + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/probetraining" element={<ProbetrainingPage />} />
            <Route path="/mitgliedschaft" element={<MitgliedschaftPage />} />
            <Route path="/kursplan" element={<KursplanPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/fremdgeh-aktion" element={<FremdgehAktionPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/ueber-uns" element={<UeberUnsPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/agb" element={<AgbPage />} />
            <Route path="/kuendigung" element={<KuendigungPage />} />
            {/* Buchungssystem */}
            <Route path="/mein-bereich" element={<MeinBereichPage />} />
          </Route>

          {/* Trainer-Dashboard (eigenes Layout, ohne Website-Nav/Footer) */}
          <Route path="/trainer" element={<TrainerLoginPage />} />
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path="heute" element={<TrainerHeutePage />} />
            <Route path="woche" element={<TrainerWochePage />} />
            <Route path="statistiken" element={<TrainerStatistikenPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    </ContentProvider>
  )
}
