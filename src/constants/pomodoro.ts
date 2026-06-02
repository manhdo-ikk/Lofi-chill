// Default timer durations in minutes, used as fallback when localStorage has no saved value
export const DEFAULT_POMODORO_MINUTES = 25
export const DEFAULT_BREAK_MINUTES = 5
export const DEFAULT_LONG_MINUTES = 10

// Number of pomodoro cycles completed before triggering a long break
export const POMODORO_CYCLE_COUNT = 3

// Multiplier to convert minutes to seconds
export const SECONDS_PER_MINUTE = 60

// Interval in milliseconds for the countdown timer tick
export const COUNTDOWN_INTERVAL_MS = 1000

// localStorage keys for persisting timer settings across sessions
export const STORAGE_KEY_POMODORO = 'pomodoro'
export const STORAGE_KEY_BREAK = 'break'
export const STORAGE_KEY_LONG = 'long'
export const STORAGE_KEY_ALARM_ON = 'alarmOn'
export const STORAGE_KEY_AUTO_RUN = 'autoRun'

// UI labels for timer mode buttons in the Pomodoro modal
export const POMODORO_LABEL = 'Pomodoro'
export const SHORT_BREAK_LABEL = 'Short Break'
export const LONG_BREAK_LABEL = 'Long Break'

// Labels used in the settings panel (shorter versions for time pickers)
export const BREAK_SETTING_LABEL = 'Break'
export const LONG_SETTING_LABEL = 'Long'

// Control button labels
export const START_LABEL = 'Start'
export const STOP_LABEL = 'Stop'
export const RESET_LABEL = 'Reset'

// Settings toggle labels
export const PLAY_ALARM_LABEL = 'Play alarm?'
export const AUTO_RUN_LABEL = 'Auto?'
