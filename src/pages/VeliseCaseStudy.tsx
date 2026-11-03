import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Download, Expand } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { veliseAsset, veliseColors, veliseDownload, veliseMaterials, velisePasses, veliseVideo } from '../data/velise'
import './velise.css'

type Material = (typeof veliseMaterials)[number]

function ZoomImage({ src, full, alt, title, className = '', width, height }: { src: string; full?: string; alt: string; title: string; className?: string; width: number; height: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={`vl-zoom ${className}`} aria-label={`Enlarge ${title}`}>
          <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
          <span className="vl-zoom-action"><Expand size={16} aria-hidden="true" /><span>Full view</span></span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[94dvh] w-[calc(100vw-24px)] max-w-[1400px] flex-col gap-4 overflow-hidden rounded-xl border-[#ddd2c4] bg-[#f3eee6] p-5 text-[#231419] sm:p-7">
        <DialogTitle className="pr-9 text-lg font-medium">{title}</DialogTitle>
        <DialogDescription className="text-sm leading-6 text-[#6d5a62]">Path-traced render of the VELISE 3D scene.</DialogDescription>
        <div className="min-h-0 overflow-auto" tabIndex={0} aria-label="Full image preview; scroll to explore">
          <img src={full ?? src} alt={alt} className="mx-auto block h-auto max-w-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DownloadLink({ href, children, meta }: { href: string; children: ReactNode; meta: string }) {
  return <a href={href} download><Download size={16} aria-hidden="true" />{children}<span>{meta}</span></a>
}

function MaterialStudies() {
  const [index, setIndex] = useState(0)
  const controls = useRef<(HTMLButtonElement | null)[]>([])
  const material: Material = veliseMaterials[index]

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % veliseMaterials.length
    else if (event.key === 'ArrowLeft') next = (index + veliseMaterials.length - 1) % veliseMaterials.length
    else return
    event.preventDefault()
    setIndex(next)
    controls.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div className="vl-materials">
      <ZoomImage src={veliseAsset(`${material.image}-1200`)} alt={material.alt} title={`${material.label} study`} width={1200} height={1500} className="vl-material-image" />
      <div className="vl-material-copy">
        <div className="vl-material-tabs" role="group" aria-label="Materials; use arrow keys to switch" onKeyDown={handleKeyDown}>
          {veliseMaterials.map((item, i) => (
            <button key={item.id} type="button" ref={node => { controls.current[i] = node }} onClick={() => setIndex(i)} aria-pressed={index === i}>{item.label}</button>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true">
          <h3>{material.title}</h3>
          <p>{material.description}</p>
          <ul>{material.specs.map(spec => <li key={spec}>{spec}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}

function ClayCompare() {
  const [split, setSplit] = useState(50)
  return (
    <figure className="vl-compare">
      <div className="vl-compare-frame" style={{ '--split': `${split}%` } as CSSProperties}>
        <img src={veliseAsset('hero-1200')} alt="Final render: amber glass bottle with fig cap on a travertine plinth." width={1200} height={1500} loading="lazy" decoding="async" />
        <img className="vl-compare-top" src={veliseAsset('clay-1200')} alt="Clay render from the same camera, showing form and light only." width={1200} height={1500} loading="lazy" decoding="async" />
        <span className="vl-compare-line" aria-hidden="true" />
      </div>
      <label className="vl-compare-control">
        <span>Clay</span>
        <input type="range" min={0} max={100} value={split} onChange={event => setSplit(Number(event.target.value))} aria-label="Slide between the clay render and the final render" />
        <span>Final</span>
      </label>
      <figcaption>Same camera, same lights. The clay pass checks form and shadow before any material is set.</figcaption>
    </figure>
  )
}

export default function VeliseCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'VELISE | Fragrance packaging visualization | Carlton Shi'
    if (meta) meta.content = 'A fragrance packaging concept built in 3D and path traced: glass flacon, resin cap and foil-stamped carton, with a turntable loop and passes for an AI pass.'
    window.scrollTo(0, 0)
    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [])

  return (
    <main className="vl-page">
      <a className="vl-skip-link" href="#velise-content">Skip to case study</a>
      <header className="vl-site-bar">
        <Link to="/works/product-design" className="vl-back"><ArrowLeft size={16} aria-hidden="true" />Product Design</Link>
        <Link to="/" className="vl-owner">Carlton Shi</Link>
        <a href={veliseDownload('VELISE_bottle-and-carton.glb')} download>3D model (.glb)<Download size={16} aria-hidden="true" /></a>
      </header>

      <article id="velise-content">
        <section className="vl-hero vl-container">
          <div className="vl-hero-copy">
            <p className="vl-label">VELISE Figue Ambrée / Self-initiated packaging concept</p>
            <h1>Amber, held in glass.</h1>
            <p className="vl-intro">A 50 ml fragrance flacon, resin cap and foil-stamped carton, modeled in 3D and path traced for client presentation. Glass, plastic and board in one pack.</p>
            <a href="#materials" className="vl-button">See the materials <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <img className="vl-hero-image" src={veliseAsset('hero-1200')} alt="VELISE eau de parfum: a heavy rectangular glass bottle of amber juice with a fig resin cap, on a travertine plinth." width={1200} height={1500} fetchPriority="high" />
        </section>

        <div className="vl-container">
          <dl className="vl-project-meta">
            <div><dt>Project</dt><dd>Fictional eau de parfum, 50 ml</dd></div>
            <div><dt>Focus</dt><dd>Packaging visualization: glass, resin and board</dd></div>
            <div><dt>Deliverables</dt><dd>6 stills, 5-second loop, 3D model, AI hand-off passes</dd></div>
          </dl>
          <nav className="vl-case-nav" aria-label="Case study sections">
            <a href="#brief">The brief</a><a href="#materials">Materials</a><a href="#lighting">Lighting</a><a href="#motion">Motion</a><a href="#ai-handoff">3D to AI</a><a href="#files">Files</a>
          </nav>
        </div>

        <section id="brief" className="vl-section vl-container vl-brief">
          <h2>One bottle. Three materials to get right.</h2>
          <div className="vl-prose-columns">
            <p>Fragrance is sold on surfaces: the weight of the glass, the color of the juice, the finish on the box. The brief was a single pack shot that holds up at full screen in a client presentation, and that a team can reuse for social and motion without rebuilding it.</p>
            <p>VELISE Figue Ambrée pairs warm amber juice with a fig resin cap and a soft-touch fig carton stamped in gold. Every piece was modeled to real dimensions so light behaves as it would on set.</p>
          </div>
          <div className="vl-swatches">{veliseColors.map(color => <div key={color.name}><span style={{ backgroundColor: color.hex }} aria-hidden="true" /><p>{color.name}<small>{color.hex}</small></p></div>)}</div>
        </section>

        <section id="materials" className="vl-dark">
          <div className="vl-section vl-container">
            <div className="vl-section-heading"><h2>Glass, resin, board.</h2><p>Each material has its own failure mode in a render. These are the settings that keep each one honest.</p></div>
            <MaterialStudies />
          </div>
        </section>

        <section className="vl-section vl-container" aria-labelledby="pack-title">
          <div className="vl-section-heading"><h2 id="pack-title">The pack shot.</h2><p>Bottle and carton together, for presentation boards and retail listings.</p></div>
          <ZoomImage src={veliseAsset('pack-1600')} alt="The VELISE bottle beside its fig carton with gold foil wordmark, on a travertine plinth." title="Pack shot" width={1600} height={1067} className="vl-wide" />
        </section>

        <section id="lighting" className="vl-section vl-container" aria-labelledby="lighting-title">
          <div className="vl-section-heading"><h2 id="lighting-title">Two moods, one model.</h2><p>A soft daylight set for product pages, and a dark set where rim strips draw the glass and a low backlight makes the juice glow.</p></div>
          <div className="vl-pair">
            <figure><ZoomImage src={veliseAsset('hero-1200')} alt="Daylight set: soft key from the left, strip lights on both glass edges." title="Daylight set" width={1200} height={1500} /><figcaption><span>Daylight</span><span>Key, two strips, top fill</span></figcaption></figure>
            <figure><ZoomImage src={veliseAsset('night-1200')} alt="Dark set: the bottle on black acrylic, edges drawn by two rim strips, juice lit from behind." title="Night set" width={1200} height={1500} /><figcaption><span>Night</span><span>Rim strips, backlight, black acrylic</span></figcaption></figure>
          </div>
          <ClayCompare />
        </section>

        <section id="motion" className="vl-dark">
          <div className="vl-section vl-container vl-motion">
            <div className="vl-section-heading"><h2>A loop for social.</h2><p>A 360° turntable in 4:5 at 720 × 900, 24 fps, built to loop without a cut. The same scene renders any angle a reveal or a cutdown needs.</p></div>
            <video src={veliseVideo} poster={veliseAsset('turn-poster')} autoPlay muted loop playsInline preload="metadata" aria-label="Turntable loop of the VELISE bottle rotating on its plinth." />
          </div>
        </section>

        <section id="ai-handoff" className="vl-section vl-container" aria-labelledby="ai-title">
          <div className="vl-section-heading"><h2 id="ai-title">Handed off for the AI pass.</h2><p>The 3D render fixes what must not change: the bottle, the label, the foil. AI then rebuilds what can, such as the set, the props and the light, without touching the product.</p></div>
          <div className="vl-passes">
            <figure><img src={veliseAsset('hero-600')} alt="Beauty render used as the image input." width={600} height={750} loading="lazy" decoding="async" /><figcaption><strong>Beauty</strong>Image-to-image input and first frame for video.</figcaption></figure>
            {velisePasses.map(pass => (
              <figure key={pass.id}><img src={veliseAsset(`pass-${pass.id}-600`)} alt={`${pass.label} pass of the hero camera.`} width={600} height={750} loading="lazy" decoding="async" /><figcaption><strong>{pass.label}</strong>{pass.note}</figcaption></figure>
            ))}
          </div>
          <div className="vl-handoff-notes">
            <p><strong>Still pipeline.</strong> A ComfyUI graph encodes the beauty render, guides the new set with the depth pass, and composites the original product back through the mask, so the pack stays exact while the scene changes.</p>
            <p><strong>Motion pipeline.</strong> The beauty frame goes to Sora, Veo, Kling or Runway as a first frame, with prompts that move only the camera and the light and keep the bottle, cap and label fixed.</p>
          </div>
        </section>

        <section className="vl-process">
          <div className="vl-section vl-container">
            <div className="vl-section-heading"><h2>How it was built.</h2></div>
            <div className="vl-process-grid">
              <article><h3>Model to spec.</h3><p>Bottle, juice, collar, cap and carton built at real dimensions in centimetres, with label and carton artwork drawn to print size.</p></article>
              <article><h3>Light for the material.</h3><p>Strip lights for glass edges, a grazing light for foil and deboss, and a backlight for the juice, each checked in clay first.</p></article>
              <article><h3>Hand off clean.</h3><p>Mask, depth and normal passes from the hero camera, plus a GLB of bottle and carton for KeyShot, Cinema 4D or Blender.</p></article>
            </div>
            <p className="vl-authorship">VELISE is a self-initiated portfolio concept. The brand and product are fictional. Images are path-traced renders of the 3D scene; there is no client work, physical sample or photography involved.</p>
          </div>
        </section>

        <section id="files" className="vl-section vl-container vl-final">
          <h2>Take the files.</h2>
          <p>Open the model in your own renderer, or run the AI pass from the hand-off kit.</p>
          <div className="vl-downloads">
            <DownloadLink href={veliseDownload('VELISE_bottle-and-carton.glb')} meta="glTF binary">3D model</DownloadLink>
            <DownloadLink href={veliseDownload('VELISE_AI-handoff-kit.zip')} meta="Passes, ComfyUI graph, prompts">AI hand-off kit</DownloadLink>
            <DownloadLink href={veliseVideo} meta="MP4, 5 s loop">Turntable</DownloadLink>
          </div>
        </section>
      </article>

      <footer className="vl-footer vl-container"><Link to="/works/product-design"><ArrowLeft size={16} aria-hidden="true" />More product design</Link><span>Carlton Shi / VELISE</span><Link to="/resume">View resume <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
    </main>
  )
}
