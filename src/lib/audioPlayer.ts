interface Sound {
  filename: string
  volume: number
}

interface AudioPlayer<T> {
  play: (name: keyof T & string, loop?: boolean) => void
  stopAll: () => void
}

type SoundsMap = Record<string, Sound>
type AudioMap = Record<string, HTMLAudioElement>

const createAudioPlayer = <T extends SoundsMap>(soundMap: T): AudioPlayer<T> => {
  const audioMap = Object.keys(soundMap).reduce<AudioMap>((audioMap, name) => {
    const { filename, volume } = soundMap[name]
    const audio = new window.Audio(filename)
    audio.volume = volume || 1.0
    audioMap[name] = audio
    return audioMap
  }, {})

  return {
    play(name, loop = false): void {
      try {
        const sound = audioMap[name]
        sound.pause()
        sound.currentTime = 0.0
        sound.loop = loop
        sound
          .play()
          .catch((error) => console.error(`[AUDIO] Error during playing file '${name}'`, error))
      } catch (error) {
        console.error(`[AUDIO] Sound '${name}' cannot be played`, error)
      }
    },
    stopAll(): void {
      try {
        Object.values(audioMap).forEach((audio) => {
          audio.pause()
          audio.currentTime = 0.0
        })
      } catch (error) {
        console.error(`[AUDIO] Error while stopping sounds`, error)
      }
    },
  }
}

export { createAudioPlayer }
