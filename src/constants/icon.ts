import type { FocusIcon } from '../types'
import { historyIcon, notesIcon, startSessionIcon, tomatoIcon } from '../assets/icons'

export const FOCUS_ICONS: FocusIcon[] = [
  { label: 'Start Session', icon: startSessionIcon, modalType: 'session' },
  { label: 'Pomodoro', icon: tomatoIcon, modalType: 'pomodoro' },
  { label: 'Notes', icon: notesIcon, modalType: 'notes' },
  { label: 'History', icon: historyIcon, modalType: 'history' },
]
