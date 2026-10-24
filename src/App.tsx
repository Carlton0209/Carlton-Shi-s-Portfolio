import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { DragCursorEffect } from './components/DragCursorEffect'
import { LuxuryLanding } from './components/LuxuryLanding'
import { ResumePage } from './pages/Resume'
import { AigcExhibitionPage, ProductDesignPage, WorksPage } from './pages/Works'
import NotFound from './pages/NotFound'

const OffHoursCaseStudy = lazy(() => import('./pages/OffHoursCaseStudy'))

export default function App() {
  return (
    <>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
