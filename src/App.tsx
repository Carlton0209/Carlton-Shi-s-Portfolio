import { Routes, Route } from 'react-router-dom'
import { DragCursorEffect } from './components/DragCursorEffect'
import { LuxuryLanding } from './components/LuxuryLanding'
import { ResumePage } from './pages/Resume'
import { AigcExhibitionPage, ProductDesignPage, WorksPage } from './pages/Works'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <DragCursorEffect />
      <Routes>
        <Route path="/" element={<LuxuryLanding />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/aigc" element={<AigcExhibitionPage />} />
        <Route path="/works/product-design" element={<ProductDesignPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
