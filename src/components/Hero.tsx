'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#portfolio', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-foreground flex items-end pb-20 lg:pb-28">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
          poster="/images/hero-poster.jpg"
        >
          <source src={withBase("videos/hero.mp4")} type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
      </div>


      {/* Geometric accents removed as per user request */}

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-5 transition-all duration-300 ${
          isScrolled ? 'bg-foreground/90 backdrop-blur-xl border-b border-background/10' : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between max-w-[96rem] mx-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-display text-background text-lg tracking-[0.15em] uppercase font-bold">
                Carlton Shi<span className="text-red-500">.</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-background text-sm font-medium tracking-wider uppercase gentle-animation"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="hidden sm:block bg-red-500 text-white text-sm font-semibold px-6 py-2.5 rounded-sm hover:opacity-90 gentle-animation tracking-wide uppercase"
              >
                Hire Me
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-background hover:text-red-500 gentle-animation cursor-pointer z-[120] relative"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden fixed inset-0 bg-foreground/90 backdrop-blur-md z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-foreground/95 backdrop-blur-xl border-l border-background/10 z-[90]"
      >
        <div className="flex flex-col pt-24 px-8 space-y-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-4 text-zinc-400 hover:text-background hover:bg-background/10 rounded-sm font-medium text-sm tracking-wider uppercase gentle-animation"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 bg-red-500 text-white text-center text-sm font-semibold px-6 py-3 rounded-sm tracking-wide uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hire Me
          </a>
        </div>
      </motion.div>

      {/* Hero Content — asymmetric Brockmann layout */}
      <div className="relative z-40 w-full max-w-[96rem] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main title — spans 8 columns, breaks grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span className="text-sm font-mono font-medium text-cyan-400/90 tracking-widest uppercase">
                Available for freelance
              </span>
            </div>

            <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-display leading-[0.9] tracking-[-0.04em] text-background mb-8">
              Creative
              <br />
              <span className="text-red-500">Story</span>teller
              <br />
              <span className="text-zinc-400">&amp; Designer</span>
            </h1>
          </motion.div>

          {/* Right column — 4 cols, description + tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-4 lg:pb-4"
          >
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
              I craft AI-generated videos, direct traditional films, and design intuitive digital experiences. Blending technology with artistry.
            </p>

            <div className="flex flex-wrap gap-2">
              {['AI Video', 'Film & Video', 'UI/UX Design'].map(tag => (
                <span
                  key={tag}
                  className="border border-background/20 text-zinc-400 px-4 py-1.5 rounded-sm text-xs font-medium tracking-wider uppercase backdrop-blur-sm bg-background/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grid reference line — Brockmann homage */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-12 h-px bg-gradient-to-r from-red-500 via-background/20 to-transparent origin-left"
        />
      </div>

      {/* Scroll indicator removed as per user request */}
    </div>
  )
}
