import { createContext } from 'react'
import type { ReactNode } from 'react'
import type {
  Background,
  AudioState,
  MoodTab,
  FocusType,
  ActiveMenu,
  TimerMode,
  DefaultTime,
  TimesAuto,
} from '../types'
import { useBackground } from '../hooks/useBackground'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { useUIState } from '../hooks/useUIState'
import { usePomodoro } from '../hooks/usePomodoro'

type ThemeContextValue = {
  background: Background
  setBackground: React.Dispatch<React.SetStateAction<Background>>
  controlRef: React.RefObject<HTMLAudioElement | null>
  currentAudio: AudioState
  setCurrentAudio: React.Dispatch<React.SetStateAction<AudioState>>
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  buttonP: React.RefObject<HTMLImageElement | null>
  currentMood: string[]
  setCurrentMood: React.Dispatch<React.SetStateAction<string[]>>
  moodTab: MoodTab
  setMoodTab: React.Dispatch<React.SetStateAction<MoodTab>>
  noisesRefs: React.RefObject<(HTMLAudioElement | null)[]>
  fullScreen: boolean
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>
  initVisibleFocusType: FocusType
  visibleFocusType: FocusType
  setVisibleFocusType: React.Dispatch<React.SetStateAction<FocusType>>
  initActive: ActiveMenu
  active: ActiveMenu
  setActive: React.Dispatch<React.SetStateAction<ActiveMenu>>
  initTimes: DefaultTime
  setInitTime: React.Dispatch<React.SetStateAction<DefaultTime>>
  currentTime: number
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  activeItem: TimerMode
  setActiveItem: React.Dispatch<React.SetStateAction<TimerMode>>
  isRunning: boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  defaultTime: DefaultTime
  setDefaultTime: React.Dispatch<React.SetStateAction<DefaultTime>>
  alarmOn: boolean
  setAlarmOn: React.Dispatch<React.SetStateAction<boolean>>
  autoRun: boolean
  setAutoRun: React.Dispatch<React.SetStateAction<boolean>>
  setInitTimesAuto: React.Dispatch<React.SetStateAction<TimesAuto>>
  refAlarm: React.RefObject<HTMLAudioElement | null>
  initActiveFocus: TimerMode
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

function ThemeProvider({ children }: { children: ReactNode }) {
  const background = useBackground()
  const audioPlayer = useAudioPlayer()
  const uiState = useUIState()
  const pomodoro = usePomodoro()

  const value: ThemeContextValue = {
    ...background,
    ...audioPlayer,
    ...uiState,
    ...pomodoro,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext }
