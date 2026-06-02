type Props = {
  icon: string
  handleActive: () => void
  active: boolean
  line?: boolean
  top?: boolean
  bottom?: boolean
  small?: boolean
}

const MenuItem = ({ icon, handleActive, active, line, top, bottom, small }: Props) => {
  return (
    <div
      className={`relative w-[70px] h-[70px] cursor-pointer ${top ? 'rounded-t-full' : ''} ${bottom ? 'rounded-b-full' : ''} ${active ? 'bg-bg-menu' : ''}`}
      onClick={handleActive}
    >
      <div
        className={`${small ? 'absolute pointer-events-none w-8 h-8 top-4 left-5' : 'absolute pointer-events-none w-[115px] h-[115px] -top-5 -left-[22px]'}`}
      >
        <img
          src={icon}
          className={`w-full h-full ${active ? 'opacity-100 brightness-100' : 'opacity-20 brightness-200'}`}
          alt="background-video"
        />
      </div>
      {line && (
        <div
          className={`relative w-[50px] border-b-2 border-transparent-w-30 opacity-${active ? '0' : '40'} transform top-full left-1/2 -translate-x-1/2`}
        ></div>
      )}
    </div>
  )
}

export default MenuItem
