import { useState } from 'react'
import './App.css'
import SmoothScroll from './components/SmoothScroll.jsx'
import HeroSection from './components/HeroSection.jsx'
import StorySection from './components/StorySection.jsx'
import GallerySection from './components/GallerySection.jsx'
import StatsSection from './components/StatsSection.jsx'
import MessageSection from './components/MessageSection.jsx'
import FlowerSection from './components/FlowerSection.jsx'
import FinalSection from './components/FinalSection.jsx'
import FrameSequenceSection from './components/FrameSequenceSection.jsx'
import WelcomeOverlay from './components/WelcomeOverlay.jsx'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [musicReady, setMusicReady] = useState(false)

  const handleStartExperience = () => {
    setShowWelcome(false)
    setMusicReady(true)
  }

  return (
    <>
      {showWelcome && <WelcomeOverlay onStart={handleStartExperience} />}

      <SmoothScroll>
        <div className="min-h-screen bg-ink-900 text-white">
          <main className="flex min-h-screen flex-col">
            <HeroSection musicReady={musicReady} />


            {/* Frame Sequence Animation - 1308 Frames Loaded */}
            <FrameSequenceSection />


            <div className="flex flex-col gap-16 md:gap-20">
              <StorySection />
              <GallerySection />
              <StatsSection />
              <MessageSection />
              <FlowerSection />
              <FinalSection />
            </div>
          </main>
        </div>
      </SmoothScroll>
    </>
  )
}

export default App
