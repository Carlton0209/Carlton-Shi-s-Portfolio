import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Download, Expand } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { offHoursAsset, offHoursColors, offHoursDownload, offHoursLinks, offHoursViews } from '../data/offHours'
import './off-hours.css'

type View = (typeof offHoursViews)[number]

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>
}

function ZoomImage({ src, alt, title, className = '', previewSrcSet, previewSizes, description = 'OFF HOURS design preview. Scroll to see the full layout.' }: { src: string; alt: string; title: string; className?: string; previewSrcSet?: string; previewSizes?: string; description?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={`oh-zoom ${className}`} aria-label={`Enlarge ${title}`}>
          <img src={src} srcSet={previewSrcSet} sizes={previewSizes} alt={alt} loading="lazy" decoding="async" />
          <span className="oh-zoom-action"><Expand size={16} aria-hidden="true" /><span>Open full view</span></span>
        </button>
      </DialogTrigger>
      <DialogContent className="oh-dialog flex max-h-[94dvh] w-[calc(100vw-24px)] max-w-[1500px] flex-col gap-4 overflow-hidden rounded-xl border-[#c6cec4] bg-[#f1eee5] p-5 text-[#142d26] sm:p-7">
        <DialogTitle className="pr-9 text-lg font-medium">{title}</DialogTitle>
        <DialogDescription className="text-sm leading-6 text-[#52645a]">{description}</DialogDescription>
        <div className="min-h-0 overflow-auto" tabIndex={0} aria-label="Full image preview; scroll to explore">
          <img src={src} alt={alt} className="mx-auto block h-auto max-w-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProductGallery() {
  const [index, setIndex] = useState(0)
  const controls = useRef<(HTMLButtonElement | null)[]>([])
  const view: View = offHoursViews[index]

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % offHoursViews.length
    else if (event.key === 'ArrowLeft') next = (index + offHoursViews.length - 1) % offHoursViews.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = offHoursViews.length - 1
    else return
    event.preventDefault()
    setIndex(next)
    controls.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div className="oh-gallery">
      <div className="oh-gallery-visual">
        <ZoomImage src={offHoursAsset(`daypack-${view.id}-1200`)} previewSrcSet={`${offHoursAsset(`daypack-${view.id}-600`)} 600w, ${offHoursAsset(`daypack-${view.id}-1200`)} 1200w`} previewSizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 58vw, 780px" alt={view.alt} title={`${view.label} product view`} className="oh-product-main" description="AI-assisted product concept image. The back view interprets construction not visible in the original reference." />
        <div className="oh-view-controls" role="group" aria-label="Product views; use arrow keys to switch" onKeyDown={handleKeyDown}>
          {offHoursViews.map((item, i) => (
            <button key={item.id} type="button" ref={node => { controls.current[i] = node }} onClick={() => setIndex(i)} aria-pressed={index === i} aria-label={`Show ${item.label.toLowerCase()} view`}>
              <img src={offHoursAsset(`daypack-${item.id}-200`)} alt="" width={200} height={200} loading="lazy" decoding="async" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="oh-gallery-copy" aria-live="polite" aria-atomic="true">
        <p className="oh-label">{view.label} view</p>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <p className="oh-small">Select a view to explore the product.</p>
      </div>
    </div>
  )
}

function CampaignFormats() {
  const [tone, setTone] = useState<'paper' | 'pine'>('paper')
  const formats = [{ id: 'square', label: 'Square', size: '1080 × 1080' }, { id: 'portrait', label: 'Portrait', size: '1080 × 1350' }, { id: 'story', label: 'Story', size: '1080 × 1920' }] as const

  return (
    <div>
      <div className="oh-tone-controls" role="group" aria-label="Campaign color treatment">
        {(['paper', 'pine'] as const).map(item => <button key={item} type="button" aria-pressed={tone === item} onClick={() => setTone(item)}>{item === 'paper' ? 'Paper treatment' : 'Pine treatment'}</button>)}
      </div>
      <div className="oh-ad-grid">
        {formats.map(format => (
          <figure key={format.id}>
            <ZoomImage src={offHoursAsset(`ad-${format.id}-${tone}`)} alt={`${format.label} OFF HOURS campaign ad in the ${tone} color treatment.`} title={`${format.label} campaign ad, ${tone}`} />
            <figcaption><span>{format.label}</span><span>{format.size}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function OffHoursCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = 'OFF HOURS | Figma campaign case study | Carlton Shi'
    if (meta) meta.content = 'An AI-assisted outdoor product concept: six product views, reusable Figma components, responsive pages, campaign creative and interactive prototypes.'
    window.scrollTo(0, 0)
    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [])

  return (
    <main className="oh-page">
      <a className="oh-skip-link" href="#off-hours-content">Skip to case study</a>
      <header className="oh-site-bar">
        <Link to="/works" className="oh-back"><ArrowLeft size={16} aria-hidden="true" />All work</Link>
        <Link to="/" className="oh-owner">Carlton Shi</Link>
        <ExternalLink href={offHoursLinks.file} className="oh-file-link">Open Figma</ExternalLink>
      </header>

      <article id="off-hours-content">
        <section className="oh-hero oh-container">
          <div className="oh-hero-copy">
            <p className="oh-label">OFF HOURS / Self-initiated concept</p>
            <h1>Make room<br />for outside.</h1>
            <p className="oh-intro">A daypack concept explored through product imagery, a reusable Figma system and a campaign that travels across formats.</p>
            <a href="#product-views" className="oh-button">Explore the product <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <img className="oh-hero-image" src={offHoursAsset('daypack-lifestyle-hero')} alt="An adult wearing the OFF HOURS daypack overlooks an autumn lake." width={1440} height={960} fetchPriority="high" />
        </section>

        <div className="oh-container">
          <dl className="oh-project-meta">
            <div><dt>Project</dt><dd>Fictional outdoor accessories brand</dd></div>
            <div><dt>Focus</dt><dd>Product visuals, campaign design, Figma systems</dd></div>
            <div><dt>Approach</dt><dd>AI-assisted imagery and design exploration</dd></div>
          </dl>
          <nav className="oh-case-nav" aria-label="Case study sections">
            <a href="#the-idea">The idea</a><a href="#product-views">Product views</a><a href="#figma-system">Figma system</a><a href="#campaign">Campaign</a><a href="#project-files">Project files</a>
          </nav>
        </div>

        <section id="the-idea" className="oh-section oh-container oh-brief">
          <h2>One small pack.<br />A bigger visual story.</h2>
          <div className="oh-prose-columns">
            <p>The brief was to create a coherent campaign for a fictional 18L daypack, aimed at people making room for short escapes from the city. The product needed to read clearly on its own and feel at home in a larger brand world.</p>
            <p>The visual direction pairs pine green and warm paper with condensed headlines and a small rust accent. A single reference image anchors the product identity, while additional views explain form, texture, scale and context.</p>
          </div>
        </section>

        <section id="product-views" className="oh-section oh-container">
          <div className="oh-section-heading"><h2>Six views. Six different jobs.</h2><p>Each image answers a different question about the same product, from its silhouette to the way it sits on a person.</p></div>
          <ProductGallery />
          <p className="oh-image-note">AI-assisted concept imagery, directed from the original product reference. The rear construction is a conceptual interpretation.</p>
          <ExternalLink href={offHoursLinks.perspectives} className="oh-text-link">View the art-direction sheet in Figma</ExternalLink>
        </section>

        <section id="figma-system" className="oh-system">
          <div className="oh-container oh-section">
            <div className="oh-section-heading"><h2>A system behind the images.</h2><p>Shared foundations keep the campaign consistent. Components make it possible to change content, format and tone while retaining the brand.</p></div>
            <div className="oh-system-metrics">
              <div><strong>33</strong><span>Color, spacing and radius variables</span></div>
              <div><strong>7</strong><span>Shared text styles</span></div>
              <div><strong>12</strong><span>Gallery variants across two sizes</span></div>
            </div>
            <div className="oh-swatch-grid">{offHoursColors.map(color => <div key={color.name}><span style={{ backgroundColor: color.hex }} aria-hidden="true" /><p>{color.name}<small>{color.hex}</small></p></div>)}</div>
            <ZoomImage src={offHoursAsset('components')} alt="Native Figma component showcase with editable headlines, CTA properties, campaign formats and button variants." title="Figma components and editable properties" />
            <div className="oh-system-notes">
              <p><strong>Reusable by design.</strong> Buttons have tone, size and label properties. Ads expose headline, supporting copy and CTA visibility. The gallery connects six views with a selected outline and matching caption.</p>
              <p><strong>Editable in Figma.</strong> Text, Auto Layout containers, components and instances stay native. The working file includes both the original campaign and the expanded product presentation.</p>
            </div>
            <ExternalLink href={offHoursLinks.components} className="oh-text-link">Inspect the components in Figma</ExternalLink>
          </div>
        </section>

        <section className="oh-section oh-container" aria-labelledby="responsive-title">
          <div className="oh-section-heading"><h2 id="responsive-title">Same product. Different rhythm.</h2><p>Desktop gives the product and its story room to sit side by side. Mobile brings the headline forward and stacks the details into a clear reading order.</p></div>
          <div className="oh-responsive-grid">
            <figure><ZoomImage src={offHoursAsset('product-desktop')} alt="Desktop product page with a six-image gallery, product information and detail sections." title="Full desktop product page" className="oh-layout-preview oh-desktop-preview" /><figcaption><span>Desktop / 1440px</span><ExternalLink href={offHoursLinks.desktop}>Open prototype</ExternalLink></figcaption></figure>
            <figure><ZoomImage src={offHoursAsset('product-mobile')} alt="Mobile product page with the headline above the gallery and stacked product stories." title="Full mobile product page" className="oh-layout-preview oh-mobile-preview" /><figcaption><span>Mobile / 390px</span><ExternalLink href={offHoursLinks.mobile}>Open prototype</ExternalLink></figcaption></figure>
          </div>
          <div className="oh-responsive-copy"><p>The gallery uses 680px and 342px variants. Six thumbnails remain visible in both layouts; the main image, active outline and caption change together.</p><p>The prototypes add thumbnail switching, vertical scrolling and a CTA that moves to the detail section. Open either layout above for a closer look.</p></div>
        </section>

        <section id="campaign" className="oh-section oh-container" aria-labelledby="campaign-title">
          <div className="oh-section-heading"><h2 id="campaign-title">A campaign that adapts.</h2><p>Three aspect ratios and two color treatments share the same message. Each format adjusts the image area and the order of information.</p></div>
          <CampaignFormats />
        </section>

        <section className="oh-email-section">
          <div className="oh-section oh-container">
            <div className="oh-section-heading"><h2>Carry the idea into the inbox.</h2><p>Desktop and mobile email layouts reuse the campaign language, product image and feature modules, with a different arrangement for each width.</p></div>
            <div className="oh-email-grid">
              <figure><ZoomImage src={offHoursAsset('email-desktop')} alt="Desktop marketing email for the OFF HOURS daypack." title="Desktop campaign email" /><figcaption>Desktop email / 640px</figcaption></figure>
              <figure><ZoomImage src={offHoursAsset('email-mobile')} alt="Mobile marketing email with vertically stacked feature content." title="Mobile campaign email" /><figcaption>Mobile email / 375px</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="oh-section oh-container" aria-labelledby="storyboard-title">
          <div className="oh-section-heading"><h2 id="storyboard-title">Four beats for a six-second story.</h2><p>A static storyboard moves from a short hook to product context, the campaign message and a closing action.</p></div>
          <div className="oh-story-grid">{['The hook', 'The product', 'The message', 'The action'].map((label, i) => <figure key={label}><img src={offHoursAsset(`story-${i + 1}`)} alt={`OFF HOURS static storyboard frame: ${label.toLowerCase()}.`} width={540} height={960} loading="lazy" decoding="async" /><figcaption>{label}</figcaption></figure>)}</div>
          <p className="oh-image-note">Static concept frames with production timings. A finished campaign video has not been produced.</p>
        </section>

        <section className="oh-process-section">
          <div className="oh-section oh-container">
            <div className="oh-section-heading"><h2>From reference to a working system.</h2><p>The project connects visual exploration with practical production structure.</p></div>
            <div className="oh-process-grid">
              <article><h3>Anchor the product.</h3><p>Use the original image to keep the pine fabric, roll-top, central strap, front pocket and orange pull recognizable across new views.</p></article>
              <article><h3>Give every image a purpose.</h3><p>Separate catalog clarity, material detail and lifestyle context, then choose the framing that helps each channel communicate.</p></article>
              <article><h3>Build for adaptation.</h3><p>Carry the direction into variables, components, responsive layouts and linked prototypes. Review the rendered frames and variant behavior.</p></article>
            </div>
            <p className="oh-authorship">OFF HOURS is a self-initiated, AI-assisted portfolio concept. The brand and product are fictional. The work includes no client campaign results, user research or physical product validation.</p>
          </div>
        </section>

        <section id="project-files" className="oh-section oh-container oh-final">
          <h2>Explore the working file.</h2>
          <p>Inspect the editable layers, switch component properties and try the product prototypes.</p>
          <div className="oh-final-actions">
            <ExternalLink href={offHoursLinks.file} className="oh-button">Open Figma project</ExternalLink>
            <ExternalLink href={offHoursLinks.desktop} className="oh-button oh-button-secondary">Desktop prototype</ExternalLink>
            <ExternalLink href={offHoursLinks.mobile} className="oh-button oh-button-secondary">Mobile prototype</ExternalLink>
          </div>
          <div className="oh-downloads"><a href={offHoursDownload('OFF-HOURS_Product-Views.pdf')} download><Download size={16} aria-hidden="true" />Product perspectives PDF <span>6 pages</span></a><a href={offHoursDownload('OFF-HOURS_Case-Study.pdf')} download><Download size={16} aria-hidden="true" />Campaign case study PDF <span>8 pages</span></a></div>
        </section>
      </article>

      <footer className="oh-footer oh-container"><Link to="/works/product-design"><ArrowLeft size={16} aria-hidden="true" />More product design</Link><span>Carlton Shi / OFF HOURS</span><Link to="/resume">View resume <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
    </main>
  )
}
