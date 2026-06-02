export type Background = {
  show: boolean
  day: boolean
  rainy: boolean
  set: string | null
  scene: string | null
  link1: string
  link2: string
}

export type BackgroundCondition = {
  set: string | null
  scene: string | null
  day: boolean
  rainy: boolean
}

export type AudioState = {
  currentAudio: string
  index: number
}

export type MoodTab = {
  sleepy: boolean
  jazzy: boolean
  chill: boolean
  youtube: boolean
}

export type FocusType = {
  pomodoro: boolean
  session: boolean
  notes: boolean
  history: boolean
}

export type ActiveMenu = {
  mood: boolean
  template: boolean
  sets: boolean
  focus: boolean
}

export type TimerMode = {
  pomodoro: boolean
  break: boolean
  long: boolean
}

export type DefaultTime = {
  pomoTime: number
  breakTime: number
  longTime: number
}

export type TimesAuto = {
  pomoTimes: number
  breakTimes: number
  longTimes: number
}

export type BackgroundLink = {
  set: string
  scene: string
  day: boolean
  rainy: boolean
  link: string
}

export type AlarmLink = {
  name: string
  link: string
}

export type NoiseIcon = {
  label: string
  icon: string
}

export type FocusIcon = {
  label: string
  icon: string
  modalType: string
}

export type Scene = {
  scene: string
  img: string
}

export type SetItem = {
  set: string
  img: string
  scenes: Scene[]
}
