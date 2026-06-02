import type { AlarmLink } from '../../types'

const ALARM_BASE_URL = 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/alarms'

export const ALARM_LINKS: AlarmLink[] = [
  { name: 'Alarm 1', link: `${ALARM_BASE_URL}/Digital.mp3` },
  { name: 'Alarm 2', link: `${ALARM_BASE_URL}/Easy+Tone.mp3` },
  { name: 'Alarm 3', link: `${ALARM_BASE_URL}/Piano.mp3` },
  { name: 'Alarm 4', link: `${ALARM_BASE_URL}/Ringtone.mp3` },
  { name: 'Alarm 5', link: `${ALARM_BASE_URL}/Soft.mp3` },
]
