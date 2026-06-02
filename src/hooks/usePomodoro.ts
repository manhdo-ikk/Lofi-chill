import { useState, useRef, useEffect } from 'react'
import type { TimerMode, DefaultTime, TimesAuto } from '../types'
import {
  DEFAULT_POMODORO_MINUTES,
  DEFAULT_BREAK_MINUTES,
  DEFAULT_LONG_MINUTES,
  SECONDS_PER_MINUTE,
  COUNTDOWN_INTERVAL_MS,
  POMODORO_CYCLE_COUNT,
  STORAGE_KEY_POMODORO,
  STORAGE_KEY_BREAK,
  STORAGE_KEY_LONG,
  STORAGE_KEY_ALARM_ON,
  STORAGE_KEY_AUTO_RUN,
} from '../constants/pomodoro'

const INIT_ACTIVE_FOCUS: TimerMode = { pomodoro: false, break: false, long: false }

type Transition = { mode: TimerMode; time: number; counters?: TimesAuto }

function nextTransition(
  activeItem: TimerMode,
  counters: TimesAuto,
  defaultTime: DefaultTime,
): Transition {
  if (activeItem.pomodoro) {
    if (counters.pomoTimes === POMODORO_CYCLE_COUNT) {
      return { mode: { ...INIT_ACTIVE_FOCUS, long: true }, time: defaultTime.longTime * SECONDS_PER_MINUTE }
    }
    return {
      mode: { ...INIT_ACTIVE_FOCUS, break: true },
      time: defaultTime.breakTime * SECONDS_PER_MINUTE,
      counters: { ...counters, pomoTimes: counters.pomoTimes + 1 },
    }
  }
  if (activeItem.break) {
    return {
      mode: { ...INIT_ACTIVE_FOCUS, pomodoro: true },
      time: defaultTime.pomoTime * SECONDS_PER_MINUTE,
      counters: { ...counters, breakTimes: counters.breakTimes + 1 },
    }
  }
  return {
    mode: { ...INIT_ACTIVE_FOCUS, pomodoro: true },
    time: defaultTime.pomoTime * SECONDS_PER_MINUTE,
    counters: { pomoTimes: 0, breakTimes: 0, longTimes: 0 },
  }
}

export function usePomodoro() {
  const [defaultTime, setDefaultTime] = useState<DefaultTime>({
    pomoTime: Number(localStorage.getItem(STORAGE_KEY_POMODORO)) || DEFAULT_POMODORO_MINUTES,
    breakTime: Number(localStorage.getItem(STORAGE_KEY_BREAK)) || DEFAULT_BREAK_MINUTES,
    longTime: Number(localStorage.getItem(STORAGE_KEY_LONG)) || DEFAULT_LONG_MINUTES,
  })

  const [activeItem, setActiveItem] = useState<TimerMode>({ ...INIT_ACTIVE_FOCUS, pomodoro: true })
  const [initTimes, setInitTime] = useState<DefaultTime>({
    pomoTime: defaultTime.pomoTime * SECONDS_PER_MINUTE,
    breakTime: defaultTime.breakTime * SECONDS_PER_MINUTE,
    longTime: defaultTime.longTime * SECONDS_PER_MINUTE,
  })
  const [currentTime, setCurrentTime] = useState(initTimes.pomoTime)
  const [isRunning, setIsRunning] = useState(false)
  const [alarmOn, setAlarmOn] = useState(localStorage.getItem(STORAGE_KEY_ALARM_ON) === 'true')
  const [autoRun, setAutoRun] = useState(localStorage.getItem(STORAGE_KEY_AUTO_RUN) === 'true')
  const [initTimesAuto, setInitTimesAuto] = useState<TimesAuto>({
    pomoTimes: 0,
    breakTimes: 0,
    longTimes: 0,
  })
  const refAlarm = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POMODORO, String(defaultTime.pomoTime))
    localStorage.setItem(STORAGE_KEY_BREAK, String(defaultTime.breakTime))
    localStorage.setItem(STORAGE_KEY_LONG, String(defaultTime.longTime))
  }, [defaultTime])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ALARM_ON, String(alarmOn))
    localStorage.setItem(STORAGE_KEY_AUTO_RUN, String(autoRun))
  }, [alarmOn, autoRun])

  useEffect(() => {
    if (!isRunning) return
    if (currentTime > 0) {
      const countdown = setInterval(() => {
        setCurrentTime(prev => prev - 1)
      }, COUNTDOWN_INTERVAL_MS)
      return () => clearInterval(countdown)
    }

    if (alarmOn) refAlarm.current?.play()

    // setState must be in a callback, not directly in the effect body (react-hooks/set-state-in-effect)
    const id = setTimeout(() => {
      if (!autoRun) {
        setIsRunning(false)
        return
      }
      const { mode, time, counters } = nextTransition(activeItem, initTimesAuto, defaultTime)
      setActiveItem(mode)
      setCurrentTime(time)
      if (counters) setInitTimesAuto(counters)
    })
    return () => clearTimeout(id)
  }, [isRunning, currentTime, activeItem, alarmOn, autoRun, defaultTime, initTimesAuto])

  return {
    defaultTime,
    setDefaultTime,
    activeItem,
    setActiveItem,
    initTimes,
    setInitTime,
    currentTime,
    setCurrentTime,
    isRunning,
    setIsRunning,
    alarmOn,
    setAlarmOn,
    autoRun,
    setAutoRun,
    setInitTimesAuto,
    refAlarm,
    initActiveFocus: INIT_ACTIVE_FOCUS,
  }
}
