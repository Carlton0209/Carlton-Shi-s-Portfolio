import { withBase } from '../lib/asset'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Film, Monitor, Sparkles } from 'lucide-react'

type Category = 'all' | 'ai' | 'film' | 'interactive'

interface Project {
  id: string
  title: string
  kicker: string
  description: string
  category: Category
  image: string
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI Generated Images',
    kicker: 'Commercial AI image system',
    description:
      'A controllable image-generation workflow for consistent commercial visuals, concept frames, and campaign-ready art direction.',
    category: 'ai',
    image:
      'https://framerusercontent.com/images/1fCFuJYrV7OzGwQPzUw42fGpcJQ.jpg?width=1024&height=1024',
    tags: ['ComfyUI', 'Midjourney', 'Adobe Firefly'],
    link: 'https://carltonshi0209.my.canva.site/aigc',
  },
  {
    id: '2',
    title: 'One-day Migration',
    kicker: 'Narrative short film',
    description:
      'Three drifting people cross paths across one day, using migration as a quiet metaphor for belonging, speed, and urban change.',
    category: 'film',
    image:
      'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
    tags: ['Cinematic Narrative', 'ARRI ALEXA', 'DaVinci Resolve'],
    link: 'https://filmfreeway.com/One-dayMigration',
  },
  {
    id: '3',
    title: 'REALLIFE AI',
    kicker: 'Interactive product prototype',
    description:
      'A one-click cinematic portrait enhancer designed around trust, realism, and a clean user journey from upload to output.',
    category: 'interactive',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop',
    tags: ['Figma', 'React', 'AI Pipelines'],
  },
  {
    id: '4',
    title: 'AI Generated Videos',
    kicker: 'AI video production',
    description:
      'A video pipeline combining generation models, ComfyUI restoration, upscaling, and post workflows for polished short-form pieces.',
    category: 'ai',
    image: withBase('images/uiaosdyhulaksjhd.jpg'),
    tags: ['ComfyUI', 'Stable Diffusion', 'Adobe Firefly'],
    link: 'https://carltonshi0209.my.canva.site/aigc',
  },
  {
    id: '5',
    title: 'Films and 3D Modeling',
    kicker: 'Film craft and 3D work',
    description:
      'A broader archive of traditional film, CG, and post-production work across Adobe tools, Unreal Engine, Nuke, Houdini, Maya, and Blender.',
    category: 'film',
    image: withBase('images/img.png'),
    tags: ['Narrative', 'Unreal Engine', 'Houdini', 'Blender'],
    link: 'https://carltonshi0209.my.canva.site',
  },
  {
    id: '6',
    title: 'Multi-source Dashboard',
    kicker: 'Web application interface',
    description:
      'A React dashboard that gathers multi-channel news streams into a calm, scannable interface for quick content monitoring.',
    category: 'interactive',
    image: withBase('images/ScreenShot_2026-03-29_141024_206.png'),
    tags: ['Web App', 'Prototyping', 'Aggregation'],
    link: 'https://carlton0209.github.io/Multi-source-Content-Dashboard/',
  },
]

const categories = [
  { id: 'all' as Category, label: 'All Work', icon: Monitor },
  { id: 'ai' as Category, label: 'AIGC', icon: Sparkles },
  { id: 'film' as Category, label: 'Film & Video', icon: Film },
  { id: 'interactive' as Category, label: 'Interactive Design', icon: Monitor },
]

function SmartLink({
  to,
  children,
  className,
}: {
  to: string
  children: React.ReactNode
  className?: string
}) {
  const isExternal = /^https?:\/\//.test(to)

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const filtered = activeCategory === 'all' ? projects : projects.filter(project => project.category === activeCategory)

  return (
    <section id="portfolio" className="bg-white text-[#1d1d1f]">
      <div className="bg-[#f5f5f7] px-5 py-20 text-center sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[21px] font-semibold leading-[1.19]">
            Selected Work
          </p>
          <h2 className="text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-6xl">
            A quiet gallery for cinematic systems.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-[22px] font-light leading-[1.45] text-[#333] sm:text-[28px] sm:leading-[1.18]">
            AI-generated imagery, films, and interfaces, presented with the work doing the talking.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm transition-transform active:scale-95 ${
                activeCategory === category.id
                  ? 'bg-[#0066cc] text-white'
                  : 'border border-[#e0e0e0] bg-white text-[#333] hover:text-[#0066cc]'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const isDark = index % 2 === 1
            const surface = isDark ? 'bg-[#272729] text-white' : 'bg-white text-[#1d1d1f]'
            const body = isDark ? 'text-[#cccccc]' : 'text-[#333]'
            const link = isDark ? 'text-[#2997ff]' : 'text-[#0066cc]'

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`${surface} px-5 py-20 sm:px-8 lg:py-24`}
              >
                <div className="mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
                  <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
                    <p className="mb-3 text-[21px] font-semibold leading-[1.19]">
                      {project.kicker}
                    </p>
                    <h3 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>
                    <p className={`mt-5 text-[22px] font-light leading-[1.45] sm:text-[28px] sm:leading-[1.18] ${body}`}>
                      {project.description}
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className={`rounded-full border px-4 py-2 text-sm ${
                            isDark ? 'border-white/[0.14] text-white/80' : 'border-[#e0e0e0] text-[#333]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <SmartLink
                      to={project.link ?? `/projects/${project.id}`}
                      className={`mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border px-[22px] text-[17px] transition-transform active:scale-95 ${
                        isDark ? 'border-[#2997ff]' : 'border-[#0066cc]'
                      } ${link}`}
                    >
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </SmartLink>
                  </div>

                  <SmartLink
                    to={project.link ?? `/projects/${project.id}`}
                    className="group block"
                  >
                    <div className="rounded-lg bg-[#f5f5f7]" style={{ boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0' }}>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                        />
                      </div>
                    </div>
                  </SmartLink>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
