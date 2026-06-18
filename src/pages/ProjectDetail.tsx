import { ArrowLeft, ArrowUpRight, ExternalLink, Sparkle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getWorkBySlug } from '../data/works'

function DetailPill({ children }: { children: string }) {
  return (
    <span className="liquid-glass inline-flex h-10 items-center rounded-full px-4 text-xs font-medium uppercase tracking-[0.16em] text-white/75">
      <span className="relative z-10">{children}</span>
    </span>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-white/12 pt-5">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/48">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-white/70">
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

export function ProjectDetail() {
  const { id } = useParams()
  const work = getWorkBySlug(id)

  if (!work) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-5 py-8 text-white sm:px-8 lg:px-16">
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-start justify-center">
          <Link to="/works" className="liquid-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/75 transition-transform hover:-translate-y-0.5">
            <ArrowLeft className="relative z-10 h-4 w-4" strokeWidth={1.5} />
            <span className="relative z-10">Works</span>
          </Link>
          <h1 className="mt-8 text-4xl font-normal tracking-tight text-white">Project not found</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/58">
            This work is not available in the exhibition archive.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14">
      <article className="mx-auto max-w-[1600px]">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/works" className="liquid-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/75 transition-transform hover:-translate-y-0.5">
            <ArrowLeft className="relative z-10 h-4 w-4" strokeWidth={1.5} />
            <span className="relative z-10">Works</span>
          </Link>

          {work.externalUrl ? (
            <a
              href={work.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/75 transition-transform hover:-translate-y-0.5"
            >
              <ExternalLink className="relative z-10 h-4 w-4" strokeWidth={1.5} />
              <span className="relative z-10">{work.externalLabel ?? 'External source'}</span>
            </a>
          ) : null}
        </nav>

        <header className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-[#101010] p-5 md:p-7">
            <div>
              <div className="flex flex-wrap gap-2">
                <DetailPill>{work.category}</DetailPill>
                <DetailPill>{work.year}</DetailPill>
              </div>

              <h1 className="mt-8 text-[38px] font-normal leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[78px]">
                {work.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/64">{work.intro}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/works"
                className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Exhibition
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </Link>
              {work.externalUrl ? (
                <a
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-white/78 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {work.externalLabel ?? 'External source'}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-black sm:min-h-[460px] lg:min-h-[620px]">
            <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-black/12" />
            <div className="absolute left-5 top-5 flex items-center gap-2 md:left-7 md:top-7">
              <Sparkle className="h-3 w-3 text-white/65" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">Project Detail</span>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,0.42fr)]">
          <section className="rounded-2xl bg-[#101010] p-5 md:p-7">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/48">Work Notes</h2>
            <div className="mt-5 divide-y divide-white/10">
              {work.notes.map((note, index) => (
                <p key={note} className="py-4 text-sm leading-[1.65] text-white/66 first:pt-0 last:pb-0">
                  <span className="mr-3 text-white/38">{String(index + 1).padStart(2, '0')}</span>
                  {note}
                </p>
              ))}
            </div>
          </section>

          <aside className="space-y-6 rounded-2xl bg-[#101010] p-5 md:p-7">
            <DetailList title="Tools" items={work.tools} />
            <DetailList title="Deliverables" items={work.deliverables} />
          </aside>
        </div>

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-normal tracking-tight text-white">Selected Media</h2>
              <p className="mt-2 text-sm text-white/54">Portfolio material from the exhibition archive.</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/36">{work.category}</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {work.gallery.map(item => (
              <figure key={item.src} className="overflow-hidden rounded-2xl bg-[#101010] p-2">
                <img src={item.src} alt={item.alt} className="aspect-[16/10] w-full rounded-[1rem] object-cover" />
                <figcaption className="px-2 pb-2 pt-4 text-sm leading-[1.55] text-white/58">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
