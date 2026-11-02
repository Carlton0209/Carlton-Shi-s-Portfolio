import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

export default function DaymarkProjectCard({ reverse = false }: { reverse?: boolean }) {
  return (
    <Link to="/works/daymark-email" className="group grid min-w-0 overflow-hidden bg-[#f5f0e7] text-[#1f2a44] transition-colors hover:bg-[#f0eadf] md:grid-cols-[1.45fr_1fr]" aria-label="Explore the DAYMARK email design case study">
      <div className={`aspect-[4/3] overflow-hidden bg-[#e7ecf9] md:aspect-auto md:min-h-[440px] ${reverse ? 'md:order-2' : ''}`}>
        <img src={withBase('images/daymark/email-overview.webp')} alt="Three coordinated DAYMARK coffee emails: Welcome, Product spotlight and Preference reset." width={1600} height={1250} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-8 sm:p-10 md:p-12">
        <h2 className="t-head">DAYMARK</h2>
        <p className="t-body mt-4 max-w-[40ch] text-[#2c3650]">An independent email design concept: a coffee brand’s welcome journey, from Figma modules to responsive HTML emails.</p>
        <p className="t-small mt-4 text-[#465166]">Lifecycle storytelling, mobile adaptation and HTML handoff.</p>
        <span className="room-link mt-5 font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
