import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cgiAsset, cgiStudies, type CgiStudyId } from '../data/cgiStudies'

export default function CgiProductCard({ studyId }: { studyId: CgiStudyId }) {
  const study = cgiStudies[studyId]
  const theme = studyId === 'still' ? 'bg-[#e9eccf] text-[#243c23] hover:bg-[#e2e7c3]' : 'bg-[#e2e3df] text-[#292f30] hover:bg-[#d9ddd9]'

  return (
    <Link to={study.path} className={`group grid min-w-0 overflow-hidden rounded-[28px] border border-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-[1.1fr_1fr] md:rounded-[34px] ${theme}`} aria-label={`Explore the ${study.name} product case study`}>
      <div className="aspect-[3/2] overflow-hidden md:aspect-auto md:min-h-[340px]">
        <img src={cgiAsset(studyId, 'hero')} alt={study.alt} width={1600} height={1000} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-7 sm:p-8 md:p-10">
        <p className="text-xs opacity-75">{study.category} / Independent concept</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">{study.name}</h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-7 opacity-80">{study.cardDescription}</p>
        <p className="mt-5 text-xs leading-6 opacity-75">{study.tags}</p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
