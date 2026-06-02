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
import {
  birds,
  campfire,
  cityTraffic,
  fan,
  fireplace,
  forestNight,
  keyboard,
  ocean,
  peopleTalk,
  rainCity,
  rainForest,
  river,
  snow,
  storm,
  waves,
  wind,
} from '../assets/noises'

type NoiseEntry = NoiseIcon & { link: string }

const NOISES: NoiseEntry[] = [
  { label: 'City Traffic', icon: cityIcon, link: cityTraffic },
  { label: 'City Rain', icon: cityRainIcon, link: rainCity },
  { label: 'Fireplace', icon: fireplaceIcon, link: fireplace },
  { label: 'Campfire', icon: campfireIcon, link: campfire },
  { label: 'Forest Sounds', icon: forestIcon, link: forestNight },
  { label: 'Forest Rain', icon: forestRainIcon, link: rainForest },
  { label: 'Waves', icon: wavesIcon, link: waves },
  { label: 'Fan', icon: fanIcon, link: fan },
  { label: 'Summer Storm', icon: stormIcon, link: storm },
  { label: 'River', icon: riverIcon, link: river },
  { label: 'Bird Chirping', icon: birdIcon, link: birds },
  { label: 'People Talking', icon: peopleTalkingIcon, link: peopleTalk },
  { label: 'Wind', icon: windIcon, link: wind },
  { label: 'Ocean Sound', icon: oceanIcon, link: ocean },
  { label: 'Blizzard', icon: snowIcon, link: snow },
  { label: 'Keyboard', icon: keyboardIcon, link: keyboard },
]

export const NOISE_ICONS: NoiseIcon[] = NOISES.map(({ label, icon }) => ({ label, icon }))
export const NOISE_LINKS: string[] = NOISES.map(n => n.link)
