'use client'

import { ArrowUpRight, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const backgroundVideo = withBase('videos/background-card.mp4')
const linkedInUrl = 'https://www.linkedin.com/in/carltonshi0209'

const metricVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4'

const softwareVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4'

// Every figure comes from the resume (src/data/resume.ts).
const proofPoints = [
  { value: '5', label: 'live client projects run through one ComfyUI production workflow', source: 'Flynn Agency' },
  { value: '~20%', label: 'faster VFX shot turnaround from AI-assisted face and character work', source: 'JOYME' },
  { value: '30%+', label: 'more social content from an LLM agent the marketing team adopted', source: 'Highland Film Group' },
  { value: '100K+', label: 'likes on short-form edits across TikTok and WeChat', source: 'NetEase' },
]

const capabilities = [
  { title: 'Node-based pipelines', detail: 'ComfyUI graphs, custom Python nodes, VRAM and speed tuning' },
  { title: 'Consistency systems', detail: 'LoRA training, IPAdapter and ControlNet for character and product identity' },
  { title: 'Finishing and delivery', detail: 'Compositing in Nuke, After Effects and Resolve, 4K upscaling, tracked handoff' },
]

const generationTools = ['ComfyUI', 'Python', 'LoRA training', 'IPAdapter', 'ControlNet', 'Flux', 'SDXL', 'Qwen Image Edit', 'MiniMax H3', 'Seedance', 'Kling', 'Runway', 'SeedVR2']
const finishingTools = ['Nuke', 'After Effects', 'DaVinci Resolve', 'Premiere Pro', 'Photoshop', 'Unreal Engine', 'Blender', 'Maya', 'Houdini', 'React', 'FastAPI', 'Docker']

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

function ToolMarquee({ tools, direction }: { tools: string[]; direction: 'left' | 'right' }) {
  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
      <div className={`flex w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {[...tools, ...tools].map((tool, index) => (
          <span key={`${tool}-${index}`} className="liquid-glass mx-1.5 inline-flex h-11 shrink-0 items-center rounded-full px-4 font-mono text-[13px] text-white/85">
            <span className="relative z-10">{tool}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function ContactButton() {
  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center gap-2.5 sm:gap-3 xl:justify-end">
      <Link
        to="/works"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-5 text-sm text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#147ce5] active:scale-[0.98] sm:px-6"
      >
        <span className="inline-flex items-center gap-2">
          Works
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </Link>

      <Link
        to="/resume"
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:px-6"
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
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:px-6"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          <Linkedin className="h-4 w-4" strokeWidth={1.5} />
          LinkedIn
        </span>
      </a>

      <a
        href="mailto:jshi77@syr.edu"
        className="liquid-glass inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:px-6"
      >
        <span className="relative z-10">Email</span>
      </a>
    </nav>
  )
}

function ProofRow() {
  return (
    <dl className="grid grid-cols-2 gap-x-5 gap-y-7 border-t border-white/12 pt-6 sm:gap-x-8 lg:grid-cols-4">
      {proofPoints.map(point => (
        <div key={point.source} className="flex min-w-0 flex-col-reverse justify-end gap-2">
          <dt className="max-w-[34ch] text-[13px] leading-relaxed text-white/60 sm:text-sm">
            {point.label}
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">{point.source}</span>
          </dt>
          <dd className="font-mono text-3xl tracking-tight text-white md:text-4xl">{point.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function WorkflowsCard() {
  return (
    <Link
      to="/works/aigc"
      aria-label="Open the AI image and video workflows"
      className="group relative block min-h-[460px] overflow-hidden rounded-2xl bg-[#0b0b0c] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80 sm:min-h-[540px] md:col-span-2 lg:col-span-8 lg:row-span-2 lg:min-h-0"
    >
      <VideoBackground src={backgroundVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/85 transition-colors duration-300 group-hover:from-black/25 group-hover:to-black/75" />

      <div className="relative z-10 flex h-full min-h-[460px] flex-col p-6 sm:min-h-[540px] md:p-8 lg:min-h-0">
        <div className="mt-auto max-w-lg">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">Selected work · 6 workflows</p>
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px]">
            ComfyUI workflows, shown output first.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-white/70">
            Multi-angle characters, garment transfer, a logo built into leather, tracked footwear replacement, image-to-video and 4K finishing. Each one opens to its steps and node graph.
          </p>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white">
            See the workflows
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function CapabilitiesCard() {
  return (
    <article className="relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl bg-[#324444] p-6 md:p-8 lg:col-span-4">
      <h2 className="text-2xl font-normal leading-[1.1] tracking-[-0.02em] text-white">What I build</h2>
      <ul className="mt-5 divide-y divide-white/12">
        {capabilities.map(item => (
          <li key={item.title} className="py-3 first:pt-0 last:pb-0">
            <p className="text-[15px] font-medium text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-[1.55] text-white/70">{item.detail}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

function PromptSystemCard() {
  return (
    <article className="relative flex min-h-[250px] overflow-hidden rounded-2xl bg-[#0b0b0c] lg:col-span-4">
      <VideoBackground src={metricVideo} />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">Prompt system · Flynn Agency</p>
        <p className="mt-3 max-w-[28ch] text-xl font-normal leading-[1.2] tracking-[-0.02em] text-white md:text-[22px]">
          One-line briefs become shot-level prompts for Seedance and MiniMax H3.
        </p>
        <p className="mt-3 text-sm text-white/70">Adopted as the team’s default starting point.</p>
      </div>
    </article>
  )
}

function ToolchainCard() {
  return (
    <article className="relative min-h-[300px] overflow-hidden rounded-2xl bg-[#0b0b0c] lg:col-span-8">
      <VideoBackground src={softwareVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />

      <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between gap-8 py-6 md:py-8">
        <div className="px-6 md:px-8">
          <h2 className="text-2xl font-normal leading-[1.1] tracking-[-0.02em] text-white">Toolchain</h2>
          <p className="mt-2 text-sm text-white/65">Generation on top, finishing and build below.</p>
        </div>

        <div className="space-y-3 overflow-hidden">
          <ToolMarquee tools={generationTools} direction="left" />
          <ToolMarquee tools={finishingTools} direction="right" />
          <p className="sr-only">Tools: {[...generationTools, ...finishingTools].join(', ')}.</p>
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
        className="liquid-glass absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:scale-[0.98] md:right-8 md:top-8"
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
        <p className="pt-1 text-sm leading-relaxed text-white/65">Open to AI technical artist, AI video and creative technology roles.</p>
      </div>
    </article>
  )
}

export function LuxuryLanding() {
  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-14">
      <section className="mx-auto flex min-h-full min-w-0 max-w-[1480px] flex-col gap-10 lg:gap-14">
        <header className="flex min-w-0 flex-col gap-8">
          <div className="grid min-w-0 gap-7 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end xl:gap-10">
            <div className="min-w-0 max-w-[920px]">
              <p className="text-sm text-white/60">
                <span className="text-white">Carlton Shi</span> · AI Technical Artist
              </p>
              <h1 className="mt-4 text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-[58px]">
                Generative image and video workflows, built to hold up in production.
              </h1>
              <p className="mt-5 max-w-[64ch] text-base leading-[1.6] text-white/65 md:text-[17px]">
                I build ComfyUI pipelines that keep characters, products and logos consistent from shot to shot, then finish and package the output so artists and brand teams can run it again. Currently AI Technical Artist at Flynn Agency.
              </p>
            </div>

            <ContactButton />
          </div>

          <ProofRow />
        </header>

        <section className="min-w-0" aria-label="Selected work and practice">
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(250px,auto)_minmax(250px,auto)]">
            <WorkflowsCard />
            <CapabilitiesCard />
            <PromptSystemCard />
          </div>

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
            <ToolchainCard />
            <ReachMeCard />
          </div>
        </section>
      </section>
    </main>
  )
}
