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
  ...props
}: OptimizedImageProps) {
  // Nur <picture> mit WebP verwenden wenn explizit ein webpSrc übergeben wurde.
  // Auto-Derivation entfernt, da keine WebP-Dateien vorhanden sind und
  // Vite-Dev-Server bei 404 eine HTML-Seite zurückgibt, die den Fallback blockiert.
  const resolvedSrc = assetUrl(src)
  const resolvedWebp = webpSrc ? assetUrl(webpSrc) : undefined

  if (!resolvedWebp) {
    return <img src={resolvedSrc} alt={alt} width={width} height={height} {...props} />
  }

  return (
    <picture>
      <source srcSet={resolvedWebp} type="image/webp" />
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    </picture>
  )
}
