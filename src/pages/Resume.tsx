import { ArrowLeft, Download, Linkedin, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { resume } from '../data/resume'
import { withBase } from '../lib/asset'

const resumePdf = withBase('resume/Resume.pdf')

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-zinc-200 pt-5">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{title}</h2>
      {children}
    </section>
  )
}

type ResumeProject = (typeof resume.projects)[number]

function ResumeProjects({ projects }: { projects: readonly ResumeProject[] }) {
  return (
    <div className="space-y-6">
      {projects.map(project => (
        <section key={project.name}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-zinc-950">
              <a href={project.href} target="_blank" rel="noreferrer" className="hover:underline">{project.name}</a>
            </h3>
            <p className="text-sm font-medium text-zinc-500">{project.label}</p>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
            {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function ResumePage() {
  return (
    <main className="min-h-screen bg-black px-5 py-6 text-zinc-950 sm:px-8 lg:px-16">
      <nav className="mx-auto mb-6 flex max-w-5xl items-center justify-between" aria-label="Resume navigation">
        <Link
          to="/"
          className="liquid-glass inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white font-body"
        >
          <ArrowLeft className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={resume.linkedIn}
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">{resume.headline}</p>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-none tracking-normal text-zinc-950 sm:text-5xl">{resume.name}</h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">{resume.location}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 md:items-end">
              <a href={`tel:${resume.phone.replace(/-/g, '')}`} className="inline-flex items-center gap-2 hover:text-zinc-950">
                <Phone className="h-4 w-4" />{resume.phone}
              </a>
              <a href={`mailto:${resume.email}`} className="inline-flex items-center gap-2 hover:text-zinc-950">
                <Mail className="h-4 w-4" />{resume.email}
              </a>
              <a href={resume.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-zinc-950">
                <Linkedin className="h-4 w-4" />LinkedIn
              </a>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <ResumeSection title="Profile">
            <p className="text-base leading-relaxed text-zinc-700">{resume.summary}</p>
          </ResumeSection>

          <ResumeSection title="Core Skills">
            <div className="grid gap-3">
              {resume.skills.map(skill => (
                <p key={skill.label} className="text-sm leading-relaxed text-zinc-700">
                  <span className="font-semibold text-zinc-950">{skill.label}: </span>{skill.value}
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
                      <h3 className="text-lg font-semibold text-zinc-950">{experience.role}</h3>
                      <p className="text-sm text-zinc-500">{experience.company} · {experience.location}</p>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-zinc-500">{experience.dates}</p>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
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
                <div key={item.degree} className="text-sm leading-relaxed text-zinc-700 sm:flex sm:justify-between sm:gap-6">
                  <p><span className="font-semibold text-zinc-950">{item.degree}</span><span> — {item.school}</span></p>
                  {item.dates ? <p className="shrink-0 font-medium text-zinc-500">{item.dates}</p> : null}
                </div>
              ))}
              <p className="text-sm leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-950">Selected Training: </span>{resume.training}
              </p>
            </div>
          </ResumeSection>
        </div>
      </article>
    </main>
  )
}
