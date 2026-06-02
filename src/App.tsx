import { useContext, useEffect } from 'react'
import Menu from './component/menu/Menu'
import Navbar from './component/Navbar'
import Audio from './component/Audio'
import Background from './component/Background'
import ItemModal from './component/modal/ItemModal'
import { ThemeContext } from './context'

function convertTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds - minutes * 60
  return `${toStringTime(minutes)}:${toStringTime(remaining)}`
}

function toStringTime(number: number): string {
  if (number < 10 && number >= 0) return `0${number}`
  if (number < 0) return '00'
  return number.toString()
}

function App() {
  const { isRunning, currentTime } = useContext(ThemeContext)

  useEffect(() => {
    document.title = isRunning ? convertTime(currentTime) : 'Lofi'
  }, [isRunning, currentTime])

  return (
    <div className="relative min-h-screen bg-transparent-b-80">
      <Navbar />
      <div className="absolute inset-0">
        <Background />
      </div>
      <Audio />
      <Menu />
      <ItemModal />
    </div>
  )
}

export default App
