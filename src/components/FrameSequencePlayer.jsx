import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '../utils/gsapConfig'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger)

/**
 * FrameSequencePlayer - 848x480 original size, scroll-controlled
 */
function FrameSequencePlayer({
    startIndex = 10000,
    endIndex = 11308,
    framePrefix = 'Sequence ',
    frameExtension = 'jpg',
    paddingLength = 6,
    sectionHeight = '300vh',
    preloadBatch = 50,
}) {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const imagesRef = useRef({})
    const currentFrameRef = useRef(0)
    const [isReady, setIsReady] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)

    const frameCount = endIndex - startIndex + 1
    const CANVAS_WIDTH = 848
    const CANVAS_HEIGHT = 480

    const getFramePath = useCallback((frameIndex) => {
        const actualIndex = startIndex + frameIndex
        const paddedIndex = String(actualIndex).padStart(paddingLength, '0')
        const filename = `${framePrefix}${paddedIndex}.${frameExtension}`
        return `/frames/${filename}`
    }, [startIndex, framePrefix, frameExtension, paddingLength])

    const loadFrame = useCallback((frameIndex) => {
        return new Promise((resolve) => {
            if (imagesRef.current[frameIndex]) {
                resolve(imagesRef.current[frameIndex])
                return
            }

            const img = new Image()
            img.onload = () => {
                imagesRef.current[frameIndex] = img
                resolve(img)
            }
            img.onerror = () => resolve(null)
            img.src = getFramePath(frameIndex)
        })
    }, [getFramePath])

    // Preload frames
    useEffect(() => {
        const preloadInitial = async () => {
            console.log(`🎬 Loading first ${preloadBatch} frames...`)

            const promises = []
            for (let i = 0; i < Math.min(preloadBatch, frameCount); i++) {
                promises.push(loadFrame(i))
            }

            await Promise.all(promises)

            console.log(`✅ ${Object.keys(imagesRef.current).length} frames loaded`)

            setLoadProgress(100)
            setIsReady(true)

            // Load remaining
            setTimeout(() => {
                for (let i = preloadBatch; i < frameCount; i += 30) {
                    setTimeout(async () => {
                        const batch = []
                        for (let j = i; j < Math.min(i + 30, frameCount); j++) {
                            if (!imagesRef.current[j]) batch.push(loadFrame(j))
                        }
                        await Promise.all(batch)
                    }, (i - preloadBatch) * 5)
                }
            }, 300)
        }

        preloadInitial()
    }, [frameCount, preloadBatch, loadFrame])

    // Render frame at ORIGINAL 848x480 size
    const renderFrame = useCallback((frameIndex) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const clampedIndex = Math.min(Math.max(0, Math.floor(frameIndex)), frameCount - 1)

        const img = imagesRef.current[clampedIndex]
        if (!img) return

        // Set canvas to exact dimensions
        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT

        // Clear and draw at original size
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        currentFrameRef.current = clampedIndex
    }, [frameCount, CANVAS_WIDTH, CANVAS_HEIGHT])

    // ScrollTrigger for frame animation
    useEffect(() => {
        if (!isReady) return

        const container = containerRef.current
        if (!container) return

        // Initial render
        renderFrame(0)

        console.log('🔧 Setting up ScrollTrigger for', frameCount, 'frames')

        const ctx = gsap.context(() => {
            const animation = { frame: 0 }

            gsap.to(animation, {
                frame: frameCount - 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.5,
                    onUpdate: function () {
                        const newFrame = Math.round(animation.frame)
                        if (newFrame !== currentFrameRef.current) {
                            console.log(`Frame changed: ${newFrame}`)
                            renderFrame(newFrame)
                        }
                    },
                    onRefresh: () => {
                        console.log('ScrollTrigger refreshed')
                    }
                },
            })
        }, container)

        return () => {
            console.log('🧹 Cleanup ScrollTrigger')
            ctx.revert()
        }
    }, [isReady, frameCount, renderFrame])

    // Resize handler
    useEffect(() => {
        if (!isReady) return

        const handleResize = () => {
            renderFrame(currentFrameRef.current)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isReady, renderFrame])

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900"
            style={{ height: sectionHeight }}
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="block"
                    style={{
                        width: `${CANVAS_WIDTH}px`,
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                />

                {/* Loading */}
                {!isReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink-900">
                        <div className="text-center space-y-4">
                            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blush-500 transition-all"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                            <p className="text-sm text-blush-100/80">
                                Loading... {loadProgress}%
                            </p>
                        </div>
                    </div>
                )}


            </div>
        </section>
    )
}

export default FrameSequencePlayer
