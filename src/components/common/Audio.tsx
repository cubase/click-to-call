import React, { useRef } from 'react'

import { useObserver } from 'hooks/common'

interface AudioProps {
  stream: MediaStream | null
}

const Audio = ({ stream }: AudioProps): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useObserver(stream, () => {
    const audioEl = audioRef.current
    if (audioEl !== null) {
      if (stream) {
        audioEl.srcObject = stream
        audioEl.play().catch((err) => console.error('[CTC] Audio error', err))
      } else {
        audioEl.pause()
        audioEl.currentTime = 0
      }
    }
  })

  return <audio ref={audioRef} id="c2c-audio" />
}

export default Audio
