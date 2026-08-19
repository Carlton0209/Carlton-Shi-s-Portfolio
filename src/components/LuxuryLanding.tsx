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
  Linkedin,
  Palette,
  PenTool,
  Type,
  Wand2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const backgroundVideo = withBase('videos/background-card.mp4')
const linkedInUrl = 'https://www.linkedin.com/in/carltonshi0209'

const metricVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4'

const softwareVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4'

const firstToolRow = [Figma, Framer, Palette, PenTool, Layers, Type, Aperture, Chrome]
const softwareIcons = [Camera, Brush, Box, Wand2, ...firstToolRow]

function VideoBackground({ src }: { src: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="liquid-glass mx-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16">
      <Icon className="relative z-10 h-5 w-5 text-white/85 md:h-6 md:w-6" strokeWidth={1.5} />
    </div>
  )
}

function ToolMarquee({ icons }: { icons: LucideIcon[] }) {
  const repeatedIcons = [...icons, ...icons]

  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee-left">
        {repeatedIcons.map((Icon, index) => (
          <IconTile key={`software-${index}`} icon={Icon} />
        ))}
      </div>
    </div>
  )
}

function ContactButton() {
  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center gap-2.5 sm:gap-3 lg:justify-end">
      <Link
        to="/works"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-5 text-sm text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#147ce5] active:scale-95 sm:px-6"
      >
        <span className="inline-flex items-center gap-2">
          Works
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </Link>

      <Link
        to="/resume"
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 sm:px-6"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          Resume
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </Link>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noreferrer"
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 sm:px-6"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          <Linkedin className="h-4 w-4" strokeWidth={1.5} />
          LinkedIn
        </span>
      </a>

      <a
        href="mailto:jshi77@syr.edu"
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 sm:px-6"
      >
        <span className="relative z-10">Contact Me</span>
      </a>
    </nav>
  )
}

function BackgroundCard() {
  return (
    <Link
      to="/works"
      aria-label="Open Works"
      className="group relative block min-h-[460px] overflow-hidden rounded-2xl bg-black transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 sm:min-h-[540px] lg:col-span-8 lg:row-span-2 lg:min-h-0"
    >
      <VideoBackground src={backgroundVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/80 transition-colors duration-300 group-hover:from-black/25 group-hover:to-black/70" />

      <div className="relative z-10 flex h-full min-h-[460px] flex-col p-6 sm:min-h-[540px] md:p-8 lg:min-h-0">
        <div className="mt-auto max-w-md">
          <p className="mb-4 text-sm text-white/70">Selected work</p>
          <h2 className="text-balance text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
            Film, AI visuals, and product systems.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-[1.6] text-white/68">
            Enter the full collection of moving image, generative, and interface work.
          </p>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white">
            Explore selected work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function CreativeVoiceCard() {
  return (
    <article className="relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl bg-[#324444] p-6 md:p-8 lg:col-span-4">
      <h2 className="text-2xl font-normal leading-[1.1] tracking-[-0.02em] text-white">Creative voice</h2>
      <p className="relative z-10 mt-6 max-w-[34ch] text-sm leading-[1.65] text-white/82">
        Story, atmosphere, and tool fluency sit together here. Every frame, interface, and AI system is shaped to feel clear before it feels technical.
      </p>
      <div className="relative z-10 mt-auto pt-8 text-sm text-white/70">
        <strong className="font-medium text-white">Carlton Shi</strong>
      </div>
    </article>
  )
}

function MetricCard() {
  return (
    <article className="relative flex min-h-[250px] overflow-hidden rounded-2xl bg-black lg:col-span-4">
      <VideoBackground src={metricVideo} />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 md:p-8">
        <p className="max-w-[15ch] text-3xl font-normal leading-[1.06] tracking-[-0.025em] text-white sm:text-4xl">
          Social work reached <span className="font-semibold">10K+ likes.</span>
        </p>
      </div>
    </article>
  )
}

function DailySoftwareCard() {
  return (
    <article className="relative min-h-[300px] overflow-hidden rounded-2xl bg-black lg:col-span-8">
      <VideoBackground src={softwareVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />

      <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between py-6 md:py-8">
        <div className="px-6 md:px-8">
          <h2 className="text-2xl font-normal leading-[1.1] tracking-[-0.02em] text-white">Daily software</h2>
        </div>

        <div className="overflow-hidden">
          <ToolMarquee icons={softwareIcons} />
        </div>
      </div>
    </article>
  )
}

function ReachMeCard() {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-2xl bg-[#324444] p-6 md:p-8 lg:col-span-4">
      <a
        href="mailto:jshi77@syr.edu"
        aria-label="Email Carlton Shi"
        className="liquid-glass absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:scale-95 md:right-8 md:top-8"
      >
        <ArrowUpRight className="relative z-10 h-4 w-4 text-white" strokeWidth={1.5} />
      </a>

      <h2 className="text-2xl font-normal leading-[1.1] tracking-[-0.02em] text-white">Reach me</h2>
      <div className="relative z-10 mt-14 min-w-0 space-y-2 sm:pr-12">
        <a href="mailto:jshi77@syr.edu" className="block break-words text-[18px] leading-tight text-white sm:text-2xl">
          jshi77@syr.edu
        </a>
        <a href="mailto:sjc2213968315@gmail.com" className="block break-words text-[18px] leading-tight text-white sm:text-2xl">
          sjc2213968315@gmail.com
        </a>
        <p className="pt-1 text-sm text-white/65">Film / AI visuals / AI products</p>
      </div>
    </article>
  )
}

export function LuxuryLanding() {
  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-14">
      <section className="mx-auto flex min-h-full min-w-0 max-w-[1480px] flex-col gap-10 lg:gap-14">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <div className="min-w-0 max-w-4xl">
            <h1 className="text-balance text-[40px] font-normal leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
              Hi, I'm Carlton Shi!
            </h1>
            <p className="mt-5 max-w-[62ch] text-base leading-[1.6] text-white/65 md:text-[17px]">
              A film and AI visual creator shaping cinematic shorts, generative media systems, and AI Products. I help ideas move with focus, atmosphere, and intention.
            </p>
          </div>

          <ContactButton />
        </header>

        <section className="min-w-0" aria-label="Selected work and creative practice">
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(250px,0.82fr)_minmax(250px,1fr)]">
          <BackgroundCard />

            <CreativeVoiceCard />
            <MetricCard />
          </div>

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
            <DailySoftwareCard />
            <ReachMeCard />
          </div>
        </section>
      </section>
    </main>
  )
}
