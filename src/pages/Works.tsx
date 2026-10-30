import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, ChevronDown, Expand, Film, PanelsTopLeft, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'
import WorkflowShowcase from '../components/WorkflowShowcase'
import OffHoursProjectCard from '../components/OffHoursProjectCard'
import DaymarkProjectCard from '../components/DaymarkProjectCard'

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

type GalleryImage = {
  src: string
  full: string
  title: string
}

// Grid tiles load the -sm.webp copy; the viewer loads the full-resolution WebP (or the original JPG).
const galleryImage = (path: string, title: string): GalleryImage => {
  const base = path.replace(/\.(png|jpg)$/, '')
  return { src: withBase(`${base}-sm.webp`), full: withBase(path.endsWith('.png') ? `${base}.webp` : path), title }
}

const narrativeTriptychs: GalleryImage[] = [
  galleryImage('images/aigc/absurd-comedy-triptych.png', 'Absurd Comedy'),
  galleryImage('images/aigc/american-football-optical-pressure-triptych.jpg', 'American Football: Optical Pressure'),
  galleryImage('images/aigc/anthro-harbor-theater-triptych.jpg', 'Anthro Harbor Theater'),
  galleryImage('images/aigc/apartment-family-table-triptych.jpg', 'Apartment Family Table'),
  galleryImage('images/aigc/army-fisheye-first-person-triptych.png', 'Army: Fisheye First Person'),
  galleryImage('images/aigc/bagua-sea-platform-triptych.jpg', 'Bagua Sea Platform'),
  galleryImage('images/aigc/blue-sea-large-ship-triptych.png', 'Blue Sea, Large Ship'),
  galleryImage('images/aigc/cabaret-aftermath-triptych.png', 'Cabaret Aftermath'),
  galleryImage('images/aigc/courthouse-witness-triptych.png', 'Courthouse Witness'),
  galleryImage('images/aigc/dumpling-shop-triptych.png', 'Dumpling Shop'),
  galleryImage('images/aigc/eastern-palace-triptych.png', 'Eastern Palace'),
  galleryImage('images/aigc/go-shadow-ink-triptych.png', 'Go: Shadow & Ink'),
  galleryImage('images/aigc/green-girl-wide-aperture-triptych.png', 'Green Girl: Wide Aperture'),
  galleryImage('images/aigc/green-water-memory-triptych.png', 'Green Water Memory'),
  galleryImage('images/aigc/hotel-pink-ritual-triptych.jpg', 'Hotel Pink Ritual'),
  galleryImage('images/aigc/industrial-ensemble-ledger-triptych.png', 'Industrial Ensemble Ledger'),
  galleryImage('images/aigc/journey-west-original-epic-triptych.png', 'Journey West: Original Epic'),
  galleryImage('images/aigc/laundromat-note-triptych.jpg', 'Laundromat Note'),
  galleryImage('images/aigc/mexico-rodeo-family-rope-triptych.jpg', 'Mexico Rodeo: Family Rope'),
  galleryImage('images/aigc/monastic-observatory-window-triptych.jpg', 'Monastic Observatory Window'),
  galleryImage('images/aigc/rain-courtyard-ledger-triptych.jpg', 'Rain Courtyard Ledger'),
  galleryImage('images/aigc/scifi-ice-ring-mine-city-triptych.jpg', 'Sci-Fi Ice Ring Mine City'),
  galleryImage('images/aigc/scifi-underwater-football-triptych.jpg', 'Sci-Fi Underwater Football'),
  galleryImage('images/aigc/seventies-tv-dance-marathon-triptych.jpg', 'Seventies TV Dance Marathon'),
  galleryImage('images/aigc/train-window-departure-triptych.jpg', 'Train Window Departure'),
  galleryImage('images/aigc/tropical-court-greenhouse-triptych.jpg', 'Tropical Court Greenhouse'),
  galleryImage('images/aigc/venice-palace-triptych.jpg', 'Venice Palace'),
]

const aigcImages: GalleryImage[] = [
  galleryImage('images/aigc/aigc-01.png', 'AIGC Study 01'),
  galleryImage('images/aigc/aigc-02.png', 'AIGC Study 02'),
  galleryImage('images/aigc/aigc-03.png', 'AIGC Study 03'),
  galleryImage('images/aigc/aigc-04.png', 'AIGC Study 04'),
  galleryImage('images/aigc/aigc-05.png', 'AIGC Study 05'),
  galleryImage('images/aigc/120232_00001_.png', 'AIGC Study 06'),
  galleryImage('images/aigc/121012_00001_.png', 'AIGC Study 07'),
  galleryImage('images/aigc/121243_00001_.png', 'AIGC Study 08'),
  galleryImage('images/aigc/121444_00001_.png', 'AIGC Study 09'),
  galleryImage('images/aigc/121829_00001_.png', 'AIGC Study 10'),
  galleryImage('images/aigc/122018_00001_.png', 'AIGC Study 11'),
  galleryImage('images/aigc/122114_00001_.png', 'AIGC Study 12'),
  galleryImage('images/aigc/122336_00001_.png', 'AIGC Study 13'),
  galleryImage('images/aigc/122449_00001_.png', 'AIGC Study 14'),
  galleryImage('images/aigc/122622_00001_.png', 'AIGC Study 15'),
]

const wesMedia: GalleryImage[] = [
  galleryImage('images/Wes/120426_00001_.png', 'Wes Anderson Collection 01'),
  galleryImage('images/Wes/131410_00001_.png', 'Wes Anderson Collection 02'),
  galleryImage('images/Wes/134124_00001_.png', 'Wes Anderson Collection 03'),
  galleryImage('images/Wes/134251_00001_.png', 'Wes Anderson Collection 04'),
  galleryImage('images/Wes/134648_00001_.png', 'Wes Anderson Collection 05'),
  galleryImage('images/Wes/140254_00001_.png', 'Wes Anderson Collection 06'),
  galleryImage('images/Wes/140924_00001_.png', 'Wes Anderson Collection 07'),
  galleryImage('images/Wes/141254_00001_.png', 'Wes Anderson Collection 08'),
]

const wesVideo = withBase('images/Wes/7月22日.mp4')
const featuredVideo = {
  src: withBase('videos/Resonance.mp4'),
  title: 'Resonance',
}

const videoWorks = [
  { src: withBase('videos/music.mp4'), title: 'MV Demo' },
  { src: withBase('videos/Black woman.mp4'), title: 'Mood Fluctuation Test' },
  { src: withBase('videos/春を盗む風_1_prob4.mp4'), title: 'Music MV' },
  { src: withBase('videos/8月3日.mp4'), title: 'Micro-expressions' },
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
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <Link
        to="/"
        aria-label="Back to home"
        className="fixed-safe-top-left liquid-glass fixed z-30 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white/82 transition-colors hover:text-white active:scale-95"
      >
        <ArrowLeft className="relative z-10 h-4 w-4" strokeWidth={1.7} />
        <span className="relative z-10 hidden sm:inline">Back home</span>
      </Link>

      <section className="relative z-10 flex min-h-dvh flex-col justify-center px-5 pb-10 pt-24 sm:px-8 md:py-24">
        <div className="mx-auto mb-8 w-full max-w-6xl md:mb-12">
          <h1 className="text-balance text-4xl font-normal leading-[1.02] tracking-[-0.025em] md:text-6xl">Selected work</h1>
          <p className="mt-4 max-w-2xl text-sm leading-[1.6] text-white/62 md:text-[17px]">
            Three ways into the practice: generative image and video, cinematic production, and product design.
          </p>
        </div>

        <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-4 md:grid-cols-3 md:gap-6">
          {works.map(work => {
            const Icon = work.icon
            const cardContent = (
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center justify-between md:mb-8">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                      {work.label}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h2 className="mt-5 text-3xl font-normal leading-none tracking-tight text-white md:mt-8 md:text-[40px]">
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
              'works-glass-card group block min-h-[220px] min-w-0 rounded-[24px] p-5 md:min-h-[360px] md:rounded-[28px] md:p-7'

            return work.href ? (
              <a
                key={work.title}
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={work.title}
                to={work.to ?? '/works'}
                className={className}
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
        className="fixed-safe-top-left liquid-glass fixed z-30 inline-flex min-h-11 items-center rounded-full px-4 text-sm text-white/82 transition-colors hover:text-white active:scale-95"
      >
        <span className="relative z-10 hidden sm:inline">Back to works</span>
        <ArrowLeft className="relative z-10 h-4 w-4 sm:hidden" strokeWidth={1.7} aria-hidden="true" />
      </Link>
      {action}

      <h1 className="sr-only">{title}</h1>
      <div
        className={`fixed-safe-bottom-center liquid-glass pointer-events-none fixed z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-white/82 transition-all duration-300 md:px-5 ${
          showScrollHint ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
        aria-label="Scroll down to view more works"
      >
        <span className="relative z-10 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] md:text-xs">
          Scroll for more works
        </span>
        <ChevronDown className="relative z-10 h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div
        className={`relative z-10 h-dvh overflow-y-auto scroll-smooth ${snap ? 'lg:snap-y lg:snap-mandatory' : ''}`}
        onScroll={event => setShowScrollHint(event.currentTarget.scrollTop < 48)}
      >
        {children}
      </div>
    </main>
  )
}

export function AigcExhibitionPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

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
            className="fixed-safe-top-right liquid-glass fixed z-30 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white/82 transition-colors hover:text-white active:scale-95"
          >
            <span className="relative z-10 hidden sm:inline">View more works</span>
            <ArrowUpRight className="relative z-10 h-4 w-4" strokeWidth={1.7} />
          </a>
        }
      >
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-24 md:pt-28" aria-label="AIGC image gallery">
          <section className="mb-24 md:mb-32" aria-labelledby="videos-title">
            <h2 id="videos-title" className="text-balance text-3xl font-normal tracking-tight md:text-5xl">
              Videos
            </h2>
            <div className="exhibition-glass-frame mt-6 overflow-hidden rounded-[26px] p-2 md:mt-8 md:rounded-[36px] md:p-3">
              <video
                src={featuredVideo.src}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full rounded-[20px] bg-black object-contain md:rounded-[28px]"
                aria-label={`${featuredVideo.title} video`}
              >
                Your browser does not support the video tag.
              </video>
              <p className="px-3 pb-2 pt-4 text-sm uppercase tracking-[0.18em] text-white/62 md:px-4">
                {featuredVideo.title}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              {videoWorks.map(video => (
                <div
                  key={video.src}
                  className="exhibition-glass-frame overflow-hidden rounded-[26px] p-2 md:rounded-[30px] md:p-3"
                >
                  <video
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full rounded-[20px] bg-black object-contain md:rounded-[22px]"
                    aria-label={`${video.title} video`}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="px-3 pb-2 pt-4 text-sm uppercase tracking-[0.18em] text-white/62">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <WorkflowShowcase />

          <section aria-labelledby="narrative-triptychs-title">
            <div className="mb-6 md:mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/48">New collection · 27 works</p>
              <h2 id="narrative-triptychs-title" className="mt-3 text-3xl font-normal tracking-tight md:text-5xl">
                Narrative Triptychs
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {narrativeTriptychs.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="exhibition-glass-frame group relative overflow-hidden rounded-[26px] p-2 text-left md:rounded-[30px] md:p-3"
                  aria-label={`View ${image.title} full size`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-black/30 md:rounded-[22px]">
                    <img
                      src={image.src}
                      alt={image.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                      <span className="text-sm leading-tight text-white/90">{image.title}</span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Expand className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="aigc-gallery" className="pt-24 md:pt-32" aria-labelledby="selected-experiments-title">
            <div className="mb-6 md:mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/48">Selected experiments · 4096 px SeedVR2 masters</p>
              <h2
                id="selected-experiments-title"
                className="mt-3 text-3xl font-normal tracking-tight md:text-5xl"
              >
                AIGC Gallery
              </h2>
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
                  <div
                    className={`relative overflow-hidden rounded-[20px] md:rounded-[24px] ${index === 0 ? 'aspect-[21/7]' : 'aspect-video'}`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Expand className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="wes-anderson" className="pt-24 md:pt-32" aria-labelledby="wes-anderson-title">
            <div className="mb-6 text-center md:mb-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#f7d6c4]/70 md:text-xs">New collection</p>
              <h2
                id="wes-anderson-title"
                className="mt-3 font-serif text-4xl font-normal tracking-[0.04em] text-[#fff3df] md:text-6xl"
              >
                Skill: Wes Anderson Style
              </h2>
            </div>

            <div className="exhibition-glass-frame mb-5 overflow-hidden rounded-[26px] p-2 md:rounded-[36px] md:p-3">
              <video
                src={wesVideo}
                controls
                playsInline
                preload="metadata"
                className="max-h-[78vh] w-full rounded-[20px] bg-black object-contain md:rounded-[28px]"
                aria-label="Wes Anderson style video showcase"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {wesMedia.map(media => (
                <button
                  key={media.src}
                  type="button"
                  onClick={() => setSelectedImage(media)}
                  className="exhibition-glass-frame group relative overflow-hidden rounded-[26px] p-2 text-left md:rounded-[36px] md:p-3"
                  aria-label={`View ${media.title} full size`}
                >
                  <div className="relative aspect-[137/100] overflow-hidden rounded-[20px] md:rounded-[28px]">
                    <img
                      src={media.src}
                      alt={media.title}
                      loading="lazy"
                      decoding="async"
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
            className="fixed-safe-top-right liquid-glass absolute z-10 grid h-11 w-11 place-items-center rounded-full text-white/82 transition-colors hover:text-white active:scale-95"
            aria-label="Close image viewer"
          >
            <X className="relative z-10 h-5 w-5" strokeWidth={1.7} />
          </button>
          <figure className="max-w-7xl" onClick={event => event.stopPropagation()}>
            <img src={selectedImage.full} alt={selectedImage.title} className="max-h-[84vh] max-w-full rounded-2xl object-contain shadow-2xl" />
          </figure>
        </div>
      )}
    </>
  )
}

export function ProductDesignPage() {
  return (
    <ExhibitionChrome title="Product Design">
      <section className="flex min-h-dvh items-center justify-center px-5 py-24 lg:snap-start" aria-label="OFF HOURS campaign and product design case study">
        <div className="w-full min-w-0 max-w-6xl"><OffHoursProjectCard /></div>
      </section>
      <section className="flex min-h-dvh items-center justify-center px-5 py-24 lg:snap-start" aria-label="DAYMARK email design case study">
        <div className="w-full min-w-0 max-w-6xl"><DaymarkProjectCard /></div>
      </section>
      {productWorks.map(product => (
        <section key={product.title} className="flex min-h-dvh items-center justify-center px-5 py-24 lg:snap-start">
          <article className="grid w-full min-w-0 max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.68fr)] lg:items-center">
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${product.title} website`}
              className="exhibition-glass-frame group order-2 block min-w-0 rounded-[30px] p-3 transition-transform duration-300 hover:-translate-y-1 md:rounded-[38px] md:p-4 lg:order-1"
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

            <div className="exhibition-glass-frame order-1 min-w-0 rounded-[30px] p-6 md:rounded-[38px] md:p-8 lg:order-2">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Product Design</p>
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
