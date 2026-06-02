import type { ReactNode } from 'react'
import Switch from 'react-switch'
import { SWITCH_OFF_COLOR, SWITCH_ON_COLOR } from '../constants/colors'

type Props = {
  checked: boolean
  onChange: () => void
  uncheckedIcon: ReactNode
  checkedIcon: ReactNode
  className?: string
}

const NavbarSwitch = ({ checked, onChange, uncheckedIcon, checkedIcon, className = '' }: Props) => {
  return (
    <div className={`transition-all duration-300 ease-in hover:opacity-50 ${className}`.trim()}>
      <Switch
        onChange={onChange}
        checked={checked}
        handleDiameter={26}
        offColor={SWITCH_OFF_COLOR}
        onColor={SWITCH_ON_COLOR}
        height={30}
        width={62}
        activeBoxShadow="0px 0px 0px 0px transparent"
        uncheckedIcon={<div className="flex justify-center items-center h-full">{uncheckedIcon}</div>}
        checkedIcon={<div className="flex justify-center items-center h-full">{checkedIcon}</div>}
      />
    </div>
  )
}

export default NavbarSwitch
