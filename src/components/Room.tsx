import type { ReactNode } from 'react'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'
import { gsap, useGSAP } from '../lib/motion'

/** One pair of outer margins for every page and section. */
export const frameX = 'px-5 md:px-8 xl:px-10'

export const linkedInUrl = 'https://www.linkedin.com/in/carltonshi0209'
export const primaryEmail = 'jshi77@syr.edu'
export const secondaryEmail = 'sjc2213968315@gmail.com'

const worksFilmUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

export function LoopVideo({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export function SiteBar({ current, action }: { current?: 'works' | 'resume'; action?: ReactNode }) {
  const linkClass = (active: boolean) =>
    `room-link t-small ${active ? 'text-room-ink' : 'text-room-dim hover:text-room-ink'}`

  return (
    <header className={`relative z-20 flex min-h-[72px] items-center justify-between gap-4 ${frameX}`}>
      <Link to="/" className="room-link text-[17px] font-medium tracking-[-0.02em] text-room-ink">
        Carlton Shi
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-4 md:gap-7">
        <Link to="/works" className={linkClass(current === 'works')} aria-current={current === 'works' ? 'page' : undefined}>
          Works
        </Link>
        <Link to="/resume" className={linkClass(current === 'resume')} aria-current={current === 'resume' ? 'page' : undefined}>
          Resume
        </Link>
        <a href={linkedInUrl} target="_blank" rel="noreferrer" className={`${linkClass(false)} hidden sm:inline-flex`}>
          LinkedIn
        </a>
        {action ?? (
          <a href={`mailto:${primaryEmail}`} className={linkClass(false)}>
            Contact
          </a>
        )}
      </nav>
    </header>
  )
}

type Panel = {
  title: string
  kind: string
  fact: string
  to?: string
  href?: string
  image?: { src: string; alt: string }
  video?: { src: string; poster: string }
  position?: string
}

const panels: Panel[] = [
  {
    title: 'AIGC Works',
    kind: 'Images / Videos',
    fact: '6 films · 6 workflows · 50 stills',
    to: '/works/aigc',
    image: { src: withBase('images/panels/aigc-fire.webp'), alt: 'Two dancers silhouetted against a bonfire at night, from the AIGC gallery.' },
    position: '58% 50%',
  },
  {
    title: 'ComfyUI Workflows',
    kind: 'Process / Pipelines',
    fact: '6 local pipelines',
    to: '/works/aigc#workflows',
    image: { src: withBase('images/panels/workflow-graph.webp'), alt: 'A ComfyUI graph for one character seen from four camera angles, with its recorded outputs.' },
    position: '60% 35%',
  },
  {
    title: 'Film & 3D',
    kind: 'Cinema / Spatial',
    fact: 'Opens the film and 3D site',
    href: 'https://carltonshi0209.my.canva.site/',
    video: { src: worksFilmUrl, poster: withBase('images/posters/works-film.webp') },
    position: '50% 40%',
  },
  {
    title: 'Product Design',
    kind: 'Interface / System',
    fact: '4 case studies',
    to: '/works/product-design',
    image: { src: withBase('images/off-hours/daypack-lifestyle-hero.webp'), alt: 'OFF HOURS daypack worn beside an autumn lake.' },
    position: '50% 45%',
  },
]

function PanelBody({ panel }: { panel: Panel }) {
  return (
    <>
      <div className="absolute inset-x-0 -inset-y-[8%] overflow-hidden" data-drift="5" aria-hidden={panel.video ? true : undefined}>
        {panel.video ? (
          <LoopVideo src={panel.video.src} poster={panel.video.poster} className="scale-[1.18] brightness-[0.82] transition-[filter] duration-700 group-hover:brightness-100" />
        ) : (
          <img
            src={panel.image?.src}
            alt={panel.image?.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.18] object-cover brightness-[0.82] transition-[filter] duration-700 group-hover:brightness-100"
            style={{ objectPosition: panel.position }}
          />
        )}
      </div>

      {/* The same row sits on every plate, so scrolling reads like turning pages. */}
      <div data-reveal-group className="absolute inset-x-0 bottom-5 bg-black/55 py-4 md:bottom-auto md:top-1/2 md:flex md:h-[90px] md:-translate-y-1/2 md:items-center md:py-0">
        <div className={`flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-1 md:grid md:grid-cols-[12rem_minmax(0,1fr)_auto] ${frameX}`}>
          <h2 data-reveal className="t-lead w-full font-medium text-room-ink md:order-2 md:w-auto">{panel.title}</h2>
          <p data-reveal className="t-small whitespace-nowrap text-room-ink/80 md:order-1">{panel.kind}</p>
          <p data-reveal className="t-small inline-flex items-center justify-end gap-1.5 whitespace-nowrap text-room-ink/80 md:order-3">
            {panel.fact}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
          </p>
        </div>
      </div>
    </>
  )
}

/** Full-screen plates, one per way into the work. */
export function WorkPanels({ id }: { id?: string }) {
  const panelClass =
    'group sticky top-0 block h-[82svh] overflow-hidden bg-room-ground focus-visible:outline-offset-[-6px] md:h-[100svh]'

  return (
    <section id={id} aria-label="Ways into the work" className="relative">
      {panels.map(panel =>
        panel.href ? (
          <a key={panel.title} href={panel.href} target="_blank" rel="noopener noreferrer" className={panelClass}>
            <PanelBody panel={panel} />
          </a>
        ) : (
          <Link key={panel.title} to={panel.to ?? '/works'} className={panelClass}>
            <PanelBody panel={panel} />
          </Link>
        ),
      )}
    </section>
  )
}

/** The close of every page: the email address set as display type on the inverse ground. */
export function ContactSection() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-contact-line]',
          { scale: 0.94 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 25%', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className={`relative flex min-h-[64svh] flex-col justify-between gap-16 bg-room-paper py-8 text-room-paper-ink md:min-h-[72svh] md:py-10 ${frameX}`}
    >
      <h2 id="contact-title" className="t-lead max-w-[22ch] font-medium">
        Reach me about film, AI visuals and AI products.
      </h2>

      <div>
        <a
          href={`mailto:${primaryEmail}`}
          data-contact-line
          className="block origin-bottom-left text-[15.6vw] leading-[0.9] tracking-[-0.055em] text-room-paper-ink transition-colors duration-300 hover:text-room-paper-link"
          style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif', fontWeight: 500 }}
        >
          {primaryEmail}
        </a>
        <div className="mt-8 flex flex-col gap-3 md:mt-12 md:flex-row md:items-end md:justify-between">
          <a href={`mailto:${secondaryEmail}`} className="room-link t-small">
            {secondaryEmail}
          </a>
          <div className="flex gap-6">
            <a href={linkedInUrl} target="_blank" rel="noreferrer" className="room-link t-small">
              LinkedIn
            </a>
            <Link to="/resume" className="room-link t-small">
              Resume
            </Link>
            <Link to="/works" className="room-link t-small">
              Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
