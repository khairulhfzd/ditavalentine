import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

const storyEvents = [
  {
    id: 1,
    label: 'The First Hello',
    subtitle: 'The day everything quietly changed.',
    description:
      'Somewhere between your first hello and your first laugh, my heart took a tiny step closer to yours, and it never really went back.',
    date: 'Chapter I',
  },
  {
    id: 2,
    label: 'Little Moments',
    subtitle: 'The soft, ordinary kind of magic.',
    description:
      'Late night talks, inside jokes, and the way your name lights up my screen, small things that feel like home.',
    date: 'Chapter II',
  },
  {
    id: 3,
    label: 'Our Adventures',
    subtitle: 'Memories I could replay forever.',
    description:
      'Every photo, every almost blurry video, every snapshot of you smiling, they\'re all frames in my favorite movie.',
    date: 'Chapter III',
  },
]

function StorySection() {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const timelineRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title and description animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      gsap.from(descRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 80%',
        },
      })

      // Timeline items with stagger
      gsap.from(itemsRef.current, {
        opacity: 0,
        x: -30,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
        },
      })

      // Parallax effect on cards
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            y: -20 * (index + 1),
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="story" className="section-padding">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-start">
        <div className="md:w-1/3">
          <h2
            ref={titleRef}
            className="font-display text-3xl text-white sm:text-4xl"
          >
            Our story,
            <span className="block text-blush-200">in soft little chapters.</span>
          </h2>
          <div ref={descRef}>
            <p className="mt-4 text-sm text-blush-100/80 sm:text-[0.95rem]">
              Our photos and videos all along this line, every memory saying the same thing: I'd still choose the seat next to you.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-blush-300/90">
              Enjoy • hope it makes you smile
            </p>
          </div>
        </div>

        <ol
          ref={timelineRef}
          className="relative flex-1 space-y-6 border-l border-white/15 pl-6"
        >
          <span className="pointer-events-none absolute left-[-1px] top-0 h-10 w-[2px] bg-gradient-to-b from-blush-400/80 via-blush-300/40 to-transparent" />

          {storyEvents.map((event, index) => (
            <li
              key={event.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative pl-4"
            >
              <div className="absolute left-[-1.06rem] top-2 flex h-6 w-6 items-center justify-center rounded-full border border-blush-300/60 bg-ink-900">
                <span className="h-2.5 w-2.5 rounded-full bg-blush-400" />
              </div>
              <div className="glass-panel relative overflow-hidden p-4 sm:p-5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.09),transparent_55%)]" />
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="min-w-[4.5rem] text-xs font-medium uppercase tracking-[0.24em] text-blush-200/90">
                    {event.date}
                  </div>
                  <div className="space-y-1 text-sm">
                    <h3 className="font-medium text-white/95">
                      {index + 1}. {event.label}
                    </h3>
                    <p className="text-[0.8rem] text-blush-100/90">
                      {event.subtitle}
                    </p>
                    <p className="text-[0.8rem] text-blush-100/80">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default StorySection
