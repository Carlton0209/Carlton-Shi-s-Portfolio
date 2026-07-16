import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, ChevronDown, Expand, Film, PanelsTopLeft, Sparkles, X } from 'lucide-react'
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

const wesMedia = [
  { src: withBase('images/Wes/120426_00001_.png'), title: 'Wes Anderson Collection 01' },
]

const productWorks = [
  {
    title: 'LINEAGE',
    label: 'AI production ledger',
    src: withBase('images/lineage-homepage.png'),
    href: 'https://lineage-puce.vercel.app/',
    description:
      'A provenance product concept for AI-assisted media delivery. It records prompts, tools, source assets, model usage, output hashes, and operator history so production teams can package transparent delivery records for clients.',
    features: ['Production history capture', 'Signed delivery manifest', 'Buyer-readable AI usage summary'],
  },
  {
    title: 'RealLife AI',
    label: 'Cinematic portrait enhancer',
    src: withBase('images/reallife-ai-preview.jpg'),
    href: 'https://reallife-ai-eib5.vercel.app/',
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
      className="absolute inset-0 h-full w-full object-cover object-center"
      src={backgroundVideoUrl}
      style={{ opacity: 0 }}
    />
  )
}

export function WorksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FadingBackgroundVideo />

      <Link
        to="/"
        aria-label="Back to home"
        className="liquid-glass fixed left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/82 transition-colors hover:text-white"
      >
        <ArrowLeft className="relative z-10 h-4 w-4" strokeWidth={1.7} />
        <span className="relative z-10">Back home</span>
      </Link>

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

function ExhibitionChrome({
  title,
  action,
  snap = true,
  children,
}: {
  title: string
  action?: ReactNode
  snap?: boolean
  children: ReactNode
}) {
  const [showScrollHint, setShowScrollHint] = useState(true)

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
      {action}

      <h1 className="sr-only">{title}</h1>
      <div
        className={`liquid-glass pointer-events-none fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-white/82 transition-all duration-300 md:bottom-6 md:px-5 ${
          showScrollHint ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
        aria-label="Scroll down to view more works"
      >
        <span className="relative z-10 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] md:text-xs">
          Scroll for more works
        </span>
        <ChevronDown className="relative z-10 h-4 w-4 animate-bounce" strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div
        className={`relative z-10 h-screen overflow-y-auto scroll-smooth ${snap ? 'snap-y snap-mandatory' : ''}`}
        onScroll={event => setShowScrollHint(event.currentTarget.scrollTop < 48)}
      >
        {children}
      </div>
    </main>
  )
}

export function AigcExhibitionPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof aigcImages)[number] | null>(null)

  useEffect(() => {
    if (!selectedImage) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <>
      <ExhibitionChrome
        title="AIGC Works"
        snap={false}
        action={
          <a
            href="https://canva.link/05ejtqofermnth7"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass fixed right-5 top-5 z-30 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/82 transition-colors hover:text-white"
          >
            <span className="relative z-10">View more works</span>
            <ArrowUpRight className="relative z-10 h-4 w-4" strokeWidth={1.7} />
          </a>
        }
      >
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-24 md:pt-28" aria-label="AIGC image gallery">
          <div className="mb-6 md:mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-white/48">Selected experiments</p>
            <h2 className="mt-3 text-3xl font-normal tracking-tight md:text-5xl">AIGC Gallery</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {aigcImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`exhibition-glass-frame group relative overflow-hidden rounded-[26px] p-2 text-left md:rounded-[32px] md:p-3 ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                aria-label={`View ${image.title} full size`}
              >
                <div className={`relative overflow-hidden rounded-[20px] md:rounded-[24px] ${index === 0 ? 'aspect-[21/7]' : 'aspect-video'}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Expand className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <section id="wes-anderson" className="pt-24 md:pt-32" aria-labelledby="wes-anderson-title">
            <div className="mb-6 text-center md:mb-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#f7d6c4]/70 md:text-xs">New collection</p>
              <h2
                id="wes-anderson-title"
                className="mt-3 font-serif text-4xl font-normal tracking-[0.04em] text-[#fff3df] md:text-6xl"
              >
                Wes Anderson
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-5">
              {wesMedia.map(media => (
                <button
                  key={media.src}
                  type="button"
                  onClick={() => setSelectedImage(media)}
                  className="exhibition-glass-frame group relative overflow-hidden rounded-[26px] p-2 text-left md:rounded-[36px] md:p-3"
                  aria-label={`View ${media.title} full size`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[20px] md:rounded-[28px]">
                    <img
                      src={media.src}
                      alt={media.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Expand className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </section>
      </ExhibitionChrome>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="liquid-glass absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full text-white/82 transition-colors hover:text-white"
            aria-label="Close image viewer"
          >
            <X className="relative z-10 h-5 w-5" strokeWidth={1.7} />
          </button>
          <figure className="max-w-7xl" onClick={event => event.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[84vh] max-w-full rounded-2xl object-contain shadow-2xl" />
          </figure>
        </div>
      )}
    </>
  )
}

export function ProductDesignPage() {
  return (
    <ExhibitionChrome title="Product Design">
      {productWorks.map((product, index) => (
        <section key={product.title} className="flex min-h-screen snap-start items-center justify-center px-5 py-20">
          <article className="grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.68fr)] lg:items-center">
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${product.title} website`}
              className="exhibition-glass-frame group block rounded-[30px] p-3 transition-transform duration-300 hover:-translate-y-1 md:rounded-[38px] md:p-4"
            >
              <img
                src={product.src}
                alt={`${product.title} homepage`}
                className="relative z-10 max-h-[72vh] w-full rounded-[22px] object-contain transition-transform duration-300 group-hover:scale-[1.01] md:rounded-[28px]"
              />
              <span
                className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </a>

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
