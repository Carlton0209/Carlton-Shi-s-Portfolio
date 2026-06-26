import type { FormEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { ArrowRight, Globe, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const backgroundVideoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const navLinks = ['Features', 'Pricing', 'About']

export function WorksPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  const fadeTo = useCallback((targetOpacity: number, duration = 500) => {
    const video = videoRef.current
    if (!video) return

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
    }

    const startOpacity = Number.parseFloat(video.style.opacity || '0')
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const opacity = startOpacity + (targetOpacity - startOpacity) * progress
      video.style.opacity = String(opacity)

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(animate)
      } else {
        animationFrameRef.current = null
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const handleLoaded = () => {
      fadingOutRef.current = false
      void video.play().catch(() => undefined)
      fadeTo(1)
    }

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      const timeRemaining = video.duration - video.currentTime
      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeTo(0)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'

      window.setTimeout(() => {
        video.currentTime = 0
        fadingOutRef.current = false
        void video.play().catch(() => undefined)
        fadeTo(1)
      }, 100)
    }

    video.addEventListener('loadeddata', handleLoaded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', handleLoaded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [fadeTo])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black font-sans text-white antialiased">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full translate-y-[17%] object-cover"
        src={backgroundVideoUrl}
        style={{ opacity: 0 }}
      />

      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <nav className="relative z-20 px-6 py-6" aria-label="Works navigation">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="relative z-10 flex items-center gap-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
              <span className="text-lg font-semibold text-white">Asme</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <button type="button" className="text-sm font-medium text-white transition-colors hover:text-white/80">
              Sign Up
            </button>
            <button
              type="button"
              className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <span className="relative z-10">Login</span>
            </button>
          </div>
        </div>
      </nav>

      <section className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className="mb-8 whitespace-nowrap text-[clamp(2.55rem,12vw,3rem)] tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="w-full max-w-xl space-y-4">
          <form
            onSubmit={handleSubmit}
            className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="relative z-10 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/40"
              aria-label="Email address"
            />
            <button
              type="submit"
              aria-label="Submit email"
              className="relative z-10 rounded-full bg-white p-3 text-black transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </form>

          <p className="px-4 text-sm leading-relaxed text-white">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          <button
            type="button"
            className="liquid-glass mx-auto rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <span className="relative z-10">Manifesto</span>
          </button>
        </div>
      </section>

      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://www.instagram.com/"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <Instagram className="relative z-10 h-5 w-5" strokeWidth={1.5} />
        </a>
        <a
          href="https://twitter.com/"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <Twitter className="relative z-10 h-5 w-5" strokeWidth={1.5} />
        </a>
        <Link
          to="/"
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <Globe className="relative z-10 h-5 w-5" strokeWidth={1.5} />
        </Link>
      </footer>
    </main>
  )
}
