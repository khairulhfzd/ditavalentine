import { useState } from 'react'
import { PlayIcon, Volume2 } from 'lucide-react'

function WelcomeOverlay({ onStart }) {
    return (
        <div className="fixed inset-0 z-50 bg-ink-900/95 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-6 px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blush-500/20 mb-4">
                    <Volume2 className="w-10 h-10 text-blush-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="font-display text-3xl text-white">
                        Welcome, Dita
                    </h2>
                    <p className="text-sm text-blush-100/80 max-w-xs mx-auto">
                        Click the button below to start your special experience with music
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onStart}
                    className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-8 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(255,59,115,0.45)] transition-all duration-300 hover:scale-105 hover:bg-blush-400 hover:shadow-[0_22px_60px_rgba(255,59,115,0.6)]"
                >
                    <PlayIcon className="h-4 w-4" />
                    <span>Start Journey</span>
                </button>
            </div>
        </div>
    )
}

export default WelcomeOverlay
