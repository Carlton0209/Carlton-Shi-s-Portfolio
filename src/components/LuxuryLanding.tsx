'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resume } from '../data/resume'
import { withBase } from '../lib/asset'
import { gsap, useGSAP, useRoomMotion } from '../lib/motion'
import { ContactSection, LoopVideo, WorkPanels, frameX, linkedInUrl, primaryEmail } from './Room'
import SplitText from './reactbits/SplitText'
import ScrollReveal from './reactbits/ScrollReveal'
import { LogoLoop } from './reactbits/LogoLoop'

const heroVideo = withBase('videos/background-card.mp4')
const heroPoster = withBase('images/posters/background-card.webp')

const triptych = (file: string) => withBase(`images/aigc/${file}-triptych-sm.webp`)
const study = (file: string) => withBase(`images/aigc/${file}-sm.webp`)

// Four of the 27 narrative triptychs, set side by side as one folded view.
const band = [
  { src: triptych('monastic-observatory-window'), title: 'Monastic Observatory Window', grow: 5 },
  { src: triptych('go-shadow-ink'), title: 'Go: Shadow & Ink', grow: 2 },
  { src: triptych('venice-palace'), title: 'Venice Palace', grow: 3 },
  { src: triptych('rain-courtyard-ledger'), title: 'Rain Courtyard Ledger', grow: 2 },
]

// Stills from the AIGC gallery, gathered round the heading. l/t place them on a phone, L/T on wider screens.
const cluster = [
  { src: study('121829_00001_'), drift: 10, l: '4%', t: '1%', L: '19%', T: '5%' },
  { src: study('122336_00001_'), drift: 6, l: '62%', t: '6%', L: '44%', T: '0%' },
  { src: study('aigc-04'), drift: 12, l: '', t: '', L: '68%', T: '8%' },
  { src: study('122449_00001_'), drift: 4, l: '6%', t: '72%', L: '9%', T: '45%' },
  { src: study('121243_00001_'), drift: 9, l: '64%', t: '68%', L: '78%', T: '40%' },
  { src: study('aigc-01'), drift: 7, l: '35%', t: '84%', L: '29%', T: '75%' },
  { src: study('122114_00001_'), drift: 11, l: '', t: '', L: '58%', T: '72%' },
]

const software = [
  'ComfyUI', 'Flux', 'Seedance', 'MiniMax H3', 'Kling', 'Runway', 'Midjourney', 'Suno',
  'Photoshop', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Nuke', 'Unreal Engine', 'Blender', 'Houdini', 'Figma',
]

function useWide() {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setWide(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return wide
}

function Hero() {
  const root = useRef<HTMLElement | null>(null)

  // The signature move: the name gives way a few percent as the first screen leaves.
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-name]', {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-picture]', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.from('[data-hero-line]', { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.35 })
      })
    },
    { scope: root },
  )

  const navLink = 'room-link text-[15px] text-white'

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden" aria-label="Introduction">
      <div className="relative h-[50svh] shrink-0 overflow-hidden md:h-[58%]">
        <div className="absolute inset-0" data-hero-picture>
          <LoopVideo src={heroVideo} poster={heroPoster} className="[object-position:50%_32%]" />
        </div>
        {/* Neutral scrim behind the links only; the sky is light there. */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" aria-hidden="true" />
        <nav aria-label="Primary" className={`absolute right-0 top-0 flex items-center gap-4 pt-4 sm:gap-6 md:pt-5 ${frameX}`}>
          <Link to="/works" className={navLink}>Works</Link>
          <Link to="/resume" className={navLink}>Resume</Link>
          <a href={linkedInUrl} target="_blank" rel="noreferrer" className={navLink}>LinkedIn</a>
          <a href={`mailto:${primaryEmail}`} className={navLink}>Contact</a>
        </nav>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col justify-between pb-4 pt-5 md:pb-7 md:pt-6 ${frameX}`}>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <p data-hero-line className="t-body max-w-[46ch] text-room-ink md:max-w-[52ch]">
            A film and AI visual creator shaping cinematic shorts, generative media systems, and AI products. I help ideas move with focus, atmosphere, and intention.
          </p>
          <div data-hero-line className="shrink-0">
            <Link to="/works" className="room-button">
              Works
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div data-name className="origin-bottom-left">
          <SplitText
            tag="h1"
            text="Carlton Shi"
            trigger="load"
            splitType="chars"
            mask
            from={{ yPercent: 100 }}
            to={{ yPercent: 0 }}
            delay={38}
            duration={1}
            ease="power4.out"
            textAlign="left"
            className="t-name block text-[25.5vw] text-room-ink md:whitespace-nowrap md:text-[21vw] xl:text-[22.4vw] [&_.split-char]:pb-[0.06em]"
          />
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section data-reveal-group aria-labelledby="voice-title" className="pt-[clamp(120px,14vw,220px)]">
      <h2 id="voice-title" data-reveal className={`t-head md:pl-[calc(100%/6)] ${frameX}`}>
        Creative voice
      </h2>

      <Link
        to="/works/aigc#narrative-triptychs"
        data-reveal
        aria-label="Open the Narrative Triptychs collection"
        className="mt-10 flex h-[84svh] flex-wrap md:mt-16 md:h-[68svh] md:flex-nowrap"
      >
        {band.map((item, index) => (
          <div
            key={item.title}
            // On a phone the four slices make a two-by-two block split 64/36, then 36/64.
            className={`group/panel relative h-1/2 min-w-0 overflow-hidden transition-[flex-grow] duration-500 ease-out md:h-full md:w-auto md:basis-0 md:hover:!grow-[6] ${
              index === 0 || index === 3 ? 'w-[64%]' : 'w-[36%]'
            }`}
            style={{ flexGrow: item.grow }}
          >
            <img
              src={item.src}
              alt={`${item.title}, a narrative triptych`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover brightness-[0.88] transition-[filter] duration-500 group-hover/panel:brightness-100"
            />
            {index === 0 && (
              <div className={`absolute left-0 top-0 bg-black/55 py-5 md:py-6 ${frameX}`}>
                <p className="t-lead max-w-[12ch] font-medium text-room-ink">Narrative Triptychs</p>
              </div>
            )}
          </div>
        ))}
      </Link>

      <div className={`mt-6 grid gap-6 md:mt-8 md:grid-cols-12 ${frameX}`}>
        <p data-reveal className="t-small text-room-dim md:col-span-3">
          Four of 27 triptychs: Monastic Observatory Window, Go: Shadow &amp; Ink, Venice Palace, Rain Courtyard Ledger.
        </p>
        <ScrollReveal
          as="p"
          effect="fade"
          baseOpacity={0.22}
          enableBlur={false}
          wordAnimationEnd="top 45%"
          containerClassName="!my-0 md:col-span-8 md:col-start-5"
          textClassName="t-lead !text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] !font-normal !leading-[1.3] text-room-ink"
        >
          Story, atmosphere, and tool fluency sit together here. Every frame, interface, and AI system is shaped to feel clear before it feels technical.
        </ScrollReveal>
      </div>
    </section>
  )
}

function Gathering() {
  return (
    <section aria-labelledby="reach-title" className={`relative mt-[clamp(120px,14vw,220px)] h-[820px] md:h-[100svh] md:min-h-[760px] ${frameX}`}>
      {cluster.map((photo, index) => (
        <div
          key={photo.src}
          className={`absolute w-[30%] md:w-[clamp(132px,13vw,210px)] left-[var(--l)] top-[var(--t)] md:left-[var(--L)] md:top-[var(--T)] ${
            photo.l ? '' : 'max-md:hidden'
          }`}
          style={{ '--l': photo.l, '--t': photo.t, '--L': photo.L, '--T': photo.T } as CSSProperties}
          data-drift={photo.drift}
        >
          <img
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[9/10] w-full object-cover"
            style={{ objectPosition: index % 2 ? '40% 50%' : '60% 50%' }}
          />
        </div>
      ))}

      <div data-reveal-group className="absolute left-1/2 top-1/2 w-[min(88%,680px)] -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 id="reach-title" data-reveal className="t-head text-room-ink">
          Social work reached {resume.socialLikes} likes.
        </h2>
        <p data-reveal className="t-body mx-auto mt-4 max-w-[36ch] text-room-ink">
          Short cinematic clips with VFX, motion graphics and colour grading, shared on TikTok and WeChat.
        </p>
        <Link data-reveal to="/works/aigc" className="room-link mt-3 text-room-link">
          Open the AIGC works
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

function DailySoftware() {
  const wide = useWide()

  return (
    <section data-reveal-group aria-labelledby="software-title" className="mt-[clamp(64px,8vw,120px)]">
      <div className={`flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between ${frameX}`}>
        <h2 id="software-title" data-reveal className="t-head">
          Daily software
        </h2>
        <p data-reveal className="t-body max-w-[40ch] text-room-ink">
          Generation, edit and finish: the tools behind the films, stills and products on this site.
        </p>
      </div>
      <div data-reveal className={`mt-10 md:mt-14 ${frameX}`}>
        <LogoLoop
          logos={software.map(name => ({ node: <span className="font-display font-normal tracking-[-0.03em]">{name}</span>, title: name }))}
          speed={46}
          gap={wide ? 64 : 36}
          logoHeight={wide ? 64 : 33}
          hoverSpeed={12}
          fadeOut={false}
          draggable={false}
          ariaLabel="Software used daily"
          className="text-room-ink"
        />
      </div>
    </section>
  )
}

export function LuxuryLanding() {
  const root = useRef<HTMLElement | null>(null)
  useRoomMotion(root)

  return (
    <main ref={root} className="room min-h-[100dvh] antialiased">
      <Hero />
      <WorkPanels id="work" />
      <Showcase />
      <Gathering />
      <DailySoftware />
      <div className="h-[clamp(120px,14vw,220px)]" aria-hidden="true" />
      <ContactSection />
    </main>
  )
}
