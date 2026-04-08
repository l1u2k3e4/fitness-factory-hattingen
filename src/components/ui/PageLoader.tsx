/**
 * PageLoader — Minimaler Skeleton-Loader für React.lazy() Suspense-Fallback.
 * Vollbild-Placeholder der erscheint während Unterseiten nachgeladen werden.
 * Hält Layout stabil (kein CLS), zeigt einfache Puls-Animation.
 */
export default function PageLoader() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-brand-dark"
      aria-label="Seite wird geladen"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Puls-Ring in Brand-Orange */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-primary animate-spin" />
        </div>
        <span className="font-body text-caption text-brand-muted-subtle uppercase tracking-[0.15em]">
          Wird geladen…
        </span>
      </div>
    </div>
  )
}
