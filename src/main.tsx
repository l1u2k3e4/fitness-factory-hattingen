import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root nicht gefunden. Überprüfe index.html.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Service Worker registrieren (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW-Registrierung fehlgeschlagen — ignorieren in Dev
    })
  })
}
