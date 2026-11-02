import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowDown, ArrowUpRight, ChevronsLeftRight, Expand } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import { withBase } from '../lib/asset'

const categories = ['Image editing', 'Video', 'Finishing'] as const

type Preview = { file: string; label: string; aspect?: string; fit?: 'contain'; paper?: boolean }
type Media =
  | { kind: 'row'; images: Preview[] }
  | { kind: 'compare'; layout: 'portrait' | 'wide'; before: Preview; after: Preview; extras: Preview[] }
  | { kind: 'video'; layout: 'portrait' | 'landscape'; video: { file: string; poster: string; label: string }; side: Preview[] }
type Workflow = {
  id: string
  short: string
  category: (typeof categories)[number]
  title: string
  summary: string
  tools: string[]
  steps: string[]
  media: Media
  graphs: Preview[]
  links?: { href: string; label: string }[]
  note?: string
}

const workflows: Workflow[] = [
  {
    id: 'angles', short: 'Camera angles', category: 'Image editing', title: 'One character, four camera angles',
    summary: 'The camera moves around the subject while the face, sweater and forest light stay consistent from shot to shot.',
    tools: ['Qwen Image Edit 2511', 'Multiple Angles LoRA', 'Lightning 4-step LoRA'],
    steps: [
      'One reference portrait fixes identity, wardrobe and location.',
      'A preset list of 12 camera prompts supplies the shot direction.',
      'Qwen Image Edit 2511 samples in four steps with the angle and Lightning LoRAs.',
      'Four runs selected: front, overhead, rear and low angle.',
    ],
    media: {
      kind: 'row', images: [
        { file: 'angle-front', label: 'Front view' },
        { file: 'angle-overhead', label: 'Overhead' },
        { file: 'angle-back', label: 'Rear view' },
        { file: 'angle-low', label: 'Low angle' },
      ],
    },
    graphs: [{ file: 'angles-workflow', label: 'Full graph with recorded outputs' }],
  },
  {
    id: 'wardrobe', short: 'Wardrobe swap', category: 'Image editing', title: 'A change of wardrobe',
    summary: 'A varsity jacket from a flat product shot is fitted onto a portrait, keeping the person, pose and meadow light.',
    tools: ['Qwen Image Edit 2511', 'Consistency LoRA', 'Lightning 4-step LoRA'],
    steps: [
      'Portrait and garment are prepared as two separate edit references.',
      'A consistency LoRA at 0.75 helps hold the face and background.',
      'Four-step sampling, then the result is cropped back to the source frame.',
      'An image comparer checks the edit against the original portrait.',
    ],
    media: {
      kind: 'row', images: [
        { file: 'wardrobe-source', label: 'Original portrait' },
        { file: 'wardrobe-reference', label: 'Garment reference', fit: 'contain', paper: true },
        { file: 'wardrobe-result', label: 'Generated result' },
      ],
    },
    graphs: [{ file: 'wardrobe-workflow', label: 'Full graph with recorded outputs' }],
  },
  {
    id: 'leather', short: 'Logo on leather', category: 'Image editing', title: 'A logo stitched into the leather',
    summary: 'The S logo is added to both shoes in a supplied photograph, built from the same cream leather and stitching as the upper instead of being pasted on top.',
    tools: ['Krea2 edit', 'Manual masks', 'Two-pass local refinement'],
    steps: [
      'Hand-drawn masks mark the logo area on the front and rear shoe; each area runs as its own branch.',
      'Each area is cropped to 768 px. Pass 1 places the outline, using only the S mark from the brand artwork as a second reference.',
      'Pass 2 keeps that position and outline, and resamples only inside the strokes as thin, same-colour leather.',
      'Outside the masks the original pixels are restored, so the rest of the photograph is untouched.',
    ],
    media: {
      kind: 'compare', layout: 'portrait',
      before: { file: 'leather-original', label: 'Original' },
      after: { file: 'leather-refined', label: 'Refined' },
      extras: [
        { file: 'leather-step-crop', label: '768 px crop' },
        { file: 'identity-reference', label: 'Brand reference · S mark', fit: 'contain', paper: true },
        { file: 'leather-step-pass1', label: 'Pass 1 · outline' },
        { file: 'leather-step-pass2', label: 'Pass 2 · leather & stitching' },
      ],
    },
    graphs: [{ file: 'leather-workflow', label: 'Full graph · both branches' }],
    note: 'Process frames are taken from the preview nodes recorded in the graph.',
  },
  {
    id: 'h3-brand', short: 'Footwear replacement', category: 'Video', title: 'Footwear replacement, frame by frame',
    summary: 'H3 swaps the sneakers in a moving shot. A separate tracked pass then restores the real S artwork where the model drew malformed logos.',
    tools: ['MiniMax H3', 'Motion tracking', 'ComfyUI compositing'],
    steps: [
      'Three shots are generated separately in H3 from the source footage and product photographs.',
      'A second graph loads the render and keeps its original frame rate and audio.',
      'Reviewed motion tracks remove the malformed side glyphs and place the original S artwork in perspective.',
      'Delivered at 1080 × 1920, with frame 26 exported as a brand-detail check.',
    ],
    media: {
      kind: 'video', layout: 'portrait',
      video: { file: 'h3-skechers-brand-corrected.mp4', poster: 'h3-brand-poster', label: 'Completed video · 3 shots · 24 fps' },
      side: [{ file: 'h3-brand-detail', label: 'H3 output → original S artwork, tracked and composited' }],
    },
    graphs: [
      { file: 'h3-generation-workflow', label: '01 / H3 footwear generation' },
      { file: 'h3-brand-workflow', label: '02 / Brand correction and final output' },
    ],
    note: 'A 106-frame study with source-specific tracks. The 576 × 1024 H3 render is upscaled for delivery; visible side logos are corrected, while other small generated lettering remains unrefined.',
  },
  {
    id: 'selflift', short: 'Light & terrain', category: 'Video', title: 'Light and terrain',
    summary: 'An 8-second product film built from two stills, a shoe photograph and a sandstone reference, with moving light and a slow push-in.',
    tools: ['MiniMax H3', 'SelfLift sampler', 'Qwen3-VL 4B · local'],
    steps: [
      'The shoe photograph and terrain reference load as image 1 and image 2.',
      'A local Qwen3-VL model turns the brief into a structured H3 video prompt.',
      'SelfLift sets the composition at low resolution, lifts the video latents, then finishes at 960 × 544.',
      'Four sampling steps on a 12 GB GPU; 24 fps, 8 seconds.',
    ],
    media: {
      kind: 'video', layout: 'landscape',
      video: { file: 'selflift-light-terrain.mp4', poster: 'selflift-poster', label: 'Completed local render · 8 seconds · 24 fps' },
      side: [
        { file: 'selflift-input-shoe', label: 'Input 1 · product photograph', aspect: 'aspect-square' },
        { file: 'selflift-input-terrain', label: 'Input 2 · terrain reference', aspect: 'aspect-[960/544]' },
      ],
    },
    graphs: [{ file: 'selflift-workflow', label: 'Full graph with recorded video output' }],
    note: 'Native output without upscaling. Generated product details may differ from the reference. Independent portfolio study.',
  },
  {
    id: 'seedvr2', short: '4K finishing', category: 'Finishing', title: '4K masters from small sources',
    summary: 'The finishing pass behind the stills on this page. Every source is reduced to the same 0.25 MP, then rebuilt by SeedVR2 at up to 4096 px.',
    tools: ['SeedVR2 7B · Q4_K_M GGUF', 'Tiled VAE', 'LAB colour match'],
    steps: [
      'Load a generated still, whatever its original size.',
      'Scale it to 0.25 MP with Lanczos, so every source starts from the same pixel budget.',
      'SeedVR2 7B rebuilds it at 4096 px on the long edge; tiled VAE and 16 offloaded blocks keep it within VRAM.',
      'LAB colour correction holds the source palette, and a comparer node checks before and after.',
    ],
    media: {
      kind: 'compare', layout: 'wide',
      before: { file: 'seedvr2-detail-working', label: '0.25 MP working size' },
      after: { file: 'seedvr2-detail-master', label: '4096 px master' },
      extras: [
        { file: 'seedvr2-output-dune', label: 'Desert procession · 4096 × 1712' },
        { file: 'seedvr2-output-night-market', label: 'Night counter · 4096 × 2212' },
        { file: 'seedvr2-output-bonfire', label: 'Bonfire · 4096 × 2138' },
        { file: 'seedvr2-output-lost-and-found', label: 'Lost and found · 4096 × 2730' },
      ],
    },
    graphs: [],
    links: [
      { href: '#aigc-gallery', label: 'AIGC Gallery · 15 stills' },
      { href: '#wes-anderson', label: 'Wes Anderson collection · 8 stills' },
    ],
    note: 'Graph read from the workflow metadata embedded in the output PNGs. In the comparison, the left side is the master downsampled to the graph’s 0.25 MP working size for reference, not the original source file.',
  },
]

const asset = (file: string) => withBase(`images/workflows/${file}.webp`)
const clamp = (value: number) => Math.min(100, Math.max(0, value))

function Tile({ preview, aspect, onOpen }: { preview: Preview; aspect: string; onOpen: (button: HTMLButtonElement) => void }) {
  return (
    <button type="button" onClick={event => onOpen(event.currentTarget)}
      className="group min-w-0 overflow-hidden rounded-[18px] bg-black/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label={`Enlarge ${preview.label}`}>
      <div className={`overflow-hidden ${preview.aspect ?? aspect} ${preview.paper ? 'bg-white' : ''}`}>
        <img src={asset(preview.file)} alt={preview.label} loading="lazy" decoding="async"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${preview.fit === 'contain' ? 'object-contain p-3 sm:p-5' : 'object-cover'}`} />
      </div>
      <span className="flex min-h-11 items-center justify-between gap-2 px-2 py-2.5 text-[10px] leading-snug text-white/75 sm:px-3 sm:text-xs">
        {preview.label}<Expand className="h-3 w-3 shrink-0" aria-hidden="true" />
      </span>
    </button>
  )
}

function CompareSlider({ before, after, aspect, onOpen }: {
  before: Preview; after: Preview; aspect: string; onOpen: (button: HTMLButtonElement, preview: Preview) => void
}) {
  const [position, setPosition] = useState(50)
  const frame = useRef<HTMLDivElement | null>(null)

  const move = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect()
    if (rect) setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }
  const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, Home: -100, End: 100 } as Record<string, number>)[event.key]
    if (step === undefined) return
    event.preventDefault()
    setPosition(value => clamp(value + step))
  }

  return (
    <figure className="min-w-0 overflow-hidden rounded-[18px] bg-black/30">
      <div ref={frame} className={`relative cursor-ew-resize select-none overflow-hidden ${aspect}`} style={{ touchAction: 'pan-y' }}
        onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); move(event.clientX) }}
        onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event.clientX) }}>
        <img src={asset(after.file)} alt={after.label} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        <img src={asset(before.file)} alt={before.label} loading="lazy" decoding="async" draggable={false}
          className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">{before.label}</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">{after.label}</span>
        <div role="slider" tabIndex={0} onKeyDown={nudge}
          aria-label={`Compare ${before.label} with ${after.label}`} aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={Math.round(position)} aria-valuetext={`${Math.round(position)}% ${before.label}`}
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/85 focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-white"
          style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/55 text-white backdrop-blur-md">
            <ChevronsLeftRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-xs text-white/75">
        <span>Drag to compare</span>
        <span className="flex flex-wrap gap-2">
          {[before, after].map(preview => (
            <button key={preview.file} type="button" onClick={event => onOpen(event.currentTarget, preview)}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/20 px-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`Enlarge ${preview.label}`}>
              {preview.label} <Expand className="h-3 w-3" aria-hidden="true" />
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  )
}

function WorkflowMedia({ workflow, open }: { workflow: Workflow; open: (button: HTMLButtonElement, title: string, file: string) => void }) {
  const { media, title } = workflow
  const enlarge = (preview: Preview) => (button: HTMLButtonElement) => open(button, `${title} — ${preview.label}`, preview.file)

  if (media.kind === 'row') {
    return (
      <div className={`grid gap-2 ${media.images.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
        {media.images.map(preview => <Tile key={preview.file} preview={preview} aspect="aspect-[4/5]" onOpen={enlarge(preview)} />)}
      </div>
    )
  }

  if (media.kind === 'compare') {
    const portrait = media.layout === 'portrait'
    return (
      <div className={`grid gap-2 ${portrait ? 'lg:grid-cols-2' : ''}`}>
        <CompareSlider before={media.before} after={media.after} aspect={portrait ? 'aspect-[4/5]' : 'aspect-[2/1]'}
          onOpen={(button, preview) => enlarge(preview)(button)} />
        <div className={`grid content-start gap-2 ${portrait ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
          {media.extras.map(preview => (
            <Tile key={preview.file} preview={preview} aspect={portrait ? 'aspect-square' : 'aspect-video'} onOpen={enlarge(preview)} />
          ))}
        </div>
      </div>
    )
  }

  const portrait = media.layout === 'portrait'
  const src = withBase(`videos/workflows/${media.video.file}`)
  return (
    <div className={`grid items-start gap-2 ${portrait ? 'sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]' : 'lg:grid-cols-[minmax(0,1fr)_260px]'}`}>
      <figure className="min-w-0 overflow-hidden rounded-[18px] bg-black/30">
        <video controls playsInline preload="none" poster={asset(media.video.poster)} aria-label={`${title}: completed video`}
          className={`w-full bg-black/30 object-contain ${portrait ? 'aspect-[9/16] max-h-[620px]' : 'aspect-video'}`}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video. <a href={src}>Open the completed video</a>.
        </video>
        <figcaption className="px-3 py-3 text-xs text-white/75">{media.video.label}</figcaption>
      </figure>
      <div className={`grid items-start gap-2 ${portrait ? '' : 'grid-cols-2 lg:grid-cols-1'}`}>
        {media.side.map(preview => <Tile key={preview.file} preview={preview} aspect="" onOpen={enlarge(preview)} />)}
      </div>
    </div>
  )
}

export default function WorkflowShowcase() {
  const [selected, setSelected] = useState<{ title: string; file: string; workflow: boolean } | null>(null)
  const [actualSize, setActualSize] = useState(false)
  const trigger = useRef<HTMLButtonElement | null>(null)

  const open = (button: HTMLButtonElement, title: string, file: string, workflow = false) => {
    trigger.current = button
    setActualSize(false)
    setSelected({ title, file, workflow })
  }

  return (
    <section id="workflows" className="mb-24 scroll-mt-24 md:mb-32" aria-labelledby="workflows-title">
      <div className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">Process / Selected local runs</p>
        <h2 id="workflows-title" className="mt-3 text-3xl font-normal tracking-tight md:text-5xl">ComfyUI workflows</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
          Six local pipelines, from controlled image edits to tracked video finishing. Each study leads with the finished output, followed by the steps and the node graph behind it.
        </p>
        <nav aria-label="Workflow index" className="mt-8 grid gap-5 sm:grid-cols-3 md:gap-8">
          {categories.map(category => (
            <div key={category} className="border-t border-white/15 pt-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{category}</p>
              <ul className="mt-2">
                {workflows.map((workflow, index) => workflow.category === category && (
                  <li key={workflow.id}>
                    <a href={`#workflow-${workflow.id}`} className="inline-flex min-h-9 items-center gap-3 text-sm text-white/75 transition-colors hover:text-white">
                      <span className="text-xs tabular-nums text-white/40">0{index + 1}</span>{workflow.short}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="space-y-14 md:space-y-20">
        {workflows.map((workflow, index) => (
          <article key={workflow.id} className="border-t border-white/15 pt-6 md:pt-8" aria-labelledby={`workflow-${workflow.id}`}>
            <div className="mb-5 flex items-baseline gap-4">
              <span className="text-xs tabular-nums text-white/45">0{index + 1}</span>
              <h3 id={`workflow-${workflow.id}`} className="min-w-0 flex-1 scroll-mt-24 text-xl font-normal tracking-tight md:text-2xl">{workflow.title}</h3>
              <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.18em] text-white/45 sm:inline">{workflow.category}</span>
            </div>

            <div className="exhibition-glass-frame overflow-hidden rounded-[26px] p-2 md:p-3">
              <WorkflowMedia workflow={workflow} open={open} />
            </div>

            <div className="mt-3 grid gap-6 rounded-[26px] bg-black/50 p-5 backdrop-blur-md md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8">
              <div className="min-w-0">
                <p className="text-[15px] leading-7 text-white/85 md:text-base">{workflow.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Models and tools">
                  {workflow.tools.map(tool => (
                    <li key={tool} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/65">{tool}</li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Pipeline</p>
                <ol className="mt-3 space-y-2.5">
                  {workflow.steps.map((step, stepIndex) => (
                    <li key={step} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 text-sm leading-6 text-white/75">
                      <span className="tabular-nums text-white/40">{stepIndex + 1}</span>{step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="min-w-0">
                {workflow.graphs.length > 0 && (
                  <>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/50">Node graph</p>
                    {workflow.graphs.map(graph => (
                      <button key={graph.file} type="button"
                        onClick={event => open(event.currentTarget, `${workflow.title} — ${graph.label}`, graph.file, true)}
                        className="group mb-3 w-full overflow-hidden rounded-[18px] border border-white/15 bg-black/35 text-left transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        aria-label={`View ${workflow.title} workflow screenshot: ${graph.label}`}>
                        <img src={asset(`${graph.file}-thumb`)} alt={`${graph.label}: node graph with completed output previews`}
                          loading="lazy" decoding="async" width={1000} height={600} className="aspect-[16/10] w-full object-contain" />
                        <span className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-xs text-white/85 sm:text-sm">
                          {graph.label} <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </>
                )}
                {workflow.links && (
                  <>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/50">Used on this page</p>
                    <ul className="space-y-2">
                      {workflow.links.map(link => (
                        <li key={link.href}>
                          <a href={link.href} className="flex min-h-11 items-center justify-between gap-2 rounded-[18px] border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white">
                            {link.label} <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {workflow.note && <p className="mt-4 text-xs leading-6 text-white/55">{workflow.note}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={value => { if (!value) setSelected(null) }}>
        <DialogContent className="flex max-h-[94dvh] w-[calc(100vw-24px)] max-w-[1500px] flex-col gap-3 overflow-hidden rounded-2xl border-white/20 bg-[#111315] p-4 text-white sm:rounded-2xl sm:p-6"
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus() }}>
          <DialogTitle className="pr-8 text-base font-normal sm:text-xl">{selected?.title}</DialogTitle>
          <DialogDescription className="text-xs text-white/60">
            {selected?.workflow ? 'ComfyUI canvas with recorded output previews. Use 100% to read the nodes and scroll around the graph.' : 'Image from a local ComfyUI study. Open full size for a closer look.'}
          </DialogDescription>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {selected?.workflow && <button type="button" aria-pressed={actualSize} onClick={() => setActualSize(value => !value)}
              className="min-h-10 rounded-full border border-white/25 px-4 hover:bg-white/10">{actualSize ? 'Fit to screen' : 'View at 100%'}</button>}
            {selected && <a href={asset(selected.file)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 px-4 hover:bg-white/10">
              Open full size <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>}
          </div>
          <div className="min-h-0 overflow-auto rounded-xl bg-black/40" tabIndex={0} aria-label="Image preview; scroll to explore at full size">
            {selected && <img key={selected.file} src={asset(selected.file)} alt={selected.title}
              className={actualSize ? 'block max-w-none' : 'mx-auto block max-h-[68dvh] max-w-full object-contain'} />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
