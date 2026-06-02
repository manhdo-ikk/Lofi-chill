import { useRef, useState } from 'react'
import { CHILL_LINKS } from '../constants'
import type { AudioState, MoodTab } from '../types'
import { randomAudio, shuffle } from '../utils/handleAudio'

export function useAudioPlayer() {
  const controlRef = useRef<HTMLAudioElement>(null)
  const buttonP = useRef<HTMLImageElement>(null)
  const noisesRefs = useRef<(HTMLAudioElement | null)[]>([])

  const [currentMood, setCurrentMood] = useState<string[]>(() => shuffle(CHILL_LINKS))
  const [currentAudio, setCurrentAudio] = useState<AudioState>(randomAudio(currentMood))
  const [moodTab, setMoodTab] = useState<MoodTab>({
    sleepy: false,
    jazzy: false,
    chill: true,
    youtube: false,
  })
  const [playing, setPlaying] = useState(true)

  return {
    controlRef,
    buttonP,
    noisesRefs,
    currentMood,
    setCurrentMood,
    currentAudio,
    setCurrentAudio,
    moodTab,
    setMoodTab,
    playing,
    setPlaying,
  }
}
