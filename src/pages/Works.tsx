import { useCallback, useEffect, useRef } from 'react'

const backgroundVideoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

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
    <main className="relative min-h-screen overflow-hidden bg-black">
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
    </main>
  )
}
