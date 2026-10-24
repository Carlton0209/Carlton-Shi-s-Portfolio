import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

export default function DaymarkProjectCard() {
  return (
    <Link to="/works/daymark-email" className="group grid min-w-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#f5f0e7] text-[#1f2a44] transition-colors hover:bg-[#f0eadf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-[1.1fr_1fr] md:rounded-[34px]" aria-label="Explore the DAYMARK email design case study">
      <div className="aspect-[4/3] overflow-hidden bg-[#e7ecf9] md:aspect-auto md:min-h-[340px]">
        <img src={withBase('images/daymark/email-overview.webp')} alt="Three coordinated DAYMARK coffee emails: Welcome, Product spotlight and Preference reset." width={1600} height={1250} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-7 sm:p-8 md:p-10">
        <p className="text-xs text-[#586271]">Email design / Independent concept</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">DAYMARK</h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[#465166]">A coffee brand’s welcome journey, from Figma modules to responsive HTML emails.</p>
        <p className="mt-5 text-xs leading-6 text-[#586271]">Lifecycle storytelling / Mobile adaptation / HTML handoff</p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
