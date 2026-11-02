import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }

const full = '(prefers-reduced-motion: no-preference)'
const hidden = { y: 28, opacity: 0 }
const shown = { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity' }

/**
 * The page's shared motion layer, scoped to one root:
 * - [data-reveal-group] sections stagger their [data-reveal] parts in once (heading, text, picture).
 * - [data-reveal-item] grid entries rise in batches as they reach the screen.
 * - [data-drift] elements move by data-drift percent of their height while they cross the screen.
 * - [data-zoom] pictures ease from 1.12 down to 1 as their frame scrolls through.
 * Only what is on the first screen starts hidden; everything below stays visible until the moment it
 * reaches the screen's edge, so no content is ever left hidden. Reduced motion keeps every element in place.
 */
export function useRoomMotion(scope: RefObject<HTMLElement | null>, dependencies: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(full, () => {
        // The page's own first screen, wherever the window happens to be scrolled when it opens.
        const onFirstScreen = (element: Element) => element.getBoundingClientRect().top + window.scrollY < window.innerHeight

        gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach(group => {
          const parts = group.querySelectorAll<HTMLElement>('[data-reveal]')
          if (!parts.length) return
          if (onFirstScreen(group)) {
            gsap.fromTo(parts, hidden, { ...shown, stagger: 0.08, delay: 0.1 })
            return
          }
          gsap.fromTo(parts, hidden, {
            ...shown,
            stagger: 0.08,
            immediateRender: false,
            scrollTrigger: { trigger: group, start: 'top bottom', once: true },
          })
        })

        // Long grids reveal row by row as each part arrives, not all at once.
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal-item]')
        const firstItems = items.filter(onFirstScreen)
        if (firstItems.length) gsap.fromTo(firstItems, hidden, { ...shown, duration: 0.8, stagger: 0.07, delay: 0.1 })
        const laterItems = items.filter(item => !firstItems.includes(item))
        if (laterItems.length) {
          ScrollTrigger.batch(laterItems, {
            start: 'top bottom',
            once: true,
            onEnter: batch => gsap.fromTo(batch, hidden, { ...shown, duration: 0.8, stagger: 0.07 }),
          })
        }

        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach(element => {
          const amount = Number(element.dataset.drift) || 8
          gsap.fromTo(
            element,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-zoom]').forEach(element => {
          gsap.fromTo(
            element,
            { scale: 1.12 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: element.parentElement ?? element, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })

      // Pictures load after layout; measure again once they have.
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      return () => window.removeEventListener('load', refresh)
    },
    { scope, dependencies },
  )
}
