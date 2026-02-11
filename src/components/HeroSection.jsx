import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MusicPlayer from './MusicPlayer'

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function HeroSection({ musicReady }) {
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches

      // Initial fade-in animation
      gsap.from(titleRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })

      gsap.from(cardRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
      })

      // Background color transition on scroll: dark → valentine colors → dark
      // Use overlay element for smooth transitions without flickering
      const gradientOverlay = document.createElement('div')
      gradientOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at top, rgba(255,182,193,0.35), transparent 55%), 
                    radial-gradient(circle at bottom, rgba(255,105,180,0.35), transparent 55%);
        opacity: 0;
        will-change: opacity;
      `
      sectionRef.current.insertBefore(gradientOverlay, sectionRef.current.firstChild)

      // Animate the overlay opacity for smooth color transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // 0% -> 50%: fade in valentine colors
      // 50% -> 100%: fade out valentine colors
      tl.to(gradientOverlay, { opacity: 1, duration: 0.5, ease: 'none' })
        .to(gradientOverlay, { opacity: 0, duration: 0.5, ease: 'none' })

      // Multi-layer parallax effect
      gsap.to(backgroundRef.current, {
        yPercent: isMobile ? 15 : 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(contentRef.current, {
        yPercent: isMobile ? 8 : 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Fade out on scroll
      gsap.to(sectionRef.current, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden section-padding"
      style={{ background: 'linear-gradient(to bottom, #05030a, #120b1f)' }}
    >
      {/* Soft parallax glow shapes */}
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute -inset-40 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-blush-500/25 blur-3xl" />
        <div className="absolute -right-16 top-20 h-96 w-96 rounded-full bg-blush-300/20 blur-3xl" />
        <div className="absolute left-1/2 bottom-0 h-52 w-52 -translate-x-1/2 rounded-full bg-blush-400/15 blur-3xl" />
      </div>

      {/* Card content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 md:flex-row md:items-center"
      >
        <div ref={titleRef} className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-blush-200/80">
            To: My Valentine, Dita
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Every heartbeat
            <span className="block bg-gradient-to-r from-blush-200 via-blush-400 to-blush-200 bg-clip-text text-transparent">
              spells your name.
            </span>
          </h1>
          <p className="max-w-xl text-sm text-blush-100/80 sm:text-base">
            I'm giving you this to show how much I love you, to remind you how long we've been together, and to let you know I'll always love you. Always. And I'm sorry if I ever made you feel sad or annoyed.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-6 py-3 text-sm font-medium text-white shadow-[0_18px_45px_rgba(255,59,115,0.45)] transition-all duration-300 hover:scale-105 hover:bg-blush-400 hover:shadow-[0_22px_60px_rgba(255,59,115,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
              onClick={() => scrollToSection('story')}
            >
              <Sparkles className="h-4 w-4" />
              Start our story
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-blush-50/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/10"
              onClick={() => scrollToSection('message')}
            >
              Read my letter
            </button>
          </div>
        </div>

        <div className="flex flex-1 justify-center md:justify-end">
          <div
            ref={cardRef}
            className="glass-panel relative aspect-[4/5] w-full max-w-xs overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.22),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(255,182,193,0.2),transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.28em] text-blush-100/90">
                  Our little universe
                </p>
                <p className="font-display text-xl text-white/95">
                  1 story, 2 hearts,
                  <span className="block text-blush-100/90">∞ reasons I love you.</span>
                </p>
              </div>

              {/* Music Player */}
              <div className="flex-1 flex items-center py-4">
                <MusicPlayer musicReady={musicReady} />
              </div>

              <div className="space-y-3 text-xs text-blush-100/90">
                <p>
                  Scroll down to see the memories we&apos;ve made, the words I&apos;ve
                  been saving, and a small surprise blooming just for you.
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-blush-200/90">
                  Curated with love • Best viewed with your smile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
