import { useState, useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import { Home, Coffee, Camera, Heart } from 'lucide-react'

const sparkles = Array.from({ length: 20 }, (_, i) => i)

const dateTimeline = [
  {
    id: 1,
    icon: Home,
    label: 'Pick you up at home',
    time: '10:00 AM',
    description: "I'll be there a little early - because I'm always excited to see you.",
    position: 'left',
  },
  {
    id: 2,
    icon: Coffee,
    label: 'Coffee time at GuruGuru.co',
    time: '10:30 AM',
    description: "Good coffee, better company. Let's catch up over your favorite drink.",
    position: 'right',
  },
  {
    id: 3,
    icon: Camera,
    label: 'Photo booth at Yolo Studio',
    time: '12:00 PM',
    description: 'Time to make some memories we can look back on and smile.',
    position: 'left',
  },
  {
    id: 4,
    icon: Heart,
    label: 'Take you home safely',
    time: '2:00 PM',
    description: "End the day the way I love most - making sure you're home safe, with one last hug.",
    position: 'right',
  },
]

function SparkleBurst({ burstId }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sparkleElements = containerRef.current.querySelectorAll('.sparkle')

    gsap.fromTo(
      sparkleElements,
      {
        scale: 0.5,
        opacity: 1,
      },
      {
        x: (index) => {
          const angle = (index / sparkles.length) * Math.PI * 2
          const distance = 90 + (index % 4) * 20
          return Math.cos(angle) * distance
        },
        y: (index) => {
          const angle = (index / sparkles.length) * Math.PI * 2
          const distance = 90 + (index % 4) * 20
          return Math.sin(angle) * distance * 0.6
        },
        scale: (index) => 1.2 + (index % 3) * 0.3,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.03,
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
      {sparkles.map((sparkle) => (
        <span
          key={`${burstId}-${sparkle}`}
          className="sparkle absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gradient-to-tr from-blush-400 to-blush-100 shadow-[0_0_15px_rgba(255,182,193,1)]"
        />
      ))}
    </div>
  )
}

function FinalSection() {
  const [burstId, setBurstId] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)
  const headerRef = useRef(null)
  const buttonRef = useRef(null)
  const scheduleRef = useRef(null)
  const pathRef = useRef(null)
  const itemsRef = useRef([])

  const handleClick = () => {
    setBurstId((prev) => prev + 1)
    setShowSchedule(true)

    gsap.to(buttonRef.current, {
      scale: 0.94,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 85%',
        },
      })

      gsap.to(headerRef.current, {
        opacity: 0.5,
        y: -50,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (showSchedule && scheduleRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(scheduleRef.current.querySelector('h3').parentElement, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        })

        if (pathRef.current) {
          gsap.from(pathRef.current, {
            strokeDashoffset: 1000,
            duration: 2,
            ease: 'power2.inOut',
            delay: 0.3,
          })
        }

        itemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.from(item, {
              opacity: 0,
              scale: 0.9,
              y: 40,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            })

            gsap.to(item, {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              },
            })
          }
        })
      })

      return () => ctx.revert()
    }
  }, [showSchedule])

  return (
    <section
      id="final"
      className="section-padding pb-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div ref={headerRef}>
          <p className="text-xs uppercase tracking-[0.28em] text-blush-200/90">
            Final question
          </p>

          <h2 className="font-display text-3xl text-white sm:text-4xl mt-4">
            So after all this,
            <span className="block text-blush-200">
              may I have the honor of calling you my Valentine?
            </span>
          </h2>

          <p className="mx-auto max-w-lg text-center text-sm text-blush-100/80 sm:text-[0.95rem] mt-4">
            There&apos;s no pressure, no timer, no dramatic music - just my heart,
            quietly waiting on the other side of this button.
          </p>
        </div>

        <div className="relative mt-4">
          <SparkleBurst burstId={burstId} />
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            className="group relative inline-flex items-center justify-center rounded-full bg-blush-500 px-10 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(255,59,115,0.55)] transition hover:-translate-y-0.5 hover:bg-blush-400 hover:shadow-[0_22px_70px_rgba(255,59,115,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_60%)] opacity-70 transition group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              <span className="text-[0.85rem] uppercase tracking-[0.2em]">
                Be My Valentine
              </span>
            </span>
          </button>
        </div>

        {showSchedule && (
          <div
            ref={scheduleRef}
            className="relative mt-12 w-full max-w-2xl"
          >
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-blush-300">
                Our Valentine&apos;s Day Plan
              </p>
              <h3 className="font-display text-2xl text-white sm:text-3xl mt-2">
                A day made
                <span className="block text-blush-200">just for us.</span>
              </h3>
            </div>

            <div className="relative">
              <svg
                className="absolute left-0 top-0 h-full w-full pointer-events-none hidden md:block"
                style={{ zIndex: 0 }}
              >
                <path
                  ref={pathRef}
                  d="M 200,60 Q 300,80 350,160 T 200,300 Q 100,360 200,460 T 350,600"
                  fill="none"
                  stroke="rgba(255, 182, 193, 0.25)"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  strokeLinecap="round"
                  style={{ strokeDashoffset: 0 }}
                />
              </svg>

              <div className="relative space-y-4 md:space-y-6">
                {dateTimeline.map((item, index) => {
                  const Icon = item.icon
                  const isLeft = item.position === 'left'

                  return (
                    <div
                      key={item.id}
                      ref={(el) => (itemsRef.current[index] = el)}
                      className={`flex items-start gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blush-500/25 to-blush-300/15 border-2 border-blush-400/40 backdrop-blur-sm">
                          <Icon className="h-5 w-5 text-blush-300" />
                        </div>
                        <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blush-500 text-[0.65rem] font-bold text-white">
                          {item.id}
                        </div>
                      </div>

                      <div className="flex-1 group">
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blush-400/50 hover:bg-white/[0.15] hover:shadow-[0_8px_30px_rgba(255,182,193,0.1)]">
                          <div className="absolute inset-0 bg-gradient-to-br from-blush-500/0 to-blush-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-blush-500/5 group-hover:to-blush-300/5" />

                          <div className="relative">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-blush-500/20 px-2.5 py-0.5 mb-2">
                              <div className="h-1 w-1 rounded-full bg-blush-400 animate-pulse" />
                              <span className="text-[0.7rem] font-medium text-blush-200">
                                {item.time}
                              </span>
                            </div>

                            <h4 className="text-base font-semibold text-white mb-1.5">
                              {item.label}
                            </h4>

                            <p className="text-[0.8rem] text-blush-100/80 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-xs text-blush-200/70">
                This is just the plan - the best part will be spending it with you
              </p>
            </div>
          </div>
        )}

        <p className="text-[0.75rem] text-blush-200/80">
          (If you say yes… I've got something for you.)
        </p>
      </div>
    </section>
  )
}

export default FinalSection
