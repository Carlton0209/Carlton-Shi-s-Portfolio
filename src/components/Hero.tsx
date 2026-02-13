'use client'
import { withBase } from "../lib/asset"

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
    <div className="relative min-h-screen w-full overflow-hidden bg-foreground flex items-center">
      {/* Background video */}
      <div className="absolute inset-0">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
    poster={withBase("images/hero-poster.jpg")}
  >
    <source src={withBase("videos/hero.mp4")} type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-foreground/70" />
</div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-foreground/90 backdrop-blur-xl border-b border-background/10' : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-bagel text-background text-zinc-300/80 hover:text-zinc-200 text-xl tracking-wider">Jingchuan (Carlton) Shi</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-zinc-400/80 hover:text-zinc-300">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="hidden sm:block bg-accent-purple text-background font-semibold text-background hover:bg-background/20 px-6 py-3 rounded-md hover:opacity-90 gentle-animation"
              >
                Get in Touch
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-background hover:bg-background/20 gentle-animation cursor-pointer z-[120] relative"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden fixed inset-0 bg-foreground/80 backdrop-blur-md z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-foreground/95 backdrop-blur-xl border-l border-background/10 z-[90]"
      >
        <div className="flex flex-col pt-20 px-6 space-y-4 text-background">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="px-4 py-3 hover:bg-background/10 rounded-lg font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-40 container mx-auto px-6 sm:px-8 lg:px-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 bg-background/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium text-background/80"></span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] text-background mb-8">
            <span className="block">Creative</span>
            <span className="block text-accent-purple">Storyteller</span>
            <span className="block text-background/60">&amp; Designer</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            I craft AI-generated videos, direct traditional films, and design intuitive digital experiences. Blending technology with artistry.
          </p>

          <div className="flex flex-wrap text-zinc-400 gap-4">
            {['Film & Video', 'AI Visuals', 'Interactive Design'].map(tag => (
              <span key={tag} className="bg-background/10 backdrop-blur-sm border border-background/20 text-background/90 px-4 py-2 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="w-6 h-10 border-2 border-background/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-background/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  )
}
