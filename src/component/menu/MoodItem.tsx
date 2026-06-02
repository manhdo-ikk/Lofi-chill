type Props = {
  iconSrc: string
  label: string
  className: string
  iconClassName?: string
  isActive: boolean
  isSearch?: boolean
  handleClick: () => void
}

const MoodItem = ({ iconSrc, label, className, isActive, handleClick, isSearch = false }: Props) => {
  return (
    <div
      className="relative flex items-center h-16 col-span-1 bg-bg-200 rounded-xl cursor-pointer group"
      onClick={handleClick}
    >
      <div className={`absolute w-[150px] h-[150px] pointer-events-none flex items-center justify-center ${className}`}>
        <img
          src={iconSrc}
          alt="mood-icon"
          className={`${
            isSearch ? 'h-8 w-8' : 'h-full w-full'
          } transition duration-200 ease-out ${
            isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200 group-hover:opacity-50'
          }`}
        />
      </div>
      <p
        className={`absolute bottom-5 left-1/2 font-semibold transition duration-200 ease-out ${
          isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200 group-hover:opacity-50'
        }`}
      >
        {label}
      </p>
    </div>
  )
}

export default MoodItem
