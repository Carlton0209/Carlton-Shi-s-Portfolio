import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowUpRight, Download, Expand } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { cgiAsset, cgiSource, cgiStudies, type CgiStudyId } from '../data/cgiStudies'
import './cgi-studies.css'

type ViewId = 'hero' | 'detail' | 'clay'

function ProductGallery({ studyId }: { studyId: CgiStudyId }) {
  const study = cgiStudies[studyId]
  const [view, setView] = useState<ViewId>('hero')
  const [open, setOpen] = useState(false)
  const zoomTrigger = useRef<HTMLButtonElement | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const views: { id: ViewId; label: string; caption: string }[] = [
    { id: 'hero', label: 'Hero', caption: 'Finished lighting & materials' },
    { id: 'detail', label: studyId === 'still' ? 'Detail' : 'Alternate', caption: studyId === 'still' ? 'Aluminum, lacquer, lettering and modeled condensation' : 'Rear three-quarter camera with adjusted studio lighting' },
    { id: 'clay', label: 'Clay', caption: 'Actual neutral-material render from the hero camera' },
  ]
  const current = views.find(item => item.id === view)!
  const alt = view === 'hero' ? study.alt : view === 'detail' ? study.detailAlt : `${study.name} clay render showing the actual geometry from the hero camera.`

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const index = views.findIndex(item => item.id === view)
    const next = event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : undefined
    if (next === undefined) return
    event.preventDefault()
    setView(views[next].id)
    buttons.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div className="cgi-product-gallery">
      <figure className="cgi-render">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button ref={zoomTrigger} type="button" className="cgi-render-image cgi-zoom" aria-label={`Enlarge ${study.name}: ${current.label}`}>
              <img src={cgiAsset(studyId, view)} alt={alt} width={view === 'detail' ? study.detailWidth : 1600} height={view === 'detail' ? study.detailHeight : 1000} loading="lazy" decoding="async" />
              <span className="cgi-enlarge"><Expand size={15} aria-hidden="true" />Open full view</span>
            </button>
          </DialogTrigger>
          <DialogContent className="flex max-h-[94dvh] w-[calc(100vw-24px)] max-w-[1500px] flex-col gap-3 overflow-hidden rounded-xl border-[#c9ccc2] bg-[#eeece6] p-5 text-[#242822] sm:p-7"
            onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setOpen(false) } }}
            onCloseAutoFocus={event => { event.preventDefault(); zoomTrigger.current?.focus({ preventScroll: true }) }}>
            <DialogTitle className="pr-9 text-lg font-medium">{study.name} / {current.label}</DialogTitle>
            <DialogDescription className="text-sm text-[#5c6259]">{current.caption}. Rendered from a Blender scene.</DialogDescription>
            <div className="min-h-0 overflow-auto" tabIndex={0} aria-label="Full render preview; scroll to explore"><img src={cgiAsset(studyId, view)} alt={alt} className="mx-auto block h-auto max-w-full" /></div>
          </DialogContent>
        </Dialog>
        <figcaption className="cgi-render-caption" aria-live="polite">{current.caption}</figcaption>
      </figure>
      <div className="cgi-gallery-controls" role="group" aria-label="Product views; use arrow keys to switch" onKeyDown={handleKeys}>
        {views.map((item, index) => (
          <button type="button" key={item.id} ref={node => { buttons.current[index] = node }} onClick={() => setView(item.id)} aria-pressed={view === item.id} aria-label={`Show ${item.label.toLowerCase()} view`}>
            <img src={cgiAsset(studyId, `${item.id}-thumb`)} alt="" width={240} height={150} loading="lazy" decoding="async" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CgiProductCaseStudy({ studyId }: { studyId: CgiStudyId }) {
  const study = cgiStudies[studyId]
  const other = cgiStudies[studyId === 'still' ? 'form-light' : 'still']

  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = `${study.name} | Product case study | Carlton Shi`
    if (meta) meta.content = study.description
    let cancelled = false
    const hash = window.location.hash
    const section = document.getElementById(hash.slice(1))
    if (section) {
      section.scrollIntoView({ behavior: 'instant' })
      void document.fonts.ready.then(() => {
        if (!cancelled && window.location.hash === hash) section.scrollIntoView({ behavior: 'instant' })
      })
    } else window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      cancelled = true
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [study])

  return (
    <main className={`cgi-page cgi-product-page cgi-theme-${studyId}`}>
      <a href="#case-content" className="cgi-skip">Skip to case study</a>
      <header className="cgi-header cgi-container">
        <Link to="/works/product-design" className="cgi-back"><ArrowLeft size={16} aria-hidden="true" />Product Design</Link>
        <Link to="/" className="cgi-owner">Carlton Shi</Link>
        <a className="cgi-header-note" href={cgiSource(studyId)} download>Source files <Download size={14} aria-hidden="true" /></a>
      </header>
      <article id="case-content" className="cgi-container">
        <section className="cgi-product-hero" aria-labelledby="case-title">
          <div>
            <p className="cgi-eyebrow">{study.name} / Self-initiated concept</p>
            <h1 id="case-title">{study.title}</h1>
            <p className="cgi-intro">{study.description}</p>
            <a href="#product-views" className="cgi-button">Explore the product <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <img src={cgiAsset(studyId, 'hero')} alt={study.alt} width={1600} height={1000} fetchPriority="high" />
        </section>
        <dl className="cgi-project-meta">
          <div><dt>Discipline</dt><dd>{study.category}</dd></div>
          <div><dt>Tools</dt><dd>Blender / Cycles / Python</dd></div>
          <div><dt>Deliverables</dt><dd>{study.deliverables}</dd></div>
          <div><dt>Project type</dt><dd>Independent / AI-assisted production</dd></div>
        </dl>
        <section id="product-views" className="cgi-study" aria-labelledby="views-title">
          <p className="cgi-eyebrow">01 / Product perspectives</p>
          <div className="cgi-heading-columns"><h2 id="views-title">{study.galleryTitle}</h2><p className="cgi-intro">{study.galleryDescription}</p></div>
          <ProductGallery key={studyId} studyId={studyId} />
        </section>
        <section id="process" className="cgi-study" aria-labelledby="process-title">
          <p className="cgi-eyebrow">02 / Behind the image</p>
          <div className="cgi-heading-columns"><h2 id="process-title">An image you can take apart.</h2><p className="cgi-intro">The source scene and build script preserve the decisions behind the finished image: geometry, materials, camera and light.</p></div>
          <div className="cgi-details">
            <figure><img src={cgiAsset(studyId, 'clay')} alt={`${study.name}: same-camera clay render with neutral materials.`} width={1600} height={1000} loading="lazy" decoding="async" /><figcaption>Actual scene geometry / Hero camera / Neutral material treatment</figcaption></figure>
            <div className="cgi-evidence">
              {study.evidence.map((item, index) => <div className="cgi-evidence-item" key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
            </div>
          </div>
        </section>
        <section id="handoff" className="cgi-study cgi-handoff" aria-labelledby="handoff-title">
          <div><p className="cgi-eyebrow">03 / Project handoff</p><h2 id="handoff-title">Open the source.</h2><p className="cgi-intro">Explore the native Blender scene, reproduce the renders from Python, or inspect the production notes.</p></div>
          <a className="cgi-button" href={cgiSource(studyId)} download><Download size={17} aria-hidden="true" />Download project files</a>
        </section>
        <div className="cgi-scope">
          <p><strong>Scope & authorship</strong>{study.scope} Scene-building scripts were developed with AI assistance; the images are rendered from 3D scenes in Blender.</p>
          {studyId === 'form-light' && <p><strong>Model credit</strong>“Car Concept” — Eric Chadwick, © 2024 Darmstadt Graphics Group GmbH, via Khronos glTF Sample Assets. <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CarConcept" target="_blank" rel="noopener noreferrer">Original model</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Adapted for this studio study. Source notes record the modifications.</p>}
        </div>
      </article>
      <footer className="cgi-footer cgi-container"><Link to="/works/product-design"><ArrowLeft size={16} aria-hidden="true" />All product work</Link><Link to={other.path}>Next / {other.name}<ArrowUpRight size={17} aria-hidden="true" /></Link></footer>
    </main>
  )
}
