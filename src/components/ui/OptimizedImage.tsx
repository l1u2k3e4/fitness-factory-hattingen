import { assetUrl } from '@/lib/assetUrl'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Optionaler WebP-Pfad — wird auto-generiert wenn nicht angegeben */
  webpSrc?: string
  /** width + height PFLICHT für CLS-Vermeidung */
  width: number
  height: number
}

/**
 * OptimizedImage — <picture> Element mit automatischem WebP-Fallback.
 * Verhindert CLS durch obligatorische width/height Props.
 * WebP wird aus src-Pfad auto-generiert (.jpg/.png → .webp).
 *
 * Auto-Derivation läuft NUR in Production, weil der Vite Dev-Server bei 404
 * eine HTML-Seite ausliefert, die den <picture>-Fallback blockiert.
 * In Production sind alle WebP-Varianten als statische Assets vorhanden.
 *
 * Verwendung:
 *   <OptimizedImage
 *     src="/images/geraete.jpg"
 *     alt="Trainingsgeräte Fitness Factory Hattingen"
 *     width={600} height={450}
 *     loading="lazy"
 *     className="w-full h-full object-cover"
 *   />
 */
export default function OptimizedImage({
  src,
  alt,
  webpSrc,
  width,
  height,
  decoding = 'async',
  ...props
}: OptimizedImageProps) {
  const resolvedSrc = assetUrl(src)

  // WebP-Path automatisch ableiten: .jpg/.jpeg/.png → .webp
  const derivedWebp = src.replace(/\.(jpe?g|png)$/i, '.webp')
  const hasWebpCandidate = derivedWebp !== src

  const resolvedWebp = webpSrc
    ? assetUrl(webpSrc)
    : hasWebpCandidate && import.meta.env.PROD
    ? assetUrl(derivedWebp)
    : undefined

  if (!resolvedWebp) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        decoding={decoding}
        {...props}
      />
    )
  }

  return (
    <picture>
      <source srcSet={resolvedWebp} type="image/webp" />
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        decoding={decoding}
        {...props}
      />
    </picture>
  )
}
