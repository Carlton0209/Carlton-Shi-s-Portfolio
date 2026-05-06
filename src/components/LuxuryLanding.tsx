'use client'

import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, BarChart3, Film, Monitor, Palette, Play, Shield, Sparkles, Zap } from 'lucide-react'
import { withBase } from '../lib/asset'

interface HlsInstance {
  loadSource: (src: string) => void
  attachMedia: (video: HTMLVideoElement) => void
  destroy: () => void
}

interface HlsConstructor {
  new (): HlsInstance
  isSupported: () => boolean
}

declare global {
  interface Window {
    Hls?: HlsConstructor
  }
}

const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
const startVideo = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'
const ctaVideo = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

const featureGifs = [
  'https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
]

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
]

const works = [
  {
    title: 'AI Generated Images',
    eyebrow: 'Commercial AI image system',
    body: 'A controllable image-generation workflow for consistent commercial visuals, concept frames, and campaign-ready art direction.',
    image: withBase('images/clearcat-processed-image-2.png'),
    href: 'https://carltonshi0209.my.canva.site/aigc',
  },
  {
    title: 'One-day Migration',
    eyebrow: 'Narrative short film',
    body: 'Three drifting people cross paths across one day, using migration as a quiet metaphor for belonging, speed, and urban change.',
    image: 'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
    href: 'https://filmfreeway.com/One-dayMigration',
  },
  {
    title: 'REALLIFE AI',
    eyebrow: 'Interactive product prototype',
    body: 'A one-click cinematic portrait enhancer designed around trust, realism, and a clean user journey from upload to output.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop',
    href: 'https://carlton0209.github.io/Reallife-AI/',
  },
  {
    title: 'AI Generated Videos',
    eyebrow: 'AI video production',
    body: 'A video pipeline combining generation models, ComfyUI restoration, upscaling, and post workflows for polished short-form pieces.',
    image: withBase('images/uiaosdyhulaksjhd.jpg'),
    href: 'https://carltonshi0209.my.canva.site/aigc',
  },
  {
    title: 'Films and 3D Modeling',
    eyebrow: 'Film craft and 3D work',
    body: 'A broader archive of traditional film, CG, and post-production work across Adobe tools, Unreal Engine, Nuke, Houdini, Maya, and Blender.',
    image: withBase('images/img.png'),
    href: 'https://carltonshi0209.my.canva.site',
  },
  {
    title: 'Multi-source Dashboard',
    eyebrow: 'Web application interface',
    body: 'A React dashboard that gathers multi-channel news streams into a calm, scannable interface for quick content monitoring.',
    image: withBase('images/ScreenShot_2026-03-29_141024_206.png'),
    href: 'https://carlton0209.github.io/Multi-source-Content-Dashboard/',
  },
]

const capabilities = [
  {
    icon: Sparkles,
    title: 'AI Visual Systems',
    body: 'Commercial images, video concepts, prompt workflows, and production-ready AI assets with a cinematic finish.',
  },
  {
    icon: Film,
    title: 'Film Direction',
    body: 'Story-first production, editing, color, lighting, and post workflows for shorts, campaigns, and reels.',
  },
  {
    icon: Monitor,
    title: 'Interactive Design',
    body: 'React prototypes, product interfaces, portfolios, and dashboards that feel polished from the first click.',
  },
  {
    icon: Palette,
    title: 'Brand Atmosphere',
    body: 'Visual systems that turn a project into a mood, not just a layout, with every detail considered.',
  },
]

const whyCards = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    body: "Concepts move quickly from moodboard to prototype, because waiting is rarely part of the creative brief.",
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    body: 'Every frame, surface, and interaction is refined until it feels intentional, cinematic, and inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    body: 'Interfaces are structured for clarity, attention, and action, with story and performance working together.',
  },
  {
    icon: Shield,
    title: 'Launch Ready',
    body: 'Clean implementation, responsive behavior, and production-minded details come standard from the first pass.',
  },
]

const notes = [
  {
    quote: 'Cinematic direction first, technical workflow second. The work feels built around atmosphere rather than tools.',
    name: 'Visual Systems',
    role: 'AI image, video, and post',
  },
  {
    quote: 'The interface work is quiet, focused, and fast to understand. It gives complicated media systems a readable shape.',
    name: 'Product Design',
    role: 'React prototypes and dashboards',
  },
  {
    quote: 'A strong eye for story tension, composition, and pacing makes the digital work feel closer to cinema than software.',
    name: 'Film Craft',
    role: 'Direction, editing, and color',
  },
]

function HlsVideo({
  src,
  className,
  desaturated = false,
}: {
  src: string
  className?: string
  desaturated?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    const Hls = window.Hls

    if (!Hls?.isSupported()) {
      video.src = src
      return
    }

    const hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)

    return () => {
      hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`${className ?? ''} ${desaturated ? 'saturate-0' : ''}`}
    />
  )
}

function BlurText({
  text,
  as = 'h2',
  className = '',
  delay = 100,
}: {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const Tag = as
  const words = text.split(' ')

  return (
    <Tag className={className}>
      <span ref={ref} className="inline-block">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={
              isInView
                ? {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : undefined
            }
            transition={{
              delay: (index * delay) / 1000,
              duration: 0.7,
              ease: 'easeOut',
              times: [0, 0.5, 1],
            }}
            className="mr-[0.2em] inline-block will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="liquid-glass inline-flex rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
      <span className="relative z-10">{children}</span>
    </span>
  )
}

function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white font-body"
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.a>
  )
}

function LogoMark() {
  return (
    <a href="#home" className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white font-body">
      <span className="relative z-10">CS</span>
    </a>
  )
}

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-5 py-3 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <LogoMark />

        <div className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1 md:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="relative z-10 rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black transition-transform active:scale-95 font-body"
          >
            Get Started
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <a
          href="#contact"
          className="liquid-glass-strong inline-flex rounded-full px-4 py-2 text-sm font-medium text-white font-body md:hidden"
        >
          <span className="relative z-10">Contact</span>
        </a>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative h-[1000px] overflow-visible bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute left-0 top-[20%] z-0 h-auto w-full object-contain"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-black/5" />
      <div className="pointer-events-none absolute bottom-0 z-0 h-[300px] w-full bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center px-5 pt-[150px] text-center sm:px-8">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-1 py-1"
        >
          <span className="relative z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black font-body">New</span>
          <span className="relative z-10 pr-3 text-xs font-light text-white/80 font-body">
            Introducing AI-powered cinematic portfolios.
          </span>
        </motion.div>

        <BlurText
          as="h1"
          text="The Portfolio Your Brand Deserves"
          delay={100}
          className="mt-8 max-w-3xl text-6xl italic leading-[0.8] tracking-[-4px] text-white font-heading md:text-7xl lg:text-[5.5rem]"
        />

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 max-w-xl text-sm font-light leading-tight text-white font-body md:text-base"
        >
          Film, AI visuals, and interactive systems by Carlton Shi. Cinematic design built for attention, speed, and feeling.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <PrimaryCta href="#contact">Get Started</PrimaryCta>
          <a href="#work" className="inline-flex items-center gap-2 text-sm font-light text-white/85 transition-colors hover:text-white font-body">
            <Play className="h-4 w-4 fill-white" />
            Watch the Work
          </a>
        </motion.div>

        <div className="mt-auto w-full pb-8 pt-16">
          <div className="flex flex-col items-center justify-center gap-8">
            <span className="liquid-glass rounded-full px-4 py-2 text-xs font-light text-white/70 font-body">
              <span className="relative z-10">Built with the tools behind</span>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {['Runway', 'ComfyUI', 'Figma', 'Unreal', 'React'].map(tool => (
                <span key={tool} className="text-2xl italic text-white font-heading md:text-3xl">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoSection({
  id,
  video,
  children,
  desaturated,
  minHeight = 'min-h-[560px]',
}: {
  id?: string
  video: string
  children: ReactNode
  desaturated?: boolean
  minHeight?: string
}) {
  return (
    <section id={id} className={`relative overflow-hidden bg-black ${minHeight}`}>
      <HlsVideo src={video} desaturated={desaturated} className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}

function StartSection() {
  return (
    <VideoSection id="process" video={startVideo} minHeight="min-h-[560px]">
      <div className="mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-5 text-center">
        <SectionBadge>How It Works</SectionBadge>
        <BlurText
          text="You dream it. I ship it."
          className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl"
        />
        <p className="mt-6 max-w-2xl text-sm font-light text-white/60 font-body md:text-base">
          Share the atmosphere, audience, and ambition. I turn it into cinematic frames, product flows, and web-ready interfaces in focused creative sprints.
        </p>
        <div className="mt-8">
          <PrimaryCta href="#contact">Start a Project</PrimaryCta>
        </div>
      </div>
    </VideoSection>
  )
}

function FeaturesChess() {
  const rows = [
    {
      eyebrow: 'Capabilities',
      title: 'Designed to feel cinematic. Built to move fast.',
      body: 'Every visual system starts with mood, rhythm, and clarity. AI expands the production range, then human direction sharpens the final frame.',
      button: 'Learn more',
      gif: featureGifs[0],
      reverse: false,
    },
    {
      eyebrow: 'Interactive Systems',
      title: 'Interfaces that keep getting cleaner.',
      body: 'From REALLIFE AI to monitoring dashboards, each build is shaped for quick comprehension, elegant motion, and a polished launch path.',
      button: 'See the work',
      gif: featureGifs[1],
      reverse: true,
    },
  ]

  return (
    <section id="services" className="bg-black px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Capabilities</SectionBadge>
          <BlurText
            text="Pro features. Zero complexity."
            className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="mt-16 space-y-10">
          {rows.map(row => (
            <div
              key={row.title}
              className={`flex flex-col items-center gap-8 lg:gap-12 ${row.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex-1"
              >
                <SectionBadge>{row.eyebrow}</SectionBadge>
                <h3 className="mt-6 max-w-xl text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl">
                  {row.title}
                </h3>
                <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-white/60 font-body md:text-base">
                  {row.body}
                </p>
                <div className="mt-8">
                  <PrimaryCta href="#work">{row.button}</PrimaryCta>
                </div>
              </motion.div>

              <motion.a
                href="#work"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="liquid-glass block flex-1 rounded-2xl"
              >
                <img src={row.gif} alt="" className="relative z-10 aspect-[16/10] w-full rounded-2xl object-cover" />
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <section id="work" className="bg-black px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Selected Work</SectionBadge>
          <BlurText
            text="The work does the talking."
            className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {works.map(work => (
            <motion.a
              key={work.title}
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="liquid-glass group rounded-2xl p-3"
            >
              <div className="relative z-10 overflow-hidden rounded-[1.1rem]">
                <img src={work.image} alt={work.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-light uppercase tracking-[0.22em] text-white/55 font-body">{work.eyebrow}</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <h3 className="text-3xl italic leading-none text-white font-heading">{work.title}</h3>
                    <ArrowUpRight className="h-5 w-5 text-white/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
              <p className="relative z-10 px-2 pb-2 pt-4 text-sm font-light leading-relaxed text-white/60 font-body">
                {work.body}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  return (
    <section className="bg-black px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Why Us</SectionBadge>
          <BlurText
            text="The difference is everything."
            className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyCards.map(card => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="liquid-glass rounded-2xl p-6"
            >
              <div className="liquid-glass-strong relative z-10 flex h-10 w-10 items-center justify-center rounded-full">
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="relative z-10 mt-6 text-xl font-medium text-white font-body">{card.title}</h3>
              <p className="relative z-10 mt-4 text-sm font-light leading-relaxed text-white/60 font-body">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="bg-black px-5 py-24 text-white sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>What They Say</SectionBadge>
          <BlurText
            text="Do not take my word for it."
            className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {notes.map(note => (
            <motion.div
              key={note.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="liquid-glass rounded-2xl p-8"
            >
              <p className="relative z-10 text-sm italic leading-relaxed text-white/80 font-body">"{note.quote}"</p>
              <div className="relative z-10 mt-8">
                <p className="text-sm font-medium text-white font-body">{note.name}</p>
                <p className="mt-1 text-xs font-light text-white/50 font-body">{note.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaFooter() {
  return (
    <VideoSection id="contact" video={ctaVideo} minHeight="min-h-[760px]">
      <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-8">
        <BlurText
          text="Your next creative chapter starts here."
          className="max-w-3xl text-5xl italic leading-[0.85] tracking-tight text-white font-heading md:text-6xl lg:text-7xl"
        />
        <p className="mt-8 max-w-2xl text-sm font-light leading-relaxed text-white/60 font-body md:text-base">
          Send a project note, collaboration idea, or production brief. No pressure, just possibilities.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <PrimaryCta href="mailto:sjc2213968315@gmail.com">Book a Call</PrimaryCta>
        </div>

        <footer className="mt-32 w-full border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs font-light text-white/40 font-body sm:flex-row">
            <p>(c) 2026 Carlton Shi. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#home" className="transition-colors hover:text-white">Privacy</a>
              <a href="#contact" className="transition-colors hover:text-white">Terms</a>
              <a href="mailto:sjc2213968315@gmail.com" className="transition-colors hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </VideoSection>
  )
}

export function LuxuryLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <main className="relative z-10 bg-black">
        <StartSection />
        <FeaturesChess />
        <WorkSection />
        <FeaturesGrid />
        <Testimonials />
        <CtaFooter />
      </main>
    </div>
  )
}
