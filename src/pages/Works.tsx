import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { ArrowUpRight, Film, PanelsTopLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const backgroundVideoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const works = [
  {
    title: 'AIGC Works',
    label: 'Images / Videos',
    icon: Sparkles,
    to: '/works/aigc',
  },
  {
    title: 'Film & 3D',
    label: 'Cinema / Spatial',
    icon: Film,
    href: 'https://carltonshi0209.my.canva.site/',
  },
  {
    title: 'Product Design',
    label: 'Interface / System',
    icon: PanelsTopLeft,
    to: '/works/product-design',
  },
]

const aigcImages = [
  { src: withBase('images/aigc/aigc-01.png'), title: 'AIGC Study 01' },
  { src: withBase('images/aigc/aigc-02.png'), title: 'AIGC Study 02' },
  { src: withBase('images/aigc/aigc-03.png'), title: 'AIGC Study 03' },
  { src: withBase('images/aigc/aigc-04.png'), title: 'AIGC Study 04' },
  { src: withBase('images/aigc/aigc-05.png'), title: 'AIGC Study 05' },
]

const productWorks = [
  {
    title: 'LINEAGE',
    label: 'AI production ledger',
    src: withBase('images/lineage-homepage.png'),
    description:
      'A provenance product concept for AI-assisted media delivery. It records prompts, tools, source assets, model usage, output hashes, and operator history so production teams can package transparent delivery records for clients.',
    features: ['Production history capture', 'Signed delivery manifest', 'Buyer-readable AI usage summary'],
  },
  {
    title: 'RealLife AI',
    label: 'Cinematic portrait enhancer',
    src: withBase('images/reallife-ai-preview.jpg'),
    description:
      'A face-aware enhancement product for cinematic portraits. The homepage frames a clear before-and-after experience, with emphasis on landmark tracking, natural skin detail, cleaner light, and a direct trial flow.',
    features: ['Before and after comparison', 'Face landmark aware enhancement', 'Simple trial-focused product flow'],
  },
]

function FadingBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  const fadeTo = useCallback((targetOpacity: number, duration = 500) => {
    const video = videoRef.current
    if (!video) return

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
    }

    const startOpacity = Number.parseFloat(video.style.opacity || '0')
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const opacity = startOpacity + (targetOpacity - startOpacity) * progress
      video.style.opacity = String(opacity)

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(animate)
      } else {
        animationFrameRef.current = null
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const handleLoaded = () => {
      fadingOutRef.current = false
      void video.play().catch(() => undefined)
      fadeTo(1)
    }

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      const timeRemaining = video.duration - video.currentTime
      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeTo(0)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'

      window.setTimeout(() => {
        video.currentTime = 0
        fadingOutRef.current = false
        void video.play().catch(() => undefined)
        fadeTo(1)
      }, 100)
    }

    video.addEventListener('loadeddata', handleLoaded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', handleLoaded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [fadeTo])

  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full translate-y-[17%] object-cover"
      src={backgroundVideoUrl}
      style={{ opacity: 0 }}
    />
  )
}

export function WorksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FadingBackgroundVideo />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8 md:py-16">
        <div className="grid w-full max-w-6xl gap-3 md:grid-cols-3 md:gap-6">
          {works.map((work, index) => {
            const Icon = work.icon
            const cardContent = (
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center justify-between md:mb-8">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                      {work.label}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>

                  <p className="text-xs text-white/45 md:text-sm">0{index + 1}</p>
                  <h2 className="mt-3 text-3xl font-normal leading-none tracking-tight text-white md:mt-8 md:text-[42px]">
                    {work.title}
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-medium text-white/82">
                  View work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </div>
              </div>
            )

            const className =
              'works-glass-card group block min-h-[185px] rounded-[24px] p-4 md:min-h-[360px] md:rounded-[28px] md:p-7'

            return work.href ? (
              <a
                key={work.title}
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={{ animationDelay: `${index * -1.4}s` }}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={work.title}
                to={work.to ?? '/works'}
                className={className}
                style={{ animationDelay: `${index * -1.4}s` }}
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function ExhibitionChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FadingBackgroundVideo />
      <div className="absolute inset-0 bg-black/38" aria-hidden="true" />

      <Link
        to="/works"
        className="liquid-glass fixed left-5 top-5 z-30 rounded-full px-4 py-2 text-sm text-white/82 transition-colors hover:text-white"
      >
        <span className="relative z-10">Back to works</span>
      </Link>

      <h1 className="sr-only">{title}</h1>
      <div className="relative z-10 h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        {children}
      </div>
    </main>
  )
}

export function AigcExhibitionPage() {
  return (
    <ExhibitionChrome title="AIGC Works">
      {aigcImages.map((image, index) => (
        <section
          key={image.src}
          className="flex min-h-screen snap-start items-center justify-center px-5 py-20"
          aria-label={image.title}
        >
          <figure className="exhibition-glass-frame w-full max-w-5xl rounded-[30px] p-3 md:rounded-[38px] md:p-4">
            <img
              src={image.src}
              alt={image.title}
              className="max-h-[76vh] w-full rounded-[22px] object-contain md:rounded-[28px]"
            />
            <figcaption className="px-2 pb-2 pt-4 text-sm uppercase tracking-[0.22em] text-white/54">
              {String(index + 1).padStart(2, '0')} / {String(aigcImages.length).padStart(2, '0')}
            </figcaption>
          </figure>
        </section>
      ))}
    </ExhibitionChrome>
  )
}

export function ProductDesignPage() {
  return (
    <ExhibitionChrome title="Product Design">
      {productWorks.map((product, index) => (
        <section key={product.title} className="flex min-h-screen snap-start items-center justify-center px-5 py-20">
          <article className="grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.68fr)] lg:items-center">
            <div className="exhibition-glass-frame rounded-[30px] p-3 md:rounded-[38px] md:p-4">
              <img
                src={product.src}
                alt={`${product.title} homepage`}
                className="max-h-[72vh] w-full rounded-[22px] object-contain md:rounded-[28px]"
              />
            </div>

            <div className="exhibition-glass-frame rounded-[30px] p-6 md:rounded-[38px] md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                {String(index + 1).padStart(2, '0')} / Product Design
              </p>
              <h2 className="mt-5 text-4xl font-normal leading-none tracking-tight text-white md:text-5xl">
                {product.title}
              </h2>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/48">{product.label}</p>
              <p className="mt-6 text-sm leading-[1.75] text-white/72">{product.description}</p>
              <div className="mt-7 space-y-3">
                {product.features.map(feature => (
                  <div key={feature} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/72">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      ))}
    </ExhibitionChrome>
  )
}
