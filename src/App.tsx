import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import Home from './pages/Home'

const ServicesPage = lazy(() => import('./pages/Services'))
const AboutPage = lazy(() => import('./pages/About'))
const FAQPage = lazy(() => import('./pages/FAQ'))
const DevisPage = lazy(() => import('./pages/Devis'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-jackson-night">
    <div className="w-8 h-8 rounded-full border-2 border-jackson-deep border-t-transparent animate-spin" />
  </div>
)

/**
 * react-router ne touche pas au scroll : sans ça, un clic depuis le bas de page
 * ouvre la page suivante à la même hauteur — donc « en bas ».
 * Avec une ancre, on défile jusqu'à la cible une fois la page montée.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    // Les sections sont lazy : on laisse un tour de boucle au montage.
    const id = window.setTimeout(
      () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }),
      120,
    )
    return () => window.clearTimeout(id)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/devis" element={<DevisPage />} />
          {/* Ancienne page de simulation : fusionnée dans le tunnel de devis. */}
          <Route path="/simulateur" element={<Navigate to="/devis" replace />} />
          <Route path="/formulaire" element={<Navigate to="/devis" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
