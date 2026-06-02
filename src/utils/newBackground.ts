import type { Background, BackgroundCondition } from '../types'
import { BACKGROUND_LINKS_LIST } from '../constants/links/videos'

export const newBackground = (
  currentBg: Background,
  condition: BackgroundCondition
): Background => {
  if (
    currentBg.set === condition.set &&
    currentBg.scene === condition.scene &&
    currentBg.day === condition.day &&
    currentBg.rainy === condition.rainy
  )
    return currentBg

  const updated: Background = { ...currentBg, show: !currentBg.show, ...condition }
  const match = BACKGROUND_LINKS_LIST.find(
    item =>
      item.set === condition.set &&
      item.scene === condition.scene &&
      item.day === condition.day &&
      item.rainy === condition.rainy
  )

  if (!match) return currentBg

  if (currentBg.show) {
    updated.link2 = match.link
  } else {
    updated.link1 = match.link
  }

  return updated
}
