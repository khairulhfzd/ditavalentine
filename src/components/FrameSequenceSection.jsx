import FrameSequencePlayer from './FrameSequencePlayer'

function FrameSequenceSection() {
    return (
        <FrameSequencePlayer
            startIndex={10000}
            endIndex={11308}
            framePrefix="Sequence "
            frameExtension="jpg"
            paddingLength={6}
            sectionHeight="400vh"
            preloadBatch={30}
        />
    )
}

export default FrameSequenceSection
