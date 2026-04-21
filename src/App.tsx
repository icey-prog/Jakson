import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'

const ServicesPage = lazy(() => import('./pages/Services'))
const AboutPage = lazy(() => import('./pages/About'))
const FAQPage = lazy(() => import('./pages/FAQ'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-jackson-night">
    <div className="w-8 h-8 rounded-full border-2 border-jackson-deep border-t-transparent animate-spin" />
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Suspense>
  )
}
