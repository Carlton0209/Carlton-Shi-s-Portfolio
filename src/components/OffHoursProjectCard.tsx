import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { offHoursAsset } from '../data/offHours'

export default function OffHoursProjectCard() {
  return (
    <Link to="/works/off-hours" className="group grid min-w-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#183f32]/90 text-white transition-colors hover:bg-[#1c4839] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-[1.1fr_1fr] md:rounded-[34px]" aria-label="Explore the OFF HOURS case study">
      <div className="aspect-[3/2] overflow-hidden bg-[#142d26] md:aspect-auto md:min-h-[300px]">
        <img src={offHoursAsset('daypack-lifestyle-hero')} alt="OFF HOURS daypack worn beside an autumn lake." width={1440} height={960} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-7 sm:p-8 md:p-10">
        <p className="text-xs text-[#d5dcd1]">Featured case study</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">OFF HOURS</h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[#f1eee5]/80">An outdoor product concept, built into a visual campaign and a reusable Figma system.</p>
        <p className="mt-5 text-xs leading-6 text-[#d5dcd1]">Product visuals / Responsive layouts / Interactive prototypes</p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
