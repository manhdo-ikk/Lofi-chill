import { useContext } from 'react'
import { fullscreenIcon, moonIcon, profileIcon, rainyIcon, sunIcon, sunnyIcon } from '../assets/icons'
import { CDN_BASE } from '../constants/cdn'
import { SETS_WITH_DAY_NIGHT, SETS_WITH_RAINY } from '../constants/sets'

const logoImg = `${CDN_BASE}/images/logo.gif`
import { ThemeContext } from '../context/'
import { newBackground } from '../utils/newBackground'
import NavbarSwitch from './NavbarSwitch'

const Navbar = () => {
  const { background, setBackground, setFullScreen } = useContext(ThemeContext)

  const handleChangeBg = (mode: 'day' | 'rainy') => {
    const condition = {
      set: background.set,
      scene: background.scene,
      day: mode === 'day' ? !background.day : background.day,
      rainy: mode === 'rainy' ? !background.rainy : background.rainy,
    }
    setBackground(newBackground(background, condition))
  }

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setFullScreen(true)).catch(() => {})
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setFullScreen(false)).catch(() => {})
    }
  }

  return (
    <div className="fixed w-full h-20 z-10">
      <div className="flex justify-between mx-16 items-center">
        <div>
          <img src={logoImg} className="h-[100px]" alt="logo" />
        </div>
        <div>
          <button className="text-white font-bold text-lg mx-2">Home</button>
        </div>
        <div className="flex justify-center items-center">
          {SETS_WITH_DAY_NIGHT.includes(background.set ?? '') && (
            <NavbarSwitch
              checked={background.day}
              onChange={() => handleChangeBg('day')}
              uncheckedIcon={<img src={moonIcon} alt="moon" />}
              checkedIcon={<img src={sunIcon} alt="sun" />}
            />
          )}
          {SETS_WITH_RAINY.includes(background.set ?? '') && (
            <NavbarSwitch
              checked={!background.rainy}
              onChange={() => handleChangeBg('rainy')}
              uncheckedIcon={<img src={rainyIcon} alt="rainy" />}
              checkedIcon={<img src={sunnyIcon} alt="sunny" className="relative -top-0.5" />}
              className="ml-4 mr-4"
            />
          )}
          <button className="text-white font-bold text-lg mx-2" onClick={handleFullScreen}>
            <img src={fullscreenIcon} alt="full-screen" />
          </button>
          <button className="text-white font-bold text-lg mx-2">
            <img src={profileIcon} alt="profile" />
          </button>
          <button className="text-white font-bold mx-2 py-1 px-3 bg-transparent-w-10 border border-transparent-w-30 rounded-full text-xs">
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
