import { useContext } from 'react'
import Draggable from 'react-draggable'
import Pomodoro from './Pomodoro'
import { ThemeContext } from '../../context'

const ItemModal = () => {
  const {
    visibleFocusType: { pomodoro },
  } = useContext(ThemeContext)

  return (
    <>
      {pomodoro && (
        <Draggable handle=".handle">
          <div className="relative z-40">
            <Pomodoro />
          </div>
        </Draggable>
      )}
    </>
  )
}

export default ItemModal
