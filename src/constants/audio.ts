// Attribution text displayed at the bottom of the player
export const MUSIC_ATTRIBUTION = 'Music by - lofi.co 2021 ©'

// Initial volume slider value on first render (before reading from the audio element)
export const INITIAL_VOLUME_PERCENT = 25

// Fallback audio volume (0–1) used when the audio element is not yet mounted
export const DEFAULT_AUDIO_VOLUME = 0.5

// Multiplier to convert audio volume (0–1) into the slider's display value (0–50)
export const VOLUME_SLIDER_MULTIPLIER = 50

// Divisor to convert the slider value (0–100) back into audio volume (0–1)
export const VOLUME_SLIDER_SCALE = 100
