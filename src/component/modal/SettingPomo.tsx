import { useContext } from 'react'
import Switch from 'react-switch'
import { arrowLeftIcon, closeIcon } from '../../assets/icons'
import { ThemeContext } from '../../context'
import type { DefaultTime } from '../../types'
import ChangeTime from './ChangeTime'
import {
  SECONDS_PER_MINUTE,
  POMODORO_LABEL,
  BREAK_SETTING_LABEL,
  LONG_SETTING_LABEL,
  PLAY_ALARM_LABEL,
  AUTO_RUN_LABEL,
} from '../../constants/pomodoro'
import {
  SWITCH_ON_COLOR,
  SWITCH_HANDLE_COLOR,
  SWITCH_BG_OFF_COLOR,
} from '../../constants/colors'

type Props = {
  handleSwitch: () => void
  handleClose: () => void
  defaultTime: DefaultTime
  setDefaultTime: React.Dispatch<React.SetStateAction<DefaultTime>>
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
}

const SettingPomo = ({ handleSwitch, handleClose, defaultTime, setDefaultTime, setCurrentTime }: Props) => {
  const { alarmOn, setAlarmOn, autoRun, setAutoRun, setInitTimesAuto } = useContext(ThemeContext)

  return (
    <div className="absolute max-h-screen left-1/2 transform -translate-x-1/2 p-6">
      <div className="w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black text-white p-6">
        <div className="flex justify-between items-center w-full">
          <div
            className="transition-all opacity-50 duration-200 ease-linear hover:opacity-80
                    cursor-pointer text-center flex items-center text-xl"
            onClick={handleSwitch}
          >
            <img src={arrowLeftIcon} alt="arrow-left-icon" className="mr-3 text-xl w-[8px]" />
            <div>Back</div>
          </div>
          <div
            className="transition-all duration-200 ease-linear hover:opacity-50 cursor-pointer"
            onClick={handleClose}
          >
            <img src={closeIcon} alt="close-icon" />
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <ChangeTime
            message={POMODORO_LABEL}
            time={defaultTime.pomoTime}
            handleMinus={() => {
              if (defaultTime.pomoTime > 0) {
                setDefaultTime({ ...defaultTime, pomoTime: defaultTime.pomoTime - 1 })
                setCurrentTime(defaultTime.pomoTime * SECONDS_PER_MINUTE)
              }
            }}
            handlePlus={() => {
              setDefaultTime({ ...defaultTime, pomoTime: defaultTime.pomoTime + 1 })
              setCurrentTime(defaultTime.pomoTime * SECONDS_PER_MINUTE)
            }}
            onChange={value => {
              setDefaultTime({ ...defaultTime, pomoTime: Number(value) })
              setCurrentTime(defaultTime.pomoTime * SECONDS_PER_MINUTE)
            }}
          />
          <ChangeTime
            message={BREAK_SETTING_LABEL}
            time={defaultTime.breakTime}
            handleMinus={() => {
              if (defaultTime.breakTime > 0)
                setDefaultTime({ ...defaultTime, breakTime: defaultTime.breakTime - 1 })
            }}
            handlePlus={() => {
              setDefaultTime({ ...defaultTime, breakTime: defaultTime.breakTime + 1 })
            }}
            onChange={value => {
              setDefaultTime({ ...defaultTime, breakTime: Number(value) })
            }}
          />
          <ChangeTime
            message={LONG_SETTING_LABEL}
            time={defaultTime.longTime}
            handleMinus={() => {
              if (defaultTime.longTime > 0)
                setDefaultTime({ ...defaultTime, longTime: defaultTime.longTime - 1 })
            }}
            handlePlus={() => {
              setDefaultTime({ ...defaultTime, longTime: defaultTime.longTime + 1 })
            }}
            onChange={value => {
              setDefaultTime({ ...defaultTime, longTime: Number(value) })
            }}
          />
        </div>

        <div className="flex w-full justify-center items-center mt-8">
          <div>
            <h5 className="font-semibold">{PLAY_ALARM_LABEL}</h5>
            <Switch
              className="mx-4 mt-2"
              onChange={() => setAlarmOn(!alarmOn)}
              checked={alarmOn}
              uncheckedIcon={false}
              checkedIcon={true}
              handleDiameter={26}
              onHandleColor={SWITCH_HANDLE_COLOR}
              offHandleColor={SWITCH_HANDLE_COLOR}
              offColor={SWITCH_BG_OFF_COLOR}
              onColor={SWITCH_ON_COLOR}
              height={30}
              width={56}
              activeBoxShadow="0px 0px 0px 0px transparent"
            />
          </div>
          <div className="text-center">
            <h5 className="font-semibold">{AUTO_RUN_LABEL}</h5>
            <Switch
              className="mx-4 mt-2"
              onChange={() => {
                setAutoRun(!autoRun)
                setInitTimesAuto({ pomoTimes: 0, breakTimes: 0, longTimes: 0 })
              }}
              checked={autoRun}
              uncheckedIcon={false}
              checkedIcon={false}
              handleDiameter={26}
              onHandleColor={SWITCH_HANDLE_COLOR}
              offHandleColor={SWITCH_HANDLE_COLOR}
              offColor={SWITCH_BG_OFF_COLOR}
              onColor={SWITCH_ON_COLOR}
              height={30}
              width={56}
              activeBoxShadow="0px 0px 0px 0px transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPomo
