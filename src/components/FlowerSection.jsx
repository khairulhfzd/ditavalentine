import { useState, useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import { Flower2 } from 'lucide-react'

const petals = Array.from({ length: 14 }, (_, i) => i)

function PetalBurst({ burstId }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const petalElements = containerRef.current.querySelectorAll('.petal')

    gsap.fromTo(
      petalElements,
      {
        scale: 0.3,
        opacity: 0.9,
      },
      {
        x: (index) => {
          const angle = (index / petals.length) * Math.PI * 2
          const distance = 80 + (index % 3) * 18
          return Math.cos(angle) * distance
        },
        y: (index) => {
          const angle = (index / petals.length) * Math.PI * 2
          const distance = 80 + (index % 3) * 18
          return Math.sin(angle) * distance * 0.7
        },
        scale: 1,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        stagger: 0.05,
      }
    )
  }, [burstId])

  if (burstId === 0) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      key={burstId}
    >
      {petals.map((petal) => (
        <span
          key={`${burstId}-${petal}`}
          className="petal absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gradient-to-tr from-blush-400 to-blush-200 shadow-[0_0_12px_rgba(255,182,193,0.9)]"
        />
      ))}
    </div>
  )
}

function FlowerSection() {
  const [burstId, setBurstId] = useState(0)
  const headerRef = useRef(null)
  const buttonRef = useRef(null)

  const handleBloom = () => {
    setBurstId((prev) => prev + 1)

    // Button feedback animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      })

      // Button reveal
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 85%',
        },
      })


    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="flower" className="section-padding">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <div ref={headerRef}>
          <p className="text-xs uppercase tracking-[0.28em] text-blush-200/90">
            Interactive moment
          </p>

          <h2 className="font-display text-3xl text-white sm:text-4xl mt-4">
            Tap the flower,
            <span className="block text-blush-200">
              and let the petals answer for me.
            </span>
          </h2>

          <p className="max-w-xl text-sm text-blush-100/80 sm:text-[0.95rem] mt-4">
            Every click is a quiet little &quot;I choose you&quot;. Watch the petals
            bloom and imagine each one carrying a reason I&apos;m grateful for you.
          </p>
        </div>

        <div className="relative mt-4 flex items-center justify-center">
          <div className="relative">
            <PetalBurst burstId={burstId} />
            <button
              ref={buttonRef}
              type="button"
              onClick={handleBloom}
              className="group relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-ink-800/90 via-ink-900/95 to-ink-900/95 shadow-[0_18px_45px_rgba(0,0,0,0.85)] outline-none transition hover:border-blush-400/70 hover:shadow-[0_20px_60px_rgba(255,59,115,0.45)] focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.22),transparent_55%)] opacity-60 transition group-hover:opacity-90" />
              <div className="relative flex flex-col items-center justify-center text-blush-100">
                <Flower2 className="mb-1 h-9 w-9 text-blush-300 drop-shadow-[0_0_12px_rgba(255,182,193,0.8)]" />
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em]">
                  Bloom
                </span>
              </div>
            </button>
          </div>
        </div>

        <p className="text-[0.75rem] text-blush-200/80">
          You can tap it more than once - my feelings don&apos;t run out.
        </p>
      </div>
    </section>
  )
}

export default FlowerSection
