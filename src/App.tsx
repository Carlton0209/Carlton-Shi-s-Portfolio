import { Routes, Route } from 'react-router-dom'
import { LuxuryLanding } from './components/LuxuryLanding'
import { ResumePage } from './pages/Resume'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LuxuryLanding />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
