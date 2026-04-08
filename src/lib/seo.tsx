/**
 * SEO Head Component — Fitness Factory Hattingen
 * Setzt alle relevanten Meta-Tags, OG-Tags, Twitter Cards und JSON-LD.
 * Verwendet react-helmet-style Pattern via native DOM-Manipulation.
 *
 * Daten aus: seo/meta-tags.ts, seo/og-tags.ts, seo/json-ld-schemas.ts
 */

import { useEffect } from 'react'
import type { SeoProps } from '@/types'

const SITE_NAME = 'Fitness Factory Hattingen'
const BASE_URL = 'https://fitness-factory-hattingen.de'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

interface SeoHeadProps extends SeoProps {
  pagePath?: string
  keywords?: string
  ogImageAlt?: string
}

export default function SeoHead({
  title,
  description,
  canonical,
  robots = 'index, follow',
  ogImage,
  jsonLd,
  noindex = false,
  pagePath = '',
  keywords,
  ogImageAlt,
}: SeoHeadProps) {
  const fullTitle = title ?? `${SITE_NAME} | Fitnessstudio Hattingen`
  const canonicalUrl = canonical ?? `${BASE_URL}${pagePath}`
  const ogImageUrl = ogImage ?? `${BASE_URL}${DEFAULT_OG_IMAGE}`
  const robotsContent = noindex ? 'noindex, nofollow' : robots

  useEffect(() => {
    // Title
    document.title = fullTitle

    // Hilfsfunktion: Meta-Tag setzen oder erstellen
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        // Attribut aus Selector extrahieren
        const match = selector.match(/\[(\w+(?:-\w+)*)="([^"]+)"/)
        if (match) {
          el.setAttribute(match[1], match[2])
        }
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Hilfsfunktion: Link-Tag setzen oder erstellen
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Standard Meta
    if (description) setMeta('meta[name="description"]', description)
    setMeta('meta[name="robots"]', robotsContent)
    if (keywords) setMeta('meta[name="keywords"]', keywords)

    // Canonical
    setLink('canonical', canonicalUrl)

    // Open Graph
    setMeta('meta[property="og:type"]', 'website')
    setMeta('meta[property="og:site_name"]', SITE_NAME)
    setMeta('meta[property="og:title"]', fullTitle)
    if (description) setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', canonicalUrl)
    setMeta('meta[property="og:image"]', ogImageUrl)
    setMeta('meta[property="og:image:width"]', '1200')
    setMeta('meta[property="og:image:height"]', '630')
    setMeta('meta[property="og:image:type"]', 'image/jpeg')
    setMeta('meta[property="og:image:alt"]', ogImageAlt ?? fullTitle)
    setMeta('meta[property="og:locale"]', 'de_DE')

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', fullTitle)
    if (description) setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', ogImageUrl)

    // JSON-LD
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      // Vorherige JSON-LD Scripts entfernen (nur dynamische)
      document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach((el) => el.remove())

      schemas.forEach((schema) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-dynamic', 'true')
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      })
    }
  }, [fullTitle, description, canonicalUrl, robotsContent, ogImageUrl, jsonLd, keywords, ogImageAlt])

  return null
}
