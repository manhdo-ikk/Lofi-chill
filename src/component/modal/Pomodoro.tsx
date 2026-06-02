import { useEffect, useState, useContext } from 'react'
import { closeIcon, settingIcon, skipIcon } from '../../assets/icons'
import { ThemeContext } from '../../context'
import type { TimerMode } from '../../types'
import Button from './Button'
import SettingPomo from './SettingPomo'
import { convertTime } from '../../utils/timer'
import {
  SECONDS_PER_MINUTE,
  POMODORO_LABEL,
  SHORT_BREAK_LABEL,
  LONG_BREAK_LABEL,
  START_LABEL,
  STOP_LABEL,
  RESET_LABEL,
  DEFAULT_POMODORO_MINUTES,
  DEFAULT_BREAK_MINUTES,
  DEFAULT_LONG_MINUTES,
} from '../../constants/pomodoro'

const Pomodoro = () => {
  const [setting, setSetting] = useState(false)
  const [reset, setReset] = useState(false)
  const {
    visibleFocusType,
    setVisibleFocusType,
    isRunning,
    setIsRunning,
    activeItem,
    setActiveItem,
    currentTime,
    setCurrentTime,
    initActiveFocus,
    defaultTime,
    setDefaultTime,
    setInitTimesAuto,
    setAutoRun,
  } = useContext(ThemeContext)

  useEffect(() => {
    if (setting || reset) {
      setCurrentTime(defaultTime.pomoTime * SECONDS_PER_MINUTE)
      setActiveItem({ ...initActiveFocus, pomodoro: true })
    }
  }, [defaultTime, reset, initActiveFocus, setActiveItem, setting, setCurrentTime])

  const setCurrentAndActiveTime = (type: keyof TimerMode, time: number) => {
    setActiveItem({ ...initActiveFocus, [type]: true })
    setCurrentTime(time * SECONDS_PER_MINUTE)
    setIsRunning(false)
  }

  const handleNextActive = () => {
    if (activeItem.pomodoro) setCurrentAndActiveTime('break', defaultTime.breakTime)
    else if (activeItem.break) setCurrentAndActiveTime('long', defaultTime.longTime)
    else if (activeItem.long) setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime)
  }

  const handleActive = (type: keyof TimerMode) => {
    switch (type) {
      case 'pomodoro':
        setCurrentAndActiveTime('pomodoro', defaultTime.pomoTime)
        break
      case 'break':
        setCurrentAndActiveTime('break', defaultTime.breakTime)
        break
      case 'long':
        setCurrentAndActiveTime('long', defaultTime.longTime)
        break
    }
  }

  return (
    <div className="absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2">
      {setting ? (
        <SettingPomo
          handleSwitch={() => setSetting(!setting)}
          handleClose={() => setVisibleFocusType({ ...visibleFocusType, pomodoro: false })}
          defaultTime={defaultTime}
          setDefaultTime={setDefaultTime}
          setCurrentTime={setCurrentTime}
        />
      ) : (
        <div className="p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white">
          <div className="flex items-center">
            <h1 className="text-4xl font-medium mb-8">{POMODORO_LABEL}</h1>
            <div
              className="text-white absolute top-0 right-0 p-4 cursor-pointer"
              onClick={() => setVisibleFocusType({ ...visibleFocusType, pomodoro: false })}
            >
              <img src={closeIcon} alt="close-icon" />
            </div>
          </div>
          <div className="flex w-full rounded-full bg-bg-200 p-2 mb-8">
            <Button text={POMODORO_LABEL} active={activeItem.pomodoro} big handle={() => handleActive('pomodoro')} />
            <Button text={SHORT_BREAK_LABEL} active={activeItem.break} big handle={() => handleActive('break')} />
            <Button text={LONG_BREAK_LABEL} active={activeItem.long} big handle={() => handleActive('long')} />
          </div>

          <div className="flex flex-col justify-center w-full rounded-lg bg-bg-200 p-2 mb-4">
            <div className="text-center text-5xl font-bold mb-8 mt-4">
              {convertTime(currentTime)}
            </div>
            <div className="flex justify-center mb-4">
              <Button
                text={isRunning ? STOP_LABEL : START_LABEL}
                active
                css="transition-all duration-200 ease-linear hover:opacity-50"
                handle={() => setIsRunning(!isRunning)}
              />
              <div
                className="w-8 transition-all duration-200 ease-linear hover:opacity-50 mx-4 cursor-pointer"
                onClick={handleNextActive}
              >
                <img src={skipIcon} alt="skip" className="w-full h-full text-white invert" />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center mt-12 mb-4 w-full relative">
            <Button
              text={RESET_LABEL}
              big
              css={`transition-all duration-200 ease-linear hover:opacity-50 min-w-[120px]
                    border border-primary flex justify-center items-center py-1 px-4 bg-[rgba(243,169,82,.1)]
                    font-medium text-base text-primary rounded-full absolute left-1/2 -translate-x-1/2`}
              handle={() => {
                setActiveItem({ ...initActiveFocus, pomodoro: true })
                setIsRunning(false)
                setDefaultTime({ pomoTime: DEFAULT_POMODORO_MINUTES, breakTime: DEFAULT_BREAK_MINUTES, longTime: DEFAULT_LONG_MINUTES })
                setInitTimesAuto({ pomoTimes: 0, breakTimes: 0, longTimes: 0 })
                setAutoRun(false)
                setReset(true)
              }}
            />
            <div
              className="transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer absolute right-0"
              onClick={() => setSetting(!setting)}
            >
              <img src={settingIcon} alt="setting" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pomodoro
