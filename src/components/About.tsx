'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, Film, MapPin, Palette, Sparkles } from 'lucide-react'

const skills = [
  {
    icon: Sparkles,
    label: 'AI Video',
    tools: ['Runway Gen-3', 'Sora', 'Midjourney', 'Stable Diffusion', 'Adobe Firefly', 'Veo 3', 'Nanobanana', 'SeeDance 2.0'],
  },
  {
    icon: Film,
    label: 'Film & Video',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Unreal Engine', 'Nuke', 'Maya', 'Photoshop', 'Houdini'],
  },
  {
    icon: Palette,
    label: 'Interactive Design',
    tools: ['Figma', 'Framer', 'React', 'Tailwind CSS', 'Prototyping'],
  },
]

const disciplines = [
  'Directing / Visual Storytelling',
  'Cinematography / Lighting',
  'AI Image & Video Generation',
  'Post / Editing / Color',
]

const details = [
  { icon: MapPin, label: 'Syracuse, NY' },
  { icon: Calendar, label: 'Working since 2021' },
  { icon: Award, label: 'Award-winning films' },
]

export function About() {
  return (
    <section id="about" className="bg-[#f5f5f7] px-5 py-20 text-[#1d1d1f] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-[21px] font-semibold leading-[1.19]">About</p>
          <h2 className="text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-6xl">
            Where technology learns cinematic restraint.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[22px] font-light leading-[1.45] text-[#333] sm:text-[28px] sm:leading-[1.18]">
            I work across AI production, cinematography, and interface design, shaping each project around atmosphere, clarity, and story tension.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="rounded-[18px] border border-[#e0e0e0] bg-white p-6 transition-shadow hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8"
          >
            <p className="text-[17px] leading-[1.47] text-[#1d1d1f]">
              My work spans AI-generated short films, traditional production, commercial visuals, and digital products. I like tools that can disappear into the frame, leaving the viewer with a feeling instead of a process.
            </p>
            <p className="mt-5 text-[17px] leading-[1.47] text-[#333]">
              The portfolio is organized around a simple idea: cinematic artifacts first, workflow second. Every image, reel, and interface should feel inspected, not decorated.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {details.map(item => (
                <motion.span
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e0e0e0] px-4 text-sm text-[#333]"
                >
                  <item.icon className="h-4 w-4 text-[#0066cc]" />
                  {item.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {disciplines.map(discipline => (
              <motion.div
                key={discipline}
                whileHover={{ y: -4, borderColor: '#0066cc' }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="rounded-[18px] border border-[#e0e0e0] bg-white p-6 transition-shadow hover:shadow-[0_14px_36px_rgba(0,0,0,0.07)]"
              >
                <p className="text-[17px] font-semibold leading-[1.24]">{discipline}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map(skill => (
            <motion.div
              key={skill.label}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="rounded-[18px] border border-[#e0e0e0] bg-white p-6 transition-shadow hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <skill.icon className="mb-5 h-7 w-7 text-[#0066cc]" />
              <h3 className="text-[21px] font-semibold leading-[1.19]">{skill.label}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {skill.tools.map(tool => (
                  <motion.span
                    key={tool}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-[#e0e0e0] px-3 py-1.5 text-sm text-[#333] transition-colors hover:border-[#0066cc]/35 hover:text-[#0066cc]"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
