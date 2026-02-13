import { withBase } from 'src/lib/asset'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Film, Palette } from 'lucide-react'

type Category = 'all' | 'ai' | 'film' | 'interactive'

interface Project {
  id: string
  title: string
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
    description:
      'AI-generated image works, driven by a variety of AI tools. All nodes are controllable and replaceable, effectively maintaining consistency and suitable for commercial production.',
    category: 'ai',
    image:
      'https://framerusercontent.com/images/1fCFuJYrV7OzGwQPzUw42fGpcJQ.jpg?width=1024&height=1024',
    tags: ['ComfyUI', 'Midjourney', 'AdobeFirefly'],
    link: 'https://carltonshi0209.my.canva.site/aigc'
  },
  {
    id: '2',
    title: 'One-day Migration',
    description:
      'A short film following three drifting individuals whose intersecting journeys use migration as a metaphor to explore belonging amid rapid urban change.',
    category: 'film',
    image:
      'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
    tags: ['Cinematic Narrative', 'ARRI ALEXA', 'DaVinci Resolve'],
    link: 'https://filmfreeway.com/One-dayMigration',
  },
  {
    id: '3',
    title: 'Fintech Dashboard',
    description:
      'A comprehensive trading dashboard with real-time data visualization and dark mode aesthetics.',
    category: 'interactive',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Figma', 'React', 'D3.js'],
  },
  {
    id: '4',
    title: 'AI Generated Videos',
    description:
      'AI-powered videos combine multiple models with ComfyUI high-definition upscaling, watermark removal, and image quality restoration.',
    category: 'ai',
    image: withBase('images/uiaosdyhulaksjhd.jpg'),
    tags: ['ComfyUI', 'Stable Diffusion', 'AdobeFirefly'],
    link: 'https://carltonshi0209.my.canva.site/aigc'
  },
  {
    id: '5',
    title: 'Other Films and 3D Modeling works',
    description:
      "The tools used to create these works include Adobe software, Unreal Engine, Nuke, Houdini, Maya, Blender, and others.",
    category: 'film',
    image: withBase('images/img.png'),
    tags: ['Narrative', 'Unreal Engine', 'Houdini', 'Blender'],
    link: 'https://carltonshi0209.my.canva.site'
  },
  {
    id: '6',
    title: 'Wellness App',
    description: 'A mindfulness and meditation app with calming UI patterns and habit-tracking features.',
    category: 'interactive',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    tags: ['Mobile Design', 'Prototyping', 'User Research'],
  },
]

const categories = [
  { id: 'all' as Category, label: 'All Work', icon: null },
  { id: 'ai' as Category, label: 'AIGC', icon: Sparkles },
  { id: 'film' as Category, label: 'Film & Video', icon: Film },
  { id: 'interactive' as Category, label: 'Interactive Design', icon: Palette },
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
  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Selected Work
            </span>
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">Portfolio</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated selection of projects spanning AI-generated content, traditional filmmaking, and digital design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon && <cat.icon className="w-4 h-4" />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                {/* Card */}
                <div
                  className="bg-card rounded-2xl overflow-hidden flex flex-col h-full
                             border border-foreground/10 hover:border-foreground/30
                             transition-all duration-500 hover:-translate-y-1
                             hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700
                                 group-hover:scale-[1.04]
                                 group-hover:contrast-125
                                 group-hover:saturate-90"
                    />

                    {/* A24 Poster Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      {/* Dark vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      {/* Film grain */}
                      <div
                        className="absolute inset-0 mix-blend-overlay opacity-[0.10]
                                   [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.9)_1px,transparent_0)]
                                   [background-size:3px_3px]"
                      />

                      {/* Bottom copy locked to bottom-left */}
                      <div className="absolute left-0 right-0 bottom-0 p-6">
                        <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="text-white/80 text-[11px] tracking-[0.35em] uppercase mb-2">
                            PROJECT
                          </div>

                          <div className="text-white text-lg font-semibold leading-tight">{project.title}</div>

                          {/* Clickable VIEW PROJECT (enable pointer events only here) */}
                          <SmartLink
                                to={project.link ?? `/projects/${project.id}`}
                                className="pointer-events-auto mt-2 inline-flex text-white/70 text-[11px]
                                          tracking-[0.35em] uppercase hover:text-white transition-colors duration-300"
                              >
                                <span className="border-b border-white/40 pb-1 hover:border-white">VIEW PROJECT</span>
                              </SmartLink>
                        </div>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm bg-white/20 text-white">
                        {project.category === 'ai'
                          ? 'AIGC'
                          : project.category === 'film'
                          ? 'Film & Video'
                          : 'Interactive'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold tracking-tight mb-2">{project.title}</h3>

                    <p className="text-muted-foreground/80 text-sm leading-relaxed mb-4">{project.description}</p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
