import { useRef, useState } from 'react'
import { ArrowUpRight, Expand } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import { withBase } from '../lib/asset'

type Preview = { file: string; label: string }
type Workflow = {
  id: string
  title: string
  model: string
  description: string
  images: Preview[]
}

const workflows: Workflow[] = [
  {
    id: 'angles', title: 'One character, multiple angles', model: 'Qwen Image Edit · Multiple Angles',
    description: 'Camera direction changes around a shared character reference. Four selected local runs explore a front view, an overhead shot, a rear view and a low angle.',
    images: [
      { file: 'angle-front', label: 'Front view' },
      { file: 'angle-overhead', label: 'Overhead' },
      { file: 'angle-back', label: 'Rear view' },
      { file: 'angle-low', label: 'Low angle' },
    ],
  },
  {
    id: 'wardrobe', title: 'A change of wardrobe', model: 'Qwen Image Edit · Virtual try-on',
    description: 'A portrait and a garment reference guide the outfit change, keeping the subject, pose and outdoor setting recognisable.',
    images: [
      { file: 'wardrobe-source', label: 'Original portrait' },
      { file: 'wardrobe-reference', label: 'Garment reference' },
      { file: 'wardrobe-result', label: 'Generated result' },
    ],
  },
  {
    id: 'identity', title: 'Two images, one edit', model: 'Krea2 · Identity Edit V1.2',
    description: 'A product photograph and a graphic reference drive a two-image editing experiment. The logo reference changes the shoe’s side detail.',
    images: [
      { file: 'identity-source', label: 'Source photograph' },
      { file: 'identity-reference', label: 'Graphic reference' },
      { file: 'identity-result', label: 'Generated result' },
    ],
  },
  {
    id: 'text-to-image', title: 'From words to a portrait', model: 'Krea2 Turbo · Text to image',
    description: 'A text prompt sets the portrait, crimson backdrop, flowers and directional light. A compact control panel brings prompt, resolution and model settings together.',
    images: [{ file: 'text-to-image-result', label: 'Generated portrait' }],
  },
  {
    id: 'leather', title: 'A more precise product edit', model: 'Krea2 · Manual masks & local refinement',
    description: 'Two hand-selected regions isolate the shoe logos. Separate passes establish the shape, refine matching thin leather and stitching, then blend the edited areas back into the original photograph.',
    images: [{ file: 'leather-result', label: 'Original → refined result' }],
  },
]

const asset = (file: string) => withBase(`images/workflows/${file}.webp`)

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
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">Process / Selected local runs</p>
        <h2 id="workflows-title" className="mt-3 text-3xl font-normal tracking-tight md:text-5xl">ComfyUI workflows</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
          Five studies in generation and image editing. Explore the results alongside the workflows used to make them.
        </p>
      </div>

      <div className="space-y-10 md:space-y-14">
        {workflows.map((workflow, index) => (
          <article key={workflow.id} className="border-t border-white/15 pt-6 md:pt-8" aria-labelledby={`workflow-${workflow.id}`}>
            <div className="mb-5 flex items-baseline gap-4">
              <span className="text-xs tabular-nums text-white/45">0{index + 1}</span>
              <h3 id={`workflow-${workflow.id}`} className="text-xl font-normal tracking-tight md:text-2xl">{workflow.title}</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-7">
              <div className="exhibition-glass-frame overflow-hidden rounded-[26px] p-2 md:p-3">
                <div className={`grid min-h-0 gap-2 ${workflow.images.length === 4 ? 'grid-cols-2' : workflow.images.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  {workflow.images.map(preview => (
                    <button key={preview.file} type="button"
                      onClick={event => open(event.currentTarget, `${workflow.title} — ${preview.label}`, preview.file)}
                      className="group relative min-w-0 overflow-hidden rounded-[18px] bg-black/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`Enlarge ${workflow.title}: ${preview.label}`}>
                      <img src={asset(preview.file)} alt={preview.label} loading="lazy" decoding="async"
                        className={`w-full object-contain ${workflow.images.length === 4 ? 'h-[190px] sm:h-[230px]' : workflow.images.length === 3 ? 'h-[180px] sm:h-[420px]' : 'h-[340px] sm:h-[480px]'}`} />
                      <div className="flex min-h-12 items-center justify-between gap-1 px-2 py-3 text-[10px] text-white/75 sm:px-3 sm:text-xs">
                        <span>{preview.label}</span><Expand className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex min-w-0 flex-col items-start self-start rounded-[26px] bg-black/50 p-4 backdrop-blur-md lg:p-5">
                <p className="text-xs uppercase leading-relaxed tracking-[0.14em] text-white/55">{workflow.model}</p>
                <p className="mb-6 mt-3 text-sm leading-7 text-white/75">{workflow.description}</p>
                <button type="button"
                  onClick={event => open(event.currentTarget, `${workflow.title} — workflow`, `${workflow.id}-workflow`, true)}
                  className="group w-full overflow-hidden rounded-[18px] border border-white/15 bg-black/35 text-left transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={`View ${workflow.title} workflow screenshot`}>
                  <img src={asset(`${workflow.id}-workflow-thumb`)} alt={`${workflow.model} node graph with completed output previews`}
                    loading="lazy" decoding="async" width={1000} height={600} className="aspect-[16/10] w-full object-contain" />
                  <span className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-white/85">
                    View workflow <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={value => { if (!value) setSelected(null) }}>
        <DialogContent className="flex max-h-[94dvh] w-[calc(100vw-24px)] max-w-[1500px] flex-col gap-3 overflow-hidden rounded-2xl border-white/20 bg-[#111315] p-4 text-white sm:p-6"
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
          <div className="min-h-0 overflow-auto rounded-lg bg-black/40" tabIndex={0} aria-label="Image preview; scroll to explore at full size">
            {selected && <img key={selected.file} src={asset(selected.file)} alt={selected.title}
              className={actualSize ? 'block max-w-none' : 'mx-auto block max-h-[68dvh] max-w-full object-contain'} />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
