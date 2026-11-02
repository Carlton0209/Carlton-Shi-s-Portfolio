import { Download, Linkedin, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { resume } from '../data/resume'
import { withBase } from '../lib/asset'
import { useRoomMotion } from '../lib/motion'
import { ContactSection, SiteBar, frameX } from '../components/Room'

const resumePdf = withBase('resume/Resume.pdf')

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal-group className="grid gap-3 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
      <h2 data-reveal className="t-lead font-medium text-room-paper-ink">{title}</h2>
      <div data-reveal className="min-w-0 [&_p]:max-w-[62ch] [&_ul]:max-w-[62ch]">{children}</div>
    </section>
  )
}

type ResumeProject = (typeof resume.projects)[number]

const projectPictures: Record<string, string> = {
  DAYMARK: withBase('images/daymark/email-overview.webp'),
  'OFF HOURS': withBase('images/off-hours/daypack-lifestyle-hero.webp'),
  'RealLife AI': withBase('images/reallife-ai-preview.jpg'),
  LINEAGE: withBase('images/lineage-homepage.png'),
}

function ResumeProjects({ projects }: { projects: readonly ResumeProject[] }) {
  return (
    <div className="space-y-8">
      {projects.map(project => (
        <section key={project.name} className="grid gap-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
          {projectPictures[project.name] && (
            <a href={project.href} target="_blank" rel="noreferrer" className="group block self-start overflow-hidden bg-[#e8e8ed]" tabIndex={-1}>
              <img src={projectPictures[project.name]} alt={`${project.name} preview`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </a>
          )}
          <div className="min-w-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="t-body font-semibold text-room-paper-ink">
              <a href={project.href} target="_blank" rel="noreferrer" className="hover:underline">{project.name}</a>
            </h3>
            <p className="t-small text-[#515154]">{project.label}</p>
          </div>
          <ul className="t-body mt-2 list-disc space-y-1.5 pl-5 text-room-paper-ink marker:text-[#86868b]">
            {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
          </ul>
          </div>
        </section>
      ))}
    </div>
  )
}

export function ResumePage() {
  const root = useRef<HTMLElement | null>(null)
  useRoomMotion(root)

  return (
    <main ref={root} className="room min-h-dvh">
      <SiteBar current="resume" />

      {/* The resume is one light sheet across the page, its text on the page's own margins. */}
      <div className="pb-[clamp(120px,14vw,220px)] pt-[clamp(8px,2vw,24px)]">
      <article className={`bg-room-paper py-12 text-room-paper-ink md:py-16 lg:py-20 ${frameX}`}>
        <header data-reveal-group className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h1 data-reveal className="t-name text-[clamp(2.6rem,6.6vw,7rem)] !leading-[0.95]">{resume.name}</h1>
            <p data-reveal className="t-lead mt-3">{resume.headline}</p>
            <p data-reveal className="t-body mt-2 text-[#515154]">{resume.location}</p>
          </div>
          <div data-reveal className="t-small flex flex-col items-start gap-1 md:items-end">
            <a href={resumePdf} download className="room-button mb-3">
              <Download className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Download PDF
            </a>
            <a href={`tel:${resume.phone.replace(/-/g, '')}`} className="room-link">
              <Phone className="h-4 w-4" />{resume.phone}
            </a>
            <a href={`mailto:${resume.email}`} className="room-link">
              <Mail className="h-4 w-4" />{resume.email}
            </a>
            <a href={resume.linkedIn} target="_blank" rel="noreferrer" className="room-link">
              <Linkedin className="h-4 w-4" />LinkedIn
            </a>
          </div>
        </header>

        <div className="mt-14 space-y-12 md:mt-20 md:space-y-16">
          <ResumeSection title="Profile">
            <p className="t-body">{resume.summary}</p>
          </ResumeSection>

          <ResumeSection title="Core Skills">
            <div className="grid gap-3">
              {resume.skills.map(skill => (
                <p key={skill.label} className="t-body">
                  <span className="font-semibold">{skill.label}: </span>{skill.value}
                </p>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Selected Design Projects">
            <ResumeProjects projects={resume.projects.slice(0, 2)} />
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="space-y-6">
              {resume.experiences.map(experience => (
                <section key={experience.company} className="break-inside-avoid">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="t-body font-semibold">{experience.role}</h3>
                      <p className="t-small text-[#515154]">{experience.company} · {experience.location}</p>
                    </div>
                    <p className="t-small shrink-0 text-[#515154]">{experience.dates}</p>
                  </div>
                  <ul className="t-body mt-2 list-disc space-y-1.5 pl-5 marker:text-[#86868b]">
                    {experience.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Additional Projects">
            <ResumeProjects projects={resume.projects.slice(2)} />
          </ResumeSection>

          <ResumeSection title="Education & Credentials">
            <div className="grid gap-3">
              {resume.education.map(item => (
                <div key={item.degree} className="t-body sm:flex sm:justify-between sm:gap-6">
                  <p><span className="font-semibold">{item.degree}</span><span> — {item.school}</span></p>
                  {item.dates ? <p className="t-small shrink-0 text-[#515154]">{item.dates}</p> : null}
                </div>
              ))}
              <p className="t-body">
                <span className="font-semibold">Selected Training: </span>{resume.training}
              </p>
            </div>
          </ResumeSection>
        </div>
      </article>
      </div>
      <ContactSection />
    </main>
  )
}
