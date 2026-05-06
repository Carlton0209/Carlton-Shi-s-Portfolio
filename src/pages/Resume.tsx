import { ArrowLeft, Download, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/asset'

const resumeDocx = withBase('resume/Carlton_Shi_Resume.docx')

const skillGroups = [
  {
    label: 'AI Creative and Prototyping',
    value:
      'ComfyUI, Stable Diffusion, Midjourney, custom LoRA models, AI-assisted previz, face replacement, generative content workflows',
  },
  {
    label: 'Creative Technology and VFX',
    value:
      'Unreal Engine, Blender, Maya, Houdini, Nuke, VFX, real-time rendering, motion graphics, color grading',
  },
  {
    label: 'Content and Social Strategy',
    value:
      'Trailer/promo/poster development, short-form video, TikTok and WeChat content, Google Analytics, SEO, KPI analysis, Airtable asset tracking',
  },
  {
    label: 'Web and Interactive',
    value: 'HTML, CSS, JavaScript, responsive layouts, interactive prototyping, dynamic content, SQL',
  },
]

const experiences = [
  {
    company: 'Highland Film Group (The Avenue)',
    location: 'Los Angeles, CA',
    role: 'US Domestic Marketing and Distribution Intern',
    dates: 'Jan 2026 - Present',
    bullets: [
      'Develop creative assets for theatrical and digital releases, including trailers, promos, posters, and campaign visual materials.',
      'Translate campaign concepts into executable visual deliverables across creative, marketing, and distribution workflows.',
      'Manage marketing and creative assets in Airtable, supporting version control, asset accounting, and cross-team visibility across film titles.',
      'Built an AI agent to support social media content creation, improving marketing-team workflow efficiency by at least 30%.',
    ],
  },
  {
    company: 'F.O.U.N.D.',
    location: 'New York, NY',
    role: 'Web Design Artist (Part-time)',
    dates: 'Sep 2025 - Present',
    bullets: [
      'Designed responsive web layouts and interactive visual components with modular systems, scalability, and visual consistency.',
      'Implemented JavaScript-driven interaction and dynamic content to support richer user experiences and rapid creative iteration.',
    ],
  },
  {
    company: 'JOYME',
    location: 'Beijing, China',
    role: 'Technical Artist',
    dates: 'Mar 2025 - Jun 2025',
    bullets: [
      'Designed AI-assisted VFX pipelines for face replacement, character enhancement, and asset reuse, improving production efficiency by around 30%.',
      'Integrated generative AI outputs into live-action footage using ComfyUI and node-based compositing workflows.',
      'Led research and design teams in applying generative AI to previsualization, concept iteration, and look development.',
    ],
  },
  {
    company: 'NetEase',
    location: 'Beijing, China',
    role: 'Video Editor',
    dates: 'Feb 2025 - Mar 2025',
    bullets: [
      'Produced short-form cinematic content with VFX, motion graphics, and color grading for fast-turnaround social platforms.',
      'Edited in DaVinci Resolve and After Effects under tight delivery timelines.',
      'Created video clips that generated 100,000+ likes across platforms including TikTok and WeChat Official Accounts.',
    ],
  },
  {
    company: 'Studio KAY',
    location: 'Busan, South Korea',
    role: 'Graphic Artist Intern',
    dates: 'Jun 2023 - Jan 2024',
    bullets: [
      'Built digital human assets and VFX elements for XR and immersive media campaigns.',
      'Optimized real-time rendering workflows in Unreal Engine and Maya, reducing render time by 20%.',
      'Collaborated with VFX supervisors to align shader, lighting, and rendering setups with narrative intent.',
    ],
  },
]

const education = [
  {
    school: 'Syracuse University',
    location: 'Syracuse, NY, USA',
    detail: 'M.S. in Advanced Media Management | Expected Dec 2026',
  },
  {
    school: 'Dongseo University',
    location: 'Busan, South Korea',
    detail: 'B.E. in Film & VFX | GPA: 3.89 / 4.0',
  },
  {
    school: 'Zhongnan University of Economics and Law',
    location: 'Wuhan, China',
    detail: 'B.A. in Film Studies | GPA: 3.7 / 4.0',
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

        <a
          href={resumeDocx}
          download
          className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
        >
          <Download className="relative z-10 h-4 w-4" />
          <span className="relative z-10">DOCX</span>
        </a>
      </nav>

      <article className="mx-auto max-w-5xl bg-zinc-50 px-6 py-8 shadow-2xl shadow-black/40 sm:px-10 sm:py-12 lg:px-14">
        <header className="border-b border-zinc-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            AI Creative & Creative Technologist
          </p>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-none tracking-normal text-zinc-950 sm:text-5xl">
                Jingchuan (Carlton) Shi
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                Generative Media | Film Marketing | Content Strategy | Interactive Systems
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
          <ResumeSection title="Profile">
            <p className="text-base leading-relaxed text-zinc-700">
              Creative technologist and filmmaker working across generative AI, VFX, interactive web, and film marketing.
              Builds AI-assisted content workflows, immersive visual systems, and social-first creative assets that connect
              technical prototyping with campaign execution. Experienced with ComfyUI, Stable Diffusion, Unreal Engine,
              Maya, After Effects, DaVinci Resolve, Airtable, and web technologies.
            </p>
          </ResumeSection>

          <ResumeSection title="Core Skills">
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
                      <h3 className="text-lg font-semibold text-zinc-950">{experience.company}</h3>
                      <p className="text-sm text-zinc-500">{experience.location}</p>
                    </div>
                    <p className="text-sm font-medium text-zinc-500">{experience.dates}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-zinc-700">{experience.role}</p>
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
              <div>
                <h3 className="text-lg font-semibold text-zinc-950">RealLife AI</h3>
                <p className="text-sm text-zinc-500">Personal Project</p>
              </div>
              <p className="text-sm font-medium text-zinc-500">ComfyUI and custom LoRA models</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              Built a web-based AI photo enhancement platform designed for high-fidelity photorealism and identity
              preservation, with a product experience focused on lowering technical barriers so nontechnical users can
              access AI-powered visual enhancement.
            </p>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="grid gap-4 md:grid-cols-3">
              {education.map(item => (
                <section key={item.school}>
                  <h3 className="text-sm font-semibold text-zinc-950">{item.school}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.location}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">{item.detail}</p>
                </section>
              ))}
            </div>
          </ResumeSection>
        </div>
      </article>
    </main>
  )
}
