import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

function MessageSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const cardRef = useRef(null)
  const paragraphsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      })

      // Card reveal
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
        },
      })

      // Paragraph fade-in with stagger
      gsap.from(paragraphsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 70%',
        },
      })

      // Parallax effect on card
      gsap.to(cardRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="message" ref={containerRef} className="section-padding">
      <div className="mx-auto max-w-4xl space-y-6">
        <div ref={headerRef}>
          <p className="text-xs uppercase tracking-[0.28em] text-blush-200/90">
            A letter for you
          </p>

          <h2 className="font-display text-3xl text-white sm:text-4xl mt-4">
            If I could turn feelings into words,
            <span className="block text-blush-200">
              they would still fall short of you.
            </span>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="glass-panel relative overflow-hidden p-6 sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(255,182,193,0.14),transparent_55%)]" />
          <div className="relative space-y-5 text-sm leading-relaxed text-blush-50/90 sm:text-[0.95rem]">
            <p ref={(el) => (paragraphsRef.current[0] = el)}>
              You have this weird talent of making things better without even trying. 
              Bad days feel lighter, good days feel more fun, and normal days somehow turn into something worth remembering. 
              I still don't get how you do that.
            </p>
            <p ref={(el) => (paragraphsRef.current[1] = el)}>
              Thank you for being patient with me, for supporting me, for laughing at my jokes (even the bad ones), 
              and for always being there when I need you. You really show up, and that means more to me than you know.
            </p>
            <p ref={(el) => (paragraphsRef.current[2] = el)}>
              And just to be clear, you're special to me. You always have been. 
              I'm really grateful for you, for us, and for everything we share.
              I love you.
            </p>
            <p
              ref={(el) => (paragraphsRef.current[3] = el)}
              className="pt-2 text-xs uppercase tracking-[0.22em] text-blush-200/95"
            >
              Tsabit
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageSection
