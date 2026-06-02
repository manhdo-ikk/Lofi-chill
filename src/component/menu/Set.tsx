import { useState, useContext } from 'react'
import { SETS } from '../../constants/sets'
import { arrowLeftIcon } from '../../assets/icons'
import { ThemeContext } from '../../context/index'
import { newBackground } from '../../utils/newBackground'
import type { SetItem, Scene } from '../../types'

type SetDisplay = SetItem | Scene

const Set = () => {
  const { background, setBackground } = useContext(ThemeContext)

  const [detail, setDetail] = useState<string | false>(false)
  const [sets, setSets] = useState<SetDisplay[]>(SETS)

  const handleDetail = (set: string) => {
    setDetail(set)
    const found = (SETS as SetItem[]).find(item => item.set === set)
    if (found) setSets(found.scenes)
  }

  const handleSetBackground = (item: Scene) => {
    const condition = {
      set: detail as string,
      scene: item.scene,
      day: background.set === detail ? background.day : true,
      rainy: background.set === detail ? background.rainy : false,
    }
    setBackground(newBackground(background, condition))
  }

  const handleResetSet = () => {
    setSets(SETS)
    setDetail(false)
  }

  return (
    <div className="absolute right-[88px] w-[345px] bg-bg-menu min-h-[400px] rounded-[24px] p-4 z-50">
      {detail ? (
        <div className="flex justify-between items-center">
          <div className="transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer">
            <img
              src={arrowLeftIcon}
              alt="back"
              className="w-[14px] h-[14px]"
              onClick={handleResetSet}
            />
          </div>
          <h4 className="font-bold text-xl text-white">Switch scene</h4>
          <div className="w-[14px] h-[14px]"></div>
        </div>
      ) : (
        <h4 className="text-white font-bold text-xl mb-2">Change Set</h4>
      )}
      <div className="max-h-[500px] flex flex-col justify-between w-full text-center overflow-auto rounded-lg">
        {sets.map(item => (
          <div
            onClick={
              detail
                ? () => handleSetBackground(item as Scene)
                : () => handleDetail((item as SetItem).set)
            }
            key={(item as Scene).scene ?? (item as SetItem).set}
            className="mt-2 cursor-pointer transition-all duration-200 ease-linear hover:opacity-50"
          >
            <img src={item.img} alt="set" className="w-full rounded-xl animate-fadeIn1s" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Set
