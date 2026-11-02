import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useLayoutEffect } from 'react'
import { DragCursorEffect } from './components/DragCursorEffect'
import { LuxuryLanding } from './components/LuxuryLanding'
import { ResumePage } from './pages/Resume'
import { AigcExhibitionPage, ProductDesignPage, WorksPage } from './pages/Works'
import NotFound from './pages/NotFound'

const OffHoursCaseStudy = lazy(() => import('./pages/OffHoursCaseStudy'))
const DaymarkEmailCaseStudy = lazy(() => import('./pages/DaymarkEmailCaseStudy'))

// Pages scroll the window, so a new route opens at its top, or at the section its hash names.
// This runs before the page's own layout effects, so its scroll triggers are measured from the right place.
function ScrollToRouteTarget() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToRouteTarget />
      <DragCursorEffect />
      <Routes>
        <Route path="/" element={<LuxuryLanding />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/aigc" element={<AigcExhibitionPage />} />
        <Route path="/works/product-design" element={<ProductDesignPage />} />
        <Route
          path="/works/off-hours"
          element={
            <Suspense fallback={<main className="grid min-h-dvh place-items-center bg-[#f1eee5] text-[#142d26]" role="status">Loading OFF HOURS…</main>}>
              <OffHoursCaseStudy />
            </Suspense>
          }
        />
        <Route path="/resume" element={<ResumePage />} />
        <Route
          path="/works/daymark-email"
          element={
            <Suspense fallback={<main className="grid min-h-dvh place-items-center bg-[#f5f0e7] text-[#1f2a44]" role="status">Loading DAYMARK…</main>}>
              <DaymarkEmailCaseStudy />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
