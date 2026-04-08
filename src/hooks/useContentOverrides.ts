import { useState, useEffect } from 'react'
import { loadOverrides, type ContentOverrides } from '@/lib/contentLoader'

/**
 * React Hook: Lädt content-overrides.json einmalig beim Mount.
 * Gibt { overrides, loading } zurück.
 */
export function useContentOverrides() {
  const [overrides, setOverrides] = useState<ContentOverrides | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOverrides()
      .then(setOverrides)
      .finally(() => setLoading(false))
  }, [])

  return { overrides, loading }
}
