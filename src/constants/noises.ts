import type { NoiseIcon } from '../types'
import {
  birdIcon,
  campfireIcon,
  cityIcon,
  cityRainIcon,
  fanIcon,
  fireplaceIcon,
  forestIcon,
  forestRainIcon,
  keyboardIcon,
  oceanIcon,
  peopleTalkingIcon,
  riverIcon,
  snowIcon,
  stormIcon,
  wavesIcon,
  windIcon,
} from '../assets/icons'
import { CDN_BASE } from './cdn'

const BASE = `${CDN_BASE}/noises`

type NoiseEntry = NoiseIcon & { link: string }

const NOISES: NoiseEntry[] = [
  { label: 'City Traffic',   icon: cityIcon,          link: `${BASE}/city_traffic.mp3` },
  { label: 'City Rain',      icon: cityRainIcon,      link: `${BASE}/rain_city.mp3` },
  { label: 'Fireplace',      icon: fireplaceIcon,     link: `${BASE}/fireplace.mp3` },
  { label: 'Campfire',       icon: campfireIcon,      link: `${BASE}/campfire.mp3` },
  { label: 'Forest Sounds',  icon: forestIcon,        link: `${BASE}/forest_night.mp3` },
  { label: 'Forest Rain',    icon: forestRainIcon,    link: `${BASE}/rain_forest.mp3` },
  { label: 'Waves',          icon: wavesIcon,         link: `${BASE}/waves.mp3` },
  { label: 'Fan',            icon: fanIcon,           link: `${BASE}/fan.mp3` },
  { label: 'Summer Storm',   icon: stormIcon,         link: `${BASE}/storm.mp3` },
  { label: 'River',          icon: riverIcon,         link: `${BASE}/river.mp3` },
  { label: 'Bird Chirping',  icon: birdIcon,          link: `${BASE}/birds.mp3` },
  { label: 'People Talking', icon: peopleTalkingIcon, link: `${BASE}/people_talk.mp3` },
  { label: 'Wind',           icon: windIcon,          link: `${BASE}/wind.mp3` },
  { label: 'Ocean Sound',    icon: oceanIcon,         link: `${BASE}/ocean.mp3` },
  { label: 'Blizzard',       icon: snowIcon,          link: `${BASE}/snow.mp3` },
  { label: 'Keyboard',       icon: keyboardIcon,      link: `${BASE}/keyboard.mp3` },
]

export const NOISE_ICONS: NoiseIcon[] = NOISES.map(({ label, icon }) => ({ label, icon }))
export const NOISE_LINKS: string[] = NOISES.map(n => n.link)
