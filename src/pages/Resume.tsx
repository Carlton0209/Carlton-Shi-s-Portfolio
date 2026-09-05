import { ArrowLeft, Download, Linkedin, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const resumePdf = withBase('resume/Resume.pdf')
const linkedInUrl = 'https://www.linkedin.com/in/carltonshi0209'

const skillGroups = [
  {
    label: 'Generative AI',
    value: 'ComfyUI, custom LoRA models, Stable Diffusion, Midjourney, Runway, Higgsfield, Seedance 2.0/2.5, Kling O3, Suno',
  },
  {
    label: 'VFX & Motion',
    value: 'After Effects, DaVinci Resolve, Premiere Pro, Nuke, Photoshop, compositing, motion graphics, color grading',
  },
  {
    label: '3D & Real-Time',
    value: 'Unreal Engine, Blender, Maya, Houdini, digital humans, XR and immersive media',
  },
  {
    label: 'Web & Creative Operations',
    value: 'HTML, CSS, JavaScript, Airtable, Google Analytics, SEO, KPI analysis, SQL',
  },
]

const experiences = [
  {
    company: 'Flynn',
    role: 'Technical Artist',
    dates: 'Jun 2026 - Present',
    bullets: [
      "Developed an AI agent skill for Flynn's creative team that turns brief descriptions into AIGC video-script prompts with precise control over character facial expressions, dialogue, and actions.",
      'Built an AIGC workflow from scratch for the creative team and fully participated in multiple real-world projects.',
    ],
  },
  {
    company: 'Highland Film Group (The Avenue)',
    role: 'U.S. Domestic Marketing & Distribution Intern',
    dates: 'Jan 2026 - Present',
    bullets: [
      "Built an AI agent for social-content creation, improving the marketing team's content-workflow efficiency by at least 30%.",
      'Produced campaign-ready trailers, promos, posters, and theatrical and digital release assets, translating creative direction into production-ready visual deliverables with cross-functional teams.',
      'Managed Airtable-based creative asset systems across multiple film titles, improving asset tracking, version control, and cross-team visibility.',
    ],
  },
  {
    company: 'F.O.U.N.D.',
    role: 'Web Design Artist (Part-time)',
    dates: 'Sep 2025 - Present',
    bullets: [
      'Designed responsive layouts and modular interactive components; implemented JavaScript-driven interactions and dynamic content to support visual consistency and faster creative iteration.',
    ],
  },
  {
    company: 'JOYME',
    role: 'Technical Artist',
    dates: 'Mar 2025 - Jun 2025',
    bullets: [
      'Designed AI-assisted VFX pipelines for facial replacement, character enhancement, and asset reuse, improving production efficiency by approximately 20%.',
      'Integrated generative AI outputs into live-action footage using ComfyUI and node-based compositing workflows for production-ready visual results.',
      'Led research and design teams applying generative AI to previsualization, concept iteration, and look development.',
    ],
  },
  {
    company: 'NetEase',
    role: 'Video Editor',
    dates: 'Feb 2025 - Mar 2025',
    bullets: [
      'Produced fast-turnaround short-form cinematic content using VFX, motion graphics, and color grading in DaVinci Resolve and After Effects; clips earned more than 100K likes across TikTok and WeChat Official Accounts.',
    ],
  },
  {
    company: 'Studio KAY',
    role: 'Graphic Artist Intern',
    dates: 'Jun 2023 - Jan 2024',
    bullets: [
      'Built digital-human assets and VFX elements for XR and immersive-media campaigns; optimized Unreal Engine and Maya rendering workflows to reduce render time by 20% while aligning shaders, lighting, and render setups with narrative intent.',
    ],
  },
]

const education = [
  {
    degree: 'M.S., Advanced Media Management',
    school: 'Syracuse University — S.I. Newhouse School of Public Communications',
    dates: '2025 - 2026',
  },
  {
    degree: 'B.A., Film Studies',
    school: 'Zhongnan University of Economics and Law',
  },
  {
    degree: 'B.E., Film & VFX',
    school: 'Dongseo University',
  },
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

        <div className="flex items-center gap-2">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Carlton Shi on LinkedIn"
            className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
          >
            <Linkedin className="relative z-10 h-4 w-4" />
            <span className="relative z-10 hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href={resumePdf}
            download
            className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
          >
            <Download className="relative z-10 h-4 w-4" />
            <span className="relative z-10">PDF</span>
          </a>
        </div>
      </nav>

      <article className="mx-auto max-w-5xl bg-zinc-50 px-6 py-8 shadow-2xl shadow-black/40 sm:px-10 sm:py-12 lg:px-14">
        <header className="border-b border-zinc-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            AI Artist & Creative Technologist
          </p>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-none tracking-normal text-zinc-950 sm:text-5xl">
                Jingchuan (Carlton) Shi
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                Generative Image & Video | AI-assisted VFX | Digital Storytelling
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
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-zinc-950"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <ResumeSection title="Summary">
            <p className="text-base leading-relaxed text-zinc-700">
              AI Artist and Creative Technologist working across generative image and video, VFX, motion design, and digital
              storytelling. Builds ComfyUI-based production workflows and integrates AI-generated assets into live-action,
              film marketing, and immersive media, with workflow gains up to 30% and social content exceeding 100K likes.
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
              <p className="text-sm font-medium text-zinc-500">ComfyUI & custom LoRA models</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              Built a web-based AI photo-enhancement platform with ComfyUI and custom LoRA models, producing high-fidelity
              photorealistic results while preserving subject identity.
            </p>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="grid gap-3">
              {education.map(item => (
                <div key={`${item.degree}-${item.school}`} className="text-sm leading-relaxed text-zinc-700 sm:flex sm:justify-between sm:gap-6">
                  <p>
                    <span className="font-semibold text-zinc-950">{item.degree}</span>
                    <span> — {item.school}</span>
                  </p>
                  {item.dates && <p className="shrink-0 font-medium text-zinc-500">{item.dates}</p>}
                </div>
              ))}
              <p className="text-sm leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-950">Selected Training: </span>
                Advanced Learning Algorithms (DeepLearning.AI, 2025) | AIGC (Newhouse, 2025)
              </p>
            </div>
          </ResumeSection>
        </div>
      </article>
    </main>
  )
}
