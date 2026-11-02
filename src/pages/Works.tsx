import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'
import { useRoomMotion } from '../lib/motion'
import WorkflowShowcase from '../components/WorkflowShowcase'
import OffHoursProjectCard from '../components/OffHoursProjectCard'
import DaymarkProjectCard from '../components/DaymarkProjectCard'
import { ContactSection, SiteBar, WorkPanels, frameX } from '../components/Room'

const poster = (file: string) => withBase(`images/posters/${file}.webp`)
const sectionGap = 'mt-[clamp(120px,14vw,220px)]'

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
  poster: poster('resonance'),
}

const videoWorks = [
  { src: withBase('videos/music.mp4'), title: 'MV Demo', poster: poster('music') },
  { src: withBase('videos/Black woman.mp4'), title: 'Mood Fluctuation Test', poster: poster('black-woman') },
  { src: withBase('videos/春を盗む風_1_prob4.mp4'), title: 'Music MV', poster: poster('music-mv') },
  { src: withBase('videos/8月3日.mp4'), title: 'Micro-expressions', poster: poster('micro-expressions') },
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

export function WorksPage() {
  const root = useRef<HTMLElement | null>(null)
  useRoomMotion(root)

  return (
    <main ref={root} className="room min-h-dvh">
      <SiteBar current="works" />
      <header data-reveal-group className={`grid gap-5 pb-[clamp(56px,7vw,96px)] pt-[clamp(40px,7vw,104px)] md:grid-cols-12 md:items-end ${frameX}`}>
        <h1 data-reveal className="t-head md:col-span-6">Selected work</h1>
        <p data-reveal className="t-lead text-room-ink md:col-span-6 md:col-start-7">
          Four ways into the practice: generative image and video, the ComfyUI pipelines behind them, cinematic production, and product design.
        </p>
      </header>
      <WorkPanels />
      <ContactSection />
    </main>
  )
}

function ExhibitionPage({
  title,
  intro,
  index,
  action,
  children,
}: {
  title: string
  intro: string
  index?: { href: string; label: string }[]
  /** The page's one primary action, set as the solid button under the intro. */
  action?: ReactNode
  children: ReactNode
}) {
  const root = useRef<HTMLElement | null>(null)
  useRoomMotion(root)

  return (
    <main ref={root} className="room min-h-dvh">
      <SiteBar current="works" />
      <header data-reveal-group className={`grid gap-5 pb-[clamp(40px,5vw,72px)] pt-[clamp(32px,4vw,64px)] md:grid-cols-12 md:items-end ${frameX}`}>
        <h1 data-reveal className="t-head md:col-span-6">{title}</h1>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="t-lead text-room-ink">{intro}</p>
          {index && (
            <nav data-reveal aria-label="On this page" className="mt-4 flex flex-wrap gap-x-6">
              {index.map(link => (
                <a key={link.href} href={link.href} className="room-link t-small text-room-link">
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          {action && (
            <div data-reveal className="mt-6">
              {action}
            </div>
          )}
        </div>
      </header>
      {children}
      <div className="h-[clamp(120px,14vw,220px)]" aria-hidden="true" />
      <ContactSection />
    </main>
  )
}

function SectionHead({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div data-reveal-group className="grid gap-4 md:grid-cols-12 md:items-end">
      <h2 id={id} data-reveal className="t-head md:col-span-6">
        {title}
      </h2>
      <p data-reveal className="t-body text-room-ink md:col-span-5 md:col-start-8">
        {children}
      </p>
    </div>
  )
}

function Film({ src, poster, title, className = '' }: { src: string; poster: string; title: string; className?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="none"
      className={`w-full bg-black object-contain ${className}`}
      aria-label={`${title} video`}
    >
      Your browser does not support the video tag.
    </video>
  )
}

function StillButton({ image, onOpen, className, aspect, fit = 'cover', caption = true }: {
  image: GalleryImage
  onOpen: (image: GalleryImage) => void
  className?: string
  aspect: string
  fit?: 'cover' | 'contain'
  caption?: boolean
}) {
  return (
    <button
      type="button"
      data-reveal-item
      onClick={() => onOpen(image)}
      className={`group block min-w-0 text-left ${className ?? ''}`}
      aria-label={`View ${image.title} full size`}
    >
      <span className={`block overflow-hidden bg-room-surface ${aspect}`}>
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full brightness-[0.9] transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:brightness-100 ${
            fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        />
      </span>
      {caption && (
        <span className="t-small mt-3 block text-room-ink decoration-1 underline-offset-[0.3em] group-hover:underline">
          {image.title}
        </span>
      )}
    </button>
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
      <ExhibitionPage
        title="AIGC Works"
        intro="Six films, six ComfyUI workflows and fifty stills, from narrative triptychs to a Wes Anderson style collection."
        index={[
          { href: '#videos', label: 'Videos' },
          { href: '#workflows', label: 'Workflows' },
          { href: '#narrative-triptychs', label: 'Triptychs' },
          { href: '#aigc-gallery', label: 'Gallery' },
          { href: '#wes-anderson', label: 'Wes Anderson' },
        ]}
        action={
          <a href="https://canva.link/05ejtqofermnth7" target="_blank" rel="noopener noreferrer" className="room-button">
            View more works
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </a>
        }
      >
        <section id="videos" className={frameX} aria-labelledby="videos-title">
          <SectionHead id="videos-title" title="Videos">
            Resonance runs 8 minutes 45 seconds. Four shorter studies follow it: a music video demo, a mood test, a music MV and micro-expressions.
          </SectionHead>

          <figure data-reveal-group className="mt-10 md:mt-14">
            <div data-reveal>
              <Film src={featuredVideo.src} poster={featuredVideo.poster} title={featuredVideo.title} className="aspect-video" />
            </div>
            <figcaption data-reveal className="t-small mt-3 text-room-ink">
              {featuredVideo.title}
            </figcaption>
          </figure>

          <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 md:mt-16 md:grid-cols-2">
            {videoWorks.map(video => (
              <figure key={video.src} data-reveal-item className="min-w-0">
                <Film src={video.src} poster={video.poster} title={video.title} className="aspect-video" />
                <figcaption className="t-small mt-3 text-room-ink">{video.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className={`${sectionGap} ${frameX}`}>
          <WorkflowShowcase />
        </div>

        <section id="narrative-triptychs" className={`${sectionGap} ${frameX}`} aria-labelledby="narrative-triptychs-title">
          <SectionHead id="narrative-triptychs-title" title="Narrative Triptychs">
            A new collection of 27 stories, each told in three frames.
          </SectionHead>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-14 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4">
            {narrativeTriptychs.map(image => (
              <StillButton key={image.src} image={image} onOpen={setSelectedImage} aspect="aspect-[3/4]" />
            ))}
          </div>
        </section>

        <section id="aigc-gallery" className={`${sectionGap} ${frameX}`} aria-labelledby="selected-experiments-title">
          <SectionHead id="selected-experiments-title" title="AIGC Gallery">
            Selected experiments, finished as 4096 px SeedVR2 masters.
          </SectionHead>

          <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            {aigcImages.map((image, index) => (
              <StillButton
                key={image.src}
                image={image}
                onOpen={setSelectedImage}
                caption={false}
                className={index === 0 ? 'md:col-span-2' : ''}
                aspect={index === 0 ? 'aspect-video md:aspect-[21/8]' : 'aspect-video'}
              />
            ))}
          </div>
        </section>

        <section id="wes-anderson" className={`${sectionGap} ${frameX}`} aria-labelledby="wes-anderson-title">
          <SectionHead id="wes-anderson-title" title="Skill: Wes Anderson Style">
            A new collection: one film and eight stills.
          </SectionHead>

          <div data-reveal-group className="mt-10 md:mt-14">
            <div data-reveal>
              <Film src={wesVideo} poster={poster('wes-film')} title="Wes Anderson style" className="max-h-[78vh]" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
            {wesMedia.map(media => (
              <StillButton key={media.src} image={media} onOpen={setSelectedImage} caption={false} aspect="aspect-[137/100]" />
            ))}
          </div>
        </section>
      </ExhibitionPage>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="fixed-safe-top-right absolute z-10 grid h-11 w-11 place-items-center rounded-full bg-room-surface text-room-ink transition-colors hover:bg-[#232326] active:scale-95"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" strokeWidth={1.7} />
          </button>
          <figure className="max-w-7xl" onClick={event => event.stopPropagation()}>
            <img src={selectedImage.full} alt={selectedImage.title} className="max-h-[84vh] max-w-full object-contain" />
            <figcaption className="t-small mt-3 text-room-ink">{selectedImage.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export function ProductDesignPage() {
  return (
    <ExhibitionPage
      title="Product Design"
      intro="Four concepts: a campaign with its Figma system, a welcome email journey and two AI products."
      action={
        <Link to="/works/off-hours" className="room-button">
          Open the OFF HOURS case study
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </Link>
      }
    >
      <section className={frameX} aria-label="OFF HOURS campaign and product design case study">
        <div data-reveal-group>
          <div data-reveal>
            <OffHoursProjectCard />
          </div>
        </div>
      </section>
      <section className={`${sectionGap} ${frameX}`} aria-label="DAYMARK email design case study">
        <div data-reveal-group>
          <div data-reveal>
            <DaymarkProjectCard reverse />
          </div>
        </div>
      </section>
      {productWorks.map((product, index) => (
        <section key={product.title} className={`${sectionGap} ${frameX}`} aria-labelledby={`product-${index}`}>
          <article data-reveal-group className="grid min-w-0 gap-8 md:grid-cols-12 md:items-center md:gap-5">
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${product.title} website`}
              data-reveal
              className={`group block min-w-0 overflow-hidden bg-room-surface md:col-span-7 ${index % 2 ? 'md:order-2 md:col-start-6' : ''}`}
            >
              <img
                src={product.src}
                alt={`${product.title} homepage`}
                loading="lazy"
                decoding="async"
                className="max-h-[72vh] w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </a>

            <div className={`min-w-0 md:col-span-4 ${index % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
              <h2 id={`product-${index}`} data-reveal className="t-head">
                {product.title}
              </h2>
              <p data-reveal className="t-lead mt-3 text-room-ink">
                {product.label}
              </p>
              <p data-reveal className="t-body mt-5 text-room-ink">
                {product.description}
              </p>
              <ul data-reveal className="t-body mt-5 list-disc space-y-1 pl-5 text-room-ink marker:text-room-dim">
                {product.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a data-reveal href={product.href} target="_blank" rel="noopener noreferrer" className="room-link mt-4 text-room-link">
                Open the site
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </article>
        </section>
      ))}
    </ExhibitionPage>
  )
}
