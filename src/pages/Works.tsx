import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Film, Monitor, Sparkle, Wand2 } from 'lucide-react'
import { categories, type WorkCategory, type WorkProject, works } from '../data/works'

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

function WorkCard({ work }: { work: WorkProject }) {
  return (
    <Link
      to={`/works/${work.slug}`}
      aria-label={`Open ${work.title} detail page`}
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
    </Link>
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
