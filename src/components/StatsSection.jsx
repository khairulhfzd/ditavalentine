import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import { Heart, MessageCircle, Calendar, Smile, Coffee, Star } from 'lucide-react'

const stats = [
    {
        icon: Calendar,
        number: '120+',
        label: 'Days Together',
        subtitle: 'And counting every single one',
    },
    {
        icon: MessageCircle,
        number: '10,000+',
        label: 'Messages Sent',
        subtitle: 'Still not enough to say it all',
    },
    {
        icon: Smile,
        number: '∞',
        label: 'Laughs Shared',
        subtitle: 'Literally lost count',
    },
    {
        icon: Coffee,
        number: '50+',
        label: 'Dates & Hangouts',
        subtitle: 'Each one better than the last',
    },
    {
        icon: Heart,
        number: '1M+',
        label: 'Heartbeats for You',
        subtitle: 'Per day, probably',
    },
    {
        icon: Star,
        number: '100%',
        label: 'Worth It',
        subtitle: 'Every single moment',
    },
]

function StatsSection() {
    const headerRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation only
            gsap.from(headerRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                },
            })

            // Simple hover effects - NO opacity animation
            cardsRef.current.forEach((card) => {
                if (card) {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -8,
                            duration: 0.3,
                            ease: 'power2.out',
                        })
                    })

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        })
                    })
                }
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="section-padding bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900">
            <div className="mx-auto max-w-6xl">
                <div ref={headerRef} className="mb-16 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-blush-300">
                        By The Numbers
                    </p>
                    <h2 className="font-display text-3xl text-white sm:text-4xl mt-4">
                        Our story,
                        <span className="block text-blush-200">in fun little stats.</span>
                    </h2>
                    <p className="mt-4 text-sm text-blush-100/90 max-w-xl mx-auto">
                        Some things you can measure. Others? Well, let's just say infinity isn't big enough.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={stat.label}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="relative rounded-2xl bg-gradient-to-br from-[#1a0f1f] to-[#0d070f] border-2 border-blush-500/30 p-8 transition-all duration-300 hover:border-blush-400/60 hover:shadow-[0_0_30px_rgba(255,182,193,0.2)] cursor-default"
                            >
                                {/* Icon with background */}
                                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blush-500/20 border border-blush-400/30">
                                    <Icon className="h-8 w-8 text-blush-300" />
                                </div>

                                {/* Number - EXTRA LARGE */}
                                <div className="mb-3 font-display text-6xl font-bold text-white">
                                    {stat.number}
                                </div>

                                {/* Label */}
                                <div className="mb-2 text-lg font-semibold text-white">
                                    {stat.label}
                                </div>

                                {/* Subtitle */}
                                <div className="text-sm text-blush-200/80">
                                    {stat.subtitle}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
