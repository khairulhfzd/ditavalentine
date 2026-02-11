import { useRef, useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

function MusicPlayer({ musicReady }) {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // Play when musicReady becomes true (after welcome screen)
    useEffect(() => {
        if (musicReady && audioRef.current) {
            const audio = audioRef.current
            audio.volume = 0.7

            audio.play()
                .then(() => {
                    setIsPlaying(true)
                    console.log('Music started successfully!')
                })
                .catch((error) => {
                    console.log('Failed to play:', error)
                })
        }
    }, [musicReady])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play()
            setIsPlaying(true)
        }
    }

    let albumArtUrl = ''
    try {
        albumArtUrl = new URL('../assets/images/11.jpeg', import.meta.url).href
    } catch (e) {
        console.log('Album art not found')
    }

    return (
        <div className="relative w-full">
            {/* Audio element */}
            <audio
                ref={audioRef}
                src="/src/assets/audio/1.mp3"
                loop
                preload="auto"
            />

            {/* Larger compact horizontal player */}
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-sm p-4 border border-white/10 shadow-lg">
                {/* Album Art - Bigger */}
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                    {albumArtUrl ? (
                        <img
                            src={albumArtUrl}
                            alt="Album cover"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-500/20 to-blush-300/10">
                            <span className="text-lg text-blush-300">♪</span>
                        </div>
                    )}
                </div>

                {/* Song Info & Controls */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/95 truncate">
                        Our Song
                    </p>
                    <p className="text-xs text-blush-100/70 truncate">
                        For Dita ♥
                    </p>
                </div>

                {/* Play/Pause Button - Bigger */}
                <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blush-500 text-white shadow-lg transition hover:bg-blush-400 hover:scale-110"
                >
                    {isPlaying ? (
                        <Pause className="h-4 w-4" fill="currentColor" />
                    ) : (
                        <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default MusicPlayer
