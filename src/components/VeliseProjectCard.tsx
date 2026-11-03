import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { veliseAsset } from '../data/velise'

export default function VeliseProjectCard() {
  return (
    <Link to="/works/velise" className="group grid min-w-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#3a1b2b]/90 text-white transition-colors hover:bg-[#44203a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-[1.1fr_1fr] md:rounded-[34px]" aria-label="Explore the VELISE case study">
      <div className="aspect-[3/2] overflow-hidden bg-[#2b1621] md:aspect-auto md:min-h-[300px]">
        <img src={veliseAsset('pack-1600')} alt="VELISE bottle and fig carton on a travertine plinth." width={1600} height={1067} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-6 py-7 sm:p-8 md:p-10">
        <p className="text-xs text-[#e3d6db]">Packaging visualization</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">VELISE</h2>
        <p className="mt-4 max-w-[40ch] text-sm leading-7 text-[#f3eee6]/80">A fragrance pack built in 3D and path traced: glass flacon, resin cap and foil-stamped carton.</p>
        <p className="mt-5 text-xs leading-6 text-[#e3d6db]">Glass / Resin / Board / Turntable / AI hand-off</p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
      </div>
    </Link>
  )
}
