'use client'

import { motion } from 'framer-motion'
import { Sparkles, Film, Palette, Award, Calendar, MapPin } from 'lucide-react'

const skills = [
  { icon: Sparkles, label: 'AI Video', tools: ['Runway Gen-3', 'Sora', 'Midjourney', 'Stable Diffusion', 'AdobeFirefly','Veo3','Sora','Nanobanana','SeeDance2.0'] },
  { icon: Film, label: 'Film & Video', tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Unreal Engine', 'Nuke', 'Maya', 'PhotoShop', 'Houdini'] },
  { icon: Palette, label: 'Interactive Design', tools: ['Figma', 'Framer', 'React', 'Tailwind CSS', 'Prototyping'] },
]

const stats = [
  { value: 'Directing / Visual Storytelling', label: '' },
  { value: 'Cinematography / Lighting', label: '' },
  { value: 'AI Image & Video Generation', label: '' },
  { value: 'Post / Editing / Color', label: '' },
]

export function About() {
  return (
    <section id="about" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">About Me</span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            Where Tech<br />Meets Craft
          </h2>
        </div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto mb-24">
          <div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              I'm a multidisciplinary creative, working at the intersection of artificial intelligence, cinematography, and digital design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              My work spans from directing AI-generated short films to producing traditional films and commercials. On the design side, I craft user interfaces that feel as cinematic as the stories I tell on screen.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Syracuse, NY, 13210</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Since 2021</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Award Winner</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-background clean-border rounded-2xl p-6 text-center subtle-shadow">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 tracking-tight leading-snug">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map(skill => (
            <div key={skill.label} className="bg-background clean-border rounded-2xl p-8 subtle-shadow hover:elevated-shadow gentle-animation">
              <skill.icon className="w-8 h-8 text-accent-purple mb-4" />
              <h3 className="text-xl font-bold mb-4">{skill.label}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map(tool => (
                  <span key={tool} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
