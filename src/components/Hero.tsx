'use client'

import { withBase } from '../lib/asset'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#portfolio', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const heroSignals = ['Film Direction', 'AI Visuals', 'Interactive Systems']

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const currentSection = navLinks
        .map(link => link.href.replace('#', ''))
        .find(id => {
          const element = document.getElementById(id)
          if (!element) return false

          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        })

      setActiveSection(currentSection ?? '')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <nav
        className={`fixed left-0 right-0 top-0 z-[120] h-14 border-b border-black/5 bg-[#f5f5f7]/90 text-[#1d1d1f] backdrop-blur-xl transition-colors duration-300 ${
          isScrolled ? 'bg-[#f5f5f7]/95 shadow-[0_1px_0_rgba(0,0,0,0.05)]' : 'bg-[#f5f5f7]/[0.82]'
        }`}
      >
        <div className="mx-auto grid h-full max-w-[90rem] grid-cols-[minmax(4.75rem,1fr)_auto_minmax(4.75rem,1fr)] items-center px-4 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="justify-self-start whitespace-nowrap text-xs font-semibold text-[#1d1d1f]/90 transition-colors hover:text-[#0066cc] active:scale-95 sm:text-sm"
          >
            Carlton Shi
          </button>

          <div className="flex items-center justify-center gap-2 rounded-full bg-white/35 p-1 sm:gap-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-2.5 py-1.5 text-[11px] font-normal transition-colors sm:px-4 sm:text-xs ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-white text-[#1d1d1f] shadow-[0_1px_8px_rgba(0,0,0,0.06)]'
                    : 'text-[#1d1d1f]/70 hover:text-[#0066cc]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex min-h-8 items-center justify-self-end rounded-full bg-[#0066cc] px-4 text-xs text-white transition-all hover:bg-[#0071e3] hover:shadow-[0_8px_22px_rgba(0,102,204,0.24)] active:scale-95"
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="absolute inset-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          animate={{ scale: isScrolled ? 1.025 : 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full w-full object-cover"
        >
          <source src={withBase('videos/hero.mp4')} type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-black/[0.48]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.48)_100%)]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-16 pt-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-4 text-[21px] font-semibold leading-[1.19] text-white/[0.88]">
            Film, AI visuals, and interactive design.
          </p>
          <h1 className="text-5xl font-semibold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
            Jingchuan (Carlton) Shi
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[22px] font-light leading-[1.45] text-white/[0.82] sm:text-[28px] sm:leading-[1.18]">
            Cinematic work built with a story-first eye and an AI-native production toolkit.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              href="#portfolio"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0066cc] px-[22px] text-[17px] text-white transition-colors hover:bg-[#0071e3]"
            >
              View Work
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2997ff] px-[22px] text-[17px] text-[#2997ff] transition-colors hover:border-white/70 hover:text-white"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {heroSignals.map((signal, index) => (
              <motion.span
                key={signal}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.18)' }}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/82 backdrop-blur-xl"
              >
                {signal}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
