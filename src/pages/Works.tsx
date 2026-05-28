import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Film, Monitor, Sparkle, Wand2 } from 'lucide-react'
import { withBase } from '../lib/asset'

type WorkCategory = 'All' | 'Film' | 'AI Visuals' | 'Web Products' | '3D & Post'

type WorkItem = {
  title: string
  category: Exclude<WorkCategory, 'All'>
  summary: string
  image: string
  href: string
  year: string
}

const categories: WorkCategory[] = ['All', 'Film', 'AI Visuals', 'Web Products', '3D & Post']

const works: WorkItem[] = [
  {
    title: 'One-day Migration',
    category: 'Film',
    summary: 'Narrative short film about movement, belonging, and urban rhythm.',
    image: 'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
    href: 'https://filmfreeway.com/One-dayMigration',
    year: '2026',
  },
  {
    title: 'AI Generated Images',
    category: 'AI Visuals',
    summary: 'Commercial image-generation workflow for consistent visual direction.',
    image: withBase('images/clearcat-processed-image-2.png'),
    href: 'https://carltonshi0209.my.canva.site/aigc',
    year: '2026',
  },
  {
    title: 'AI Generated Videos',
    category: 'AI Visuals',
    summary: 'Generated video pipeline shaped with restoration, upscaling, and post.',
    image: withBase('images/uiaosdyhulaksjhd.jpg'),
    href: 'https://carltonshi0209.my.canva.site/aigc',
    year: '2026',
  },
  {
    title: 'REALLIFE AI',
    category: 'Web Products',
    summary: 'A cinematic portrait enhancer built around realism and a clean flow.',
    image: withBase('images/reallife-ai-preview.jpg'),
    href: 'https://reallife-ai-eib5.vercel.app/',
    year: '2026',
  },
  {
    title: 'LINEAGE',
    category: 'Web Products',
    summary: 'The homepage for LINEAGE, designed as a direct first screen for the project.',
    image: withBase('images/lineage-homepage.png'),
    href: 'https://web-oj1ikahn5-carlton0209s-projects.vercel.app/',
    year: '2026',
  },
  {
    title: 'Films and 3D Modeling',
    category: '3D & Post',
    summary: 'Film craft, CG, post-production, and 3D work across production tools.',
    image: withBase('images/img.png'),
    href: 'https://carltonshi0209.my.canva.site',
    year: '2026',
  },
]

const categoryIcon = {
  All: Sparkle,
  Film,
  'AI Visuals': Wand2,
  'Web Products': Monitor,
  '3D & Post': Sparkle,
} satisfies Record<WorkCategory, typeof Sparkle>

function CategoryButton({
  category,
  active,
  onClick,
}: {
  category: WorkCategory
  active: boolean
  onClick: () => void
}) {
  const Icon = categoryIcon[category]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`liquid-glass inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition-transform hover:-translate-y-0.5 ${
        active ? 'text-white' : 'text-white/62'
      }`}
    >
      <Icon className="relative z-10 h-4 w-4" strokeWidth={1.5} />
      <span className="relative z-10">{category}</span>
    </button>
  )
}

function WorkCard({ work }: { work: WorkItem }) {
  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group liquid-glass block overflow-hidden rounded-2xl p-2 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative z-10 overflow-hidden rounded-[1rem] bg-black">
        <img
          src={work.image}
          alt={work.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
            <span>{work.category}</span>
            <span>{work.year}</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-normal leading-none tracking-tight text-white">{work.title}</h2>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-white/75 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <p className="relative z-10 px-2 pb-2 pt-4 text-sm leading-[1.55] text-white/62">{work.summary}</p>
    </a>
  )
}

export function WorksPage() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All')

  const visibleWorks = useMemo(() => {
    if (activeCategory === 'All') return works
    return works.filter(work => work.category === activeCategory)
  }, [activeCategory])

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14">
      <section className="mx-auto max-w-[1600px]">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <Link to="/" className="liquid-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/75 transition-transform hover:-translate-y-0.5">
              <ArrowLeft className="relative z-10 h-4 w-4" strokeWidth={1.5} />
              <span className="relative z-10">Home</span>
            </Link>

            <h1 className="mt-7 text-[34px] font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[64px]">
              Works Exhibition
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-[1.65] text-white/60 md:text-[15px]">
              A focused archive for film, AI visual systems, web products, and post-production work by Carlton Shi.
            </p>
          </div>

          <a
            href="mailto:jshi77@syr.edu"
            className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Submit New Work
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </a>
        </header>

        <nav className="mt-10 flex flex-wrap gap-3" aria-label="Works categories">
          {categories.map(category => (
            <CategoryButton
              key={category}
              category={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </nav>

        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {visibleWorks.map(work => (
            <WorkCard key={work.title} work={work} />
          ))}
        </div>
      </section>
    </main>
  )
}
