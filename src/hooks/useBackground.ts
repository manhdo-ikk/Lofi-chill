import { useState } from 'react'
import type { Background } from '../types'
import { BACKGROUND_LINKS_LIST } from '../constants'

export function useBackground() {
  const [background, setBackground] = useState<Background>(() => {
    const match = BACKGROUND_LINKS_LIST.find(
      item =>
        item.set === 'desk' && item.scene === 'scene1' && item.day === true && item.rainy === false
    )
    return {
      show: true,
      day: true,
      rainy: false,
      set: null,
      scene: null,
      link1: match?.link ?? '',
      link2: '',
    }
  })

  return { background, setBackground }
}
