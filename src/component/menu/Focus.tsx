import { useContext } from 'react'
import { FOCUS_ICONS } from '../../constants'
import { ThemeContext } from '../../context/index'
import type { FocusIcon } from '../../types'

const Focus = () => {
  const { initVisibleFocusType, setVisibleFocusType, initActive, setActive } =
    useContext(ThemeContext)

  const handleShowFocusItem = (item: FocusIcon) => {
    setVisibleFocusType({
      ...initVisibleFocusType,
      [item.modalType as keyof typeof initVisibleFocusType]: true,
    })
    setActive(initActive)
  }

  return (
    <div className="w-[345px] bg-bg-menu rounded-3xl z-20 p-4 mt-40 text-white">
      <h4 className="font-bold mb-4 text-xl">Focus Mode</h4>
      <div>
        {FOCUS_ICONS.map(item => (
          <div
            key={item.label}
            className="w-full flex items-center mt-3 py-2 px-4 bg-bg-200 rounded-xl cursor-pointer"
            onClick={() => handleShowFocusItem(item)}
          >
            <img src={item.icon} alt="icon" className="w-7 h-7" />
            <h6 className="mx-4 font-medium">{item.label}</h6>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Focus
