import { createContext, useContext, type ReactNode } from 'react'
import { useContentOverrides } from '@/hooks/useContentOverrides'
import {
  type ContentOverrides,
  getGalerie,
  getKursplan,
  getTestimonials,
  getTeam,
  getHero,
  getBanner,
  getTrustBar,
} from '@/lib/contentLoader'

interface ContentContextValue {
  overrides: ContentOverrides | null
  loading: boolean
}

const ContentContext = createContext<ContentContextValue>({
  overrides: null,
  loading: true,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const { overrides, loading } = useContentOverrides()

  return (
    <ContentContext.Provider value={{ overrides, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

export function useDynamicGalerie() {
  const { overrides } = useContent()
  return getGalerie(overrides)
}

export function useDynamicKursplan() {
  const { overrides } = useContent()
  return getKursplan(overrides)
}

export function useDynamicTestimonials() {
  const { overrides } = useContent()
  return getTestimonials(overrides)
}

export function useDynamicTeam() {
  const { overrides } = useContent()
  return getTeam(overrides)
}

export function useDynamicHero() {
  const { overrides } = useContent()
  return getHero(overrides)
}

export function useDynamicBanner() {
  const { overrides } = useContent()
  return getBanner(overrides)
}

export function useDynamicTrustBar() {
  const { overrides } = useContent()
  return getTrustBar(overrides)
}
