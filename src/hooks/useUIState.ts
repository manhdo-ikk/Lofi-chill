import { useState } from 'react'
import type { FocusType, ActiveMenu } from '../types'

const INIT_VISIBLE_FOCUS_TYPE: FocusType = {
  pomodoro: false,
  session: false,
  notes: false,
  history: false,
}

const INIT_ACTIVE: ActiveMenu = { mood: false, template: false, sets: false, focus: false }

export function useUIState() {
  const [fullScreen, setFullScreen] = useState(false)
  const [visibleFocusType, setVisibleFocusType] = useState<FocusType>(INIT_VISIBLE_FOCUS_TYPE)
  const [active, setActive] = useState<ActiveMenu>(INIT_ACTIVE)

  return {
    fullScreen,
    setFullScreen,
    initVisibleFocusType: INIT_VISIBLE_FOCUS_TYPE,
    visibleFocusType,
    setVisibleFocusType,
    initActive: INIT_ACTIVE,
    active,
    setActive,
  }
}
