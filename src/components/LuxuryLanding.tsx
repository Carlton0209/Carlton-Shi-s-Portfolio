'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Aperture,
  ArrowUpRight,
  Box,
  Brush,
  Camera,
  Chrome,
  Figma,
  Framer,
  Layers,
  Palette,
  PenTool,
  Sparkle,
  Type,
  Wand2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const backgroundVideo = withBase('videos/background-card.mp4')

const metricVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4'

const softwareVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4'

const firstToolRow = [Figma, Framer, Palette, PenTool, Layers, Type, Aperture, Chrome]
const secondToolRow = [Camera, Brush, Box, Wand2, Figma, Framer, Type, Layers]

function VideoBackground({ src }: { src: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

function SectionLabel({ children, align = 'center' }: { children: string; align?: 'center' | 'start' }) {
  return (
    <div className={`relative z-10 flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">{children}</span>
      <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
    </div>
  )
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="liquid-glass mx-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16">
      <Icon className="relative z-10 h-5 w-5 text-white/85 md:h-6 md:w-6" strokeWidth={1.5} />
    </div>
  )
}

function ToolMarquee({ icons, direction }: { icons: LucideIcon[]; direction: 'left' | 'right' }) {
  const repeatedIcons = [...icons, ...icons]

  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {repeatedIcons.map((Icon, index) => (
          <IconTile key={`${direction}-${index}`} icon={Icon} />
        ))}
      </div>
    </div>
  )
}

function ContactButton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to="/resume"
        className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          Resume
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </Link>

      <a
        href="mailto:jshi77@syr.edu"
        className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3"
      >
        <span className="relative z-10">Contact Me</span>
      </a>
    </div>
  )
}

function BackgroundCard() {
  return (
    <article className="relative min-h-[420px] overflow-hidden rounded-2xl bg-black md:min-h-[520px] lg:min-h-0">
      <VideoBackground src={backgroundVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/80" />

      <div className="relative z-10 flex h-full min-h-[420px] flex-col p-5 md:min-h-[520px] md:p-6 lg:min-h-0">
        <SectionLabel>Creative Focus</SectionLabel>
      </div>
    </article>
  )
}

function CreativeVoiceCard() {
  return (
    <article className="noise-overlay relative overflow-hidden rounded-2xl bg-[#324444] p-5 md:p-6">
      <SectionLabel align="start">Creative Voice</SectionLabel>
      <p className="relative z-10 mt-8 text-[13px] leading-[1.6] text-white/85 sm:text-[13.5px]">
        Story, atmosphere, and tool fluency sit together here. Every frame, interface, and AI system is shaped to feel clear before it feels technical.
      </p>
      <div className="relative z-10 mt-7 text-sm text-white/70">
        <strong className="font-medium text-white">Carlton Shi</strong>
      </div>
    </article>
  )
}

function MetricCard() {
  return (
    <article className="relative min-h-[260px] overflow-hidden rounded-2xl bg-black md:min-h-0">
      <VideoBackground src={metricVideo} />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex h-full min-h-[260px] flex-col items-center justify-center px-5 text-center md:min-h-0">
        <p className="text-5xl font-light tracking-tight text-white drop-shadow sm:text-6xl md:text-7xl lg:text-[88px]">10K+</p>
        <p className="mt-3 text-sm text-white/85">Likes on social media</p>
      </div>
    </article>
  )
}

function DailySoftwareCard() {
  return (
    <article className="relative min-h-[320px] overflow-hidden rounded-2xl bg-black">
      <VideoBackground src={softwareVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />

      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between py-5 md:py-6">
        <div className="px-5 md:px-6">
          <SectionLabel>Daily Software</SectionLabel>
        </div>

        <div className="space-y-4 overflow-hidden">
          <ToolMarquee icons={firstToolRow} direction="left" />
          <ToolMarquee icons={secondToolRow} direction="right" />
        </div>
      </div>
    </article>
  )
}

function ReachMeCard() {
  return (
    <article className="noise-overlay relative overflow-hidden rounded-2xl bg-[#324444] p-5 md:p-6">
      <a
        href="mailto:jshi77@syr.edu"
        aria-label="Email Carlton Shi"
        className="liquid-glass absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 md:right-6 md:top-6"
      >
        <ArrowUpRight className="relative z-10 h-4 w-4 text-white" strokeWidth={1.5} />
      </a>

      <SectionLabel align="start">Reach Me</SectionLabel>
      <div className="relative z-10 mt-12 space-y-2 pr-12">
        <a href="mailto:jshi77@syr.edu" className="block text-[18px] leading-tight text-white sm:text-2xl">
          jshi77@syr.edu
        </a>
        <a href="mailto:sjc2213968315@gmail.com" className="block text-[18px] leading-tight text-white sm:text-2xl">
          sjc2213968315@gmail.com
        </a>
        <p className="pt-1 text-sm text-white/65">Film / AI visuals / AI products</p>
      </div>
    </article>
  )
}

export function LuxuryLanding() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:h-screen lg:px-14">
      <section className="mx-auto flex min-h-full max-w-[1600px] flex-col gap-5 lg:h-full">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-[28px] font-normal leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[44px]">
              Hi, I'm Carlton Shi!
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-[1.6] text-white/60 md:text-[15px]">
              A film and AI visual creator shaping cinematic shorts, generative media systems, and AI Products. I help ideas move with focus, atmosphere, and intention.
            </p>
          </div>

          <ContactButton />
        </header>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:min-h-0 lg:grid-cols-3">
          <BackgroundCard />

          <div className="grid gap-4 md:grid-rows-[auto_1fr] md:gap-5">
            <CreativeVoiceCard />
            <MetricCard />
          </div>

          <div className="grid gap-4 md:col-span-2 md:grid-cols-2 md:gap-5 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-[1fr_auto]">
            <DailySoftwareCard />
            <ReachMeCard />
          </div>
        </div>
      </section>
    </main>
  )
}
