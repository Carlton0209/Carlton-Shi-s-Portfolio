import { Routes, Route } from 'react-router-dom'
import { DragCursorEffect } from './components/DragCursorEffect'
import { LuxuryLanding } from './components/LuxuryLanding'
import { ProjectDetail } from './pages/ProjectDetail'
import { ResumePage } from './pages/Resume'
import { WorksPage } from './pages/Works'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <DragCursorEffect />
      <Routes>
        <Route path="/" element={<LuxuryLanding />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:id" element={<ProjectDetail />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
