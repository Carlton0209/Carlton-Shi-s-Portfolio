import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { offHoursAsset } from '../data/offHours'

export default function OffHoursProjectCard({ reverse = false }: { reverse?: boolean }) {
  return (
    <Link to="/works/off-hours" className="group grid min-w-0 overflow-hidden bg-[#183f32] text-white transition-colors hover:bg-[#1c4839] md:grid-cols-[1.45fr_1fr]" aria-label="Explore the OFF HOURS case study">
      <div className={`aspect-[3/2] overflow-hidden bg-[#142d26] md:aspect-auto md:min-h-[440px] ${reverse ? 'md:order-2' : ''}`}>
        <img src={offHoursAsset('daypack-lifestyle-hero')} alt="OFF HOURS daypack worn beside an autumn lake." width={1440} height={960} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-8 sm:p-10 md:p-12">
        <h2 className="t-head">OFF HOURS</h2>
        <p className="t-body mt-4 max-w-[40ch] text-[#f1eee5]">The featured case study: an outdoor product concept, built into a visual campaign and a reusable Figma system.</p>
        <p className="t-small mt-4 text-[#d5dcd1]">Product visuals, responsive layouts and interactive prototypes.</p>
        <span className="room-link mt-5 font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
