'use client'

import { withBase } from '../lib/asset'
import { motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#portfolio', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <nav className="fixed left-0 right-0 top-0 z-[120] h-11 bg-black text-white">
        <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-normal text-white/[0.92] transition-opacity active:scale-95"
          >
            Carlton Shi
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-normal text-white/[0.72] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden min-h-8 items-center rounded-full bg-[#0066cc] px-4 text-xs font-normal text-white transition-transform active:scale-95 sm:inline-flex"
            >
              Contact
            </a>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen(value => !value)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed left-0 right-0 top-11 z-[110] h-[52px] border-b border-black/5 bg-[#f5f5f7]/90 text-[#1d1d1f] backdrop-blur-xl transition-colors ${
          isScrolled ? 'bg-[#f5f5f7]/95' : 'bg-[#f5f5f7]/[0.82]'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#hero" className="text-[21px] font-semibold leading-none">
            Portfolio
          </a>
          <div className="hidden items-center gap-6 sm:flex">
            <a href="#portfolio" className="text-sm text-[#1d1d1f]/70 hover:text-[#1d1d1f]">
              Selected Work
            </a>
            <a href="#about" className="text-sm text-[#1d1d1f]/70 hover:text-[#1d1d1f]">
              About
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-8 items-center rounded-full bg-[#0066cc] px-4 text-sm text-white transition-transform active:scale-95"
            >
              Hire Me
            </a>
          </div>
          <a
            href="#contact"
            className="inline-flex min-h-8 items-center rounded-full bg-[#0066cc] px-4 text-sm text-white transition-transform active:scale-95 sm:hidden"
          >
            Hire Me
          </a>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 pt-24 backdrop-blur-xl md:hidden"
        >
          <div className="mx-5 rounded-[18px] border border-white/10 bg-black p-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-11 items-center justify-between border-b border-white/10 px-3 text-[17px] text-white last:border-b-0"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-[#2997ff]" />
              </a>
            ))}
          </div>
        </motion.div>
      )}

      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover">
          <source src={withBase('videos/hero.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/[0.48]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-16 pt-36 text-center sm:px-8">
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
            <a
              href="#portfolio"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0066cc] px-[22px] text-[17px] text-white transition-transform active:scale-95"
            >
              View Work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2997ff] px-[22px] text-[17px] text-[#2997ff] transition-transform active:scale-95"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
