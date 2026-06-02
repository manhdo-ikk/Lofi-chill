import type { TimerMode } from '../types'

function toStringTime(number: number): string {
  if (number < 10 && number >= 0) return `0${number}`
  if (number < 0) return '00'
  return number.toString()
}

export function convertTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds - minutes * 60
  return `${toStringTime(minutes)}:${toStringTime(remaining)}`
}

export function getActiveItemLabel(activeItem: TimerMode): string {
  const key = (Object.keys(activeItem) as (keyof TimerMode)[]).find(k => activeItem[k])
  if (!key) return ''
  return key.charAt(0).toUpperCase() + key.slice(1)
}
