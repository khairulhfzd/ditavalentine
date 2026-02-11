import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

const galleryItems = [
  { title: 'photobooth', caption: 'How cute do we look in these scout outfits?' },
  { title: 'our selfie', caption: 'Still my favorite thing to see every day.' },
  { title: 'My #1 Supporter', caption: 'Thanks for always being my number one supporter.' },
  { title: 'Late Stop', caption: 'Unplanned stops, somehow memorable.' },
  { title: 'Mood', caption: 'afternoon atmosphere...' },
  { title: 'Your Smile', caption: 'Hard not to smile back.' },
  { title: 'Other photobooth', caption: 'Awkward poses, fun results.' },
  { title: 'Side by Side', caption: 'Feels right standing here.' },
  { title: 'Small breaks good talks', caption: 'Simple moments that mean everything.' },
  { title: 'Random Fun', caption: 'hmmmm.' },
  { title: 'The Champion', caption: 'Winning at my passion, winning your heart.' },
  { title: 'Cute Alert', caption: 'How are you this cute?' },
  { title: 'Her Day', caption: 'Just you, being you and that\'s enough.' },
  { title: 'Movie Time', caption: 'Just us and the big screen.' },
  { title: 'Random Click', caption: 'Unplanned, but somehow perfect.' },
  { title: 'Little Things', caption: 'The details I never get tired of.' },
  { title: 'Calm', caption: 'When silence spoke louder than words.' },
  { title: 'Dufan date', caption: 'One of our favorite places.' },
  { title: 'On the Way', caption: 'Doesn\'t matter where - as long as it\'s us.' },
  { title: 'Always', caption: 'This is just the beginning of us.' },
]

const imageSources = Array.from({ length: 20 }, (_, index) =>
  new URL(`../assets/images/${index + 1}.jpeg`, import.meta.url).href,
)

function GallerySection() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const itemsRef = useRef([])

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

      // Grid items with stagger
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: 'start',
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      })

      // Individual parallax for each item
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const speed = 0.5 + (index % 3) * 0.2 // Varying speeds

          gsap.to(item, {
            y: -30 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })

          // Hover effect with GSAP
          const img = item.querySelector('img')
          if (img) {
            item.addEventListener('mouseenter', () => {
              gsap.to(img, {
                scale: 1.08,
                duration: 0.6,
                ease: 'power2.out',
              })
            })

            item.addEventListener('mouseleave', () => {
              gsap.to(img, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
              })
            })
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" className="section-padding">
      <div className="mx-auto max-w-5xl space-y-8">
        <div ref={headerRef}>
          <p className="text-xs uppercase tracking-[0.28em] text-blush-200/90">
            Fragments of us
          </p>

          <h2 className="font-display text-3xl text-white sm:text-4xl mt-4">
            A tiny gallery
            <span className="block text-blush-200">
              of the million reasons I adore you.
            </span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid gap-3 sm:grid-cols-2 md:grid-cols-3"
        >
          {imageSources.map((src, index) => (
            <figure
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 cursor-pointer"
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="h-40 w-full object-cover sm:h-48 md:h-56"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-xs">
                <span className="block text-sm font-medium text-white mb-1">
                  {galleryItems[index].title}
                </span>
                <span className="block text-[0.7rem] text-blush-100/80 leading-relaxed">
                  {galleryItems[index].caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
