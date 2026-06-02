import type { SetItem } from '../types'
import { CDN_BASE } from './cdn'

const BASE = `${CDN_BASE}/images`
const THUMB = `${BASE}/thumbnails`

export const SETS_WITH_DAY_NIGHT = ['chill', 'cafe', 'book', 'spring']
export const SETS_WITH_RAINY = ['chill', 'cafe']

export const SETS: SetItem[] = [
  {
    set: 'chill',
    img: `${THUMB}/set-chill.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-chill-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-chill-2.png` },
    ],
  },
  {
    set: 'spring',
    img: `${THUMB}/set-spring.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-spring-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-spring-2.png` },
    ],
  },
  {
    set: 'northern',
    img: `${THUMB}/set-northern.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-northern-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-northern-2.png` },
    ],
  },
  {
    set: 'book',
    img: `${THUMB}/set-book.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-book-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-book-2.png` },
    ],
  },
  {
    set: 'desk',
    img: `${THUMB}/set-desk.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-desk-1.jpg` },
      { scene: 'scene2', img: `${THUMB}/scene-desk-2.jpg` },
      { scene: 'scene3', img: `${THUMB}/scene-desk-3.jpg` },
    ],
  },
  {
    set: 'forest',
    img: `${THUMB}/set-forest.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-forest-1.jpg` },
      { scene: 'scene2', img: `${THUMB}/scene-forest-2.jpg` },
    ],
  },
  {
    set: 'ocean',
    img: `${THUMB}/set-ocean.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-ocean-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-ocean-2.png` },
    ],
  },
  {
    set: 'cafe',
    img: `${THUMB}/set-cafe.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-cafe-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-cafe-2.png` },
    ],
  },
  {
    set: 'van',
    img: `${THUMB}/set-van.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-van-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-van-2.png` },
    ],
  },
  {
    set: 'summer',
    img: `${THUMB}/set-summer.png`,
    scenes: [
      { scene: 'scene1', img: `${THUMB}/scene-summer-1.png` },
      { scene: 'scene2', img: `${THUMB}/scene-summer-2.png` },
    ],
  },
]
