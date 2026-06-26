import { useCallback, useEffect, useRef } from 'react'
import { ArrowUpRight, Box, Film, Sparkles } from 'lucide-react'

const backgroundVideoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const works = [
  {
    title: 'AI Images',
    label: 'AIGC / Stills',
    description: 'Cinematic visual studies shaped with prompt direction, retouching, and controlled image systems.',
    icon: Sparkles,
  },
  {
    title: 'AI Videos',
    label: 'Motion / Pipeline',
    description: 'Generated video experiments refined through restoration, upscaling, editing, and post workflows.',
    icon: Film,
  },
  {
    title: 'Film & 3D',
    label: 'Cinema / Spatial',
    description: 'Narrative film language, CG craft, 3D modeling, and post-production atmosphere studies.',
    icon: Box,
  },
]

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
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

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8 md:py-16">
        <div className="grid w-full max-w-6xl gap-3 md:grid-cols-3 md:gap-6">
          {works.map((work, index) => {
            const Icon = work.icon

            return (
              <article
                key={work.title}
                className="works-glass-card group min-h-[185px] rounded-[24px] p-4 md:min-h-[360px] md:rounded-[28px] md:p-7"
                style={{ animationDelay: `${index * -1.4}s` }}
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center justify-between md:mb-8">
                      <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                        {work.label}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                    </div>

                    <p className="text-xs text-white/45 md:text-sm">0{index + 1}</p>
                    <h2 className="mt-3 text-3xl font-normal leading-none tracking-tight text-white md:mt-4 md:text-[42px]">
                      {work.title}
                    </h2>
                  </div>

                  <div>
                    <p className="hidden max-w-sm text-sm leading-[1.65] text-white/68 md:block">{work.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/82 md:mt-6">
                      View work
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
