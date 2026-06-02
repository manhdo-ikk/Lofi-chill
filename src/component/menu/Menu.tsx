import { useContext } from 'react'
import { moodIcon, templateIcon, setIcon, focusIcon } from '../../assets/icons'
import Focus from './Focus'
import MenuItem from './MenuItem'
import Mood from './Mood'
import Set from './Set'
import { ThemeContext } from '../../context'

const Menu = () => {
  const { initActive, active, setActive } = useContext(ThemeContext)

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center z-50">
      <div className="relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full z-20">
        <MenuItem
          icon={moodIcon}
          top={true}
          line={true}
          active={active.mood}
          handleActive={() => setActive({ ...initActive, mood: !active.mood })}
        />
        <MenuItem
          icon={templateIcon}
          line={true}
          active={active.template}
          handleActive={() => setActive({ ...initActive, template: !active.template })}
        />
        <MenuItem
          icon={setIcon}
          active={active.sets}
          line={true}
          handleActive={() => setActive({ ...initActive, sets: !active.sets })}
        />
        <MenuItem
          icon={focusIcon}
          bottom={true}
          small={true}
          active={active.focus}
          handleActive={() => setActive({ ...initActive, focus: !active.focus })}
        />
      </div>
      {active.sets && <Set />}
      {active.mood && <Mood />}
      {active.focus && <Focus />}
    </div>
  )
}

export default Menu
