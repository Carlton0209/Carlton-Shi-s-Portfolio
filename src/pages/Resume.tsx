import { ArrowLeft, Download, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const resumePdf = withBase('resume/Carlton_Shi_Resume.pdf')

const skillGroups = [
  {
    label: 'AI Tools',
    value: 'Luma, ComfyUI, Suno, Runway, Midjourney, Stable Diffusion, LibTV (Seedance2.0 and KlingO3)',
  },
  {
    label: 'Creative Production',
    value: 'VFX, motion graphics, color grading, trailers, promos, posters, digital human assets, XR/immersive media',
  },
  {
    label: 'Design, Web and Data',
    value:
      'Unreal Engine, Blender, Maya, Houdini, Nuke, DaVinci Resolve, After Effects, Premiere Pro, Photoshop, HTML, CSS, JavaScript, Airtable, Google Analytics, SEO, KPI analysis, SQL',
  },
]

const experiences = [
  {
    company: 'Highland Film Group (The Avenue)',
    role: 'US Domestic Marketing and Distribution Intern',
    dates: 'Jan 2026 - Present',
    focus: 'AI-assisted social content, film marketing assets, creative operations',
    bullets: [
      'Developed campaign-ready trailers, promos, posters, and theatrical/digital release assets, translating creative strategy into production-ready visual deliverables with cross-functional teams.',
      'Managed creative asset systems in Airtable across multiple film titles, improving asset accounting, version control, and cross-team visibility for marketing workflows.',
      "Independently built an AI agent to support social media content creation, improving the marketing team's content workflow efficiency by at least 30%.",
    ],
  },
  {
    company: 'F.O.U.N.D.',
    role: 'Web Design Artist (Part-time)',
    dates: 'Sep 2025 - Present',
    focus: 'Responsive web design, interactive visual systems, front-end prototyping',
    bullets: [
      'Designed responsive web layouts and modular interactive components, maintaining visual consistency across scalable digital experiences.',
      'Implemented JavaScript-driven interaction patterns and dynamic content, enabling richer user experiences and faster creative iteration.',
    ],
  },
  {
    company: 'JOYME',
    role: 'Technical Artist',
    dates: 'Mar 2025 - Jun 2025',
    focus: 'AI-assisted VFX pipelines, generative previsualization, look development',
    bullets: [
      'Designed AI-assisted VFX pipelines for facial replacement, character enhancement, and asset reuse, improving production efficiency by around 20%.',
      'Integrated generative AI outputs into live-action footage using ComfyUI and node-based compositing workflows for production-ready visual results.',
      'Led research and design teams in applying generative AI to previsualization, concept iteration, and look development.',
    ],
  },
  {
    company: 'NetEase',
    role: 'Video Editor',
    dates: 'Feb 2025 - Mar 2025',
    focus: 'Short-form cinematic editing, motion graphics, social video performance',
    bullets: [
      'Produced platform-native short-form cinematic content using VFX, motion graphics, and color grading in DaVinci Resolve and After Effects.',
      'Delivered fast-turnaround social edits under tight deadlines; video clips earned over 100,000 likes across TikTok and WeChat Official Accounts.',
    ],
  },
  {
    company: 'Studio KAY',
    role: 'Graphic Artist Intern',
    dates: 'Jun 2023 - Jan 2024',
    focus: 'XR/immersive media, digital humans, real-time rendering',
    bullets: [
      'Built digital human assets and VFX elements for XR and immersive media campaigns, supporting visually coherent immersive storytelling.',
      'Optimized real-time rendering workflows in Unreal Engine and Maya, reducing render time by 20% while aligning shader, lighting, and render setups with narrative intent.',
    ],
  },
]

const education = [
  'M.S. in Advanced Media Management, Syracuse University (Syracuse)',
  'B.A. in Film Studies, Zhongnan University of Economics and Law (Wuhan)',
  'B.E. in Film & VFX, Dongseo University (Busan)',
]

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-zinc-200 pt-5">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{title}</h2>
      {children}
    </section>
  )
}

export function ResumePage() {
  return (
    <main className="min-h-screen bg-black px-5 py-6 text-zinc-950 sm:px-8 lg:px-16">
      <nav className="mx-auto mb-6 flex max-w-5xl items-center justify-between">
        <Link
          to="/"
          className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
        >
          <ArrowLeft className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Home</span>
        </Link>

        <a
          href={resumePdf}
          download
          className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
        >
          <Download className="relative z-10 h-4 w-4" />
          <span className="relative z-10">PDF</span>
        </a>
      </nav>

      <article className="mx-auto max-w-5xl bg-zinc-50 px-6 py-8 shadow-2xl shadow-black/40 sm:px-10 sm:py-12 lg:px-14">
        <header className="border-b border-zinc-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            AI Creative Designer and Creative Technologist
          </p>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-none tracking-normal text-zinc-950 sm:text-5xl">
                Jingchuan (Carlton) Shi
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                Multimodal Generative Tools | AI-assisted VFX | Digital Storytelling
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 md:items-end">
              <a href="tel:3153952313" className="inline-flex items-center gap-2 hover:text-zinc-950">
                <Phone className="h-4 w-4" />
                315-395-2313
              </a>
              <a href="mailto:jshi77@syr.edu" className="inline-flex items-center gap-2 hover:text-zinc-950">
                <Mail className="h-4 w-4" />
                jshi77@syr.edu
              </a>
              <div>LinkedIn | Portfolio</div>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <ResumeSection title="Summary">
            <p className="text-base leading-relaxed text-zinc-700">
              AI Creative Designer and Creative Technologist focused on multimodal generative tools, AI-assisted VFX, and
              digital storytelling. Experienced across film marketing, short-form video, XR/VFX production, responsive web
              design, and ComfyUI-based workflows, with efficiency gains up to 30% and social video performance above
              100,000 likes.
            </p>
          </ResumeSection>

          <ResumeSection title="Skills">
            <div className="grid gap-3">
              {skillGroups.map(skill => (
                <p key={skill.label} className="text-sm leading-relaxed text-zinc-700">
                  <span className="font-semibold text-zinc-950">{skill.label}: </span>
                  {skill.value}
                </p>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="space-y-6">
              {experiences.map(experience => (
                <section key={`${experience.company}-${experience.dates}`} className="break-inside-avoid">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-950">{experience.role}</h3>
                      <p className="text-sm text-zinc-500">{experience.company}</p>
                    </div>
                    <p className="text-sm font-medium text-zinc-500">{experience.dates}</p>
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-700">Focus: {experience.focus}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
                    {experience.bullets.map(bullet => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Selected Project">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-zinc-950">RealLife AI</h3>
              <p className="text-sm font-medium text-zinc-500">ComfyUI and custom LoRA models</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              A web-based AI photo enhancement platform built on ComfyUI and custom LoRA models, producing high-fidelity
              photorealistic results while preserving subject identity.
            </p>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="grid gap-3">
              {education.map(item => (
                <p key={item} className="text-sm leading-relaxed text-zinc-700">
                  {item}
                </p>
              ))}
            </div>
          </ResumeSection>
        </div>
      </article>
    </main>
  )
}
