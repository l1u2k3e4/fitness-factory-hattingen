/**
 * Resolves a public asset path with the correct base URL prefix.
 * Ensures images/fonts work on GitHub Pages and other subdirectory deployments.
 *
 * Usage: assetUrl('/images/hero-bg.jpg') → '/fitness-factory-hattingen/images/hero-bg.jpg'
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // BASE_URL always ends with '/' when set in vite config
  return `${base}${cleanPath}`
}
