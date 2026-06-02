import { useRef } from 'react'
import { minusIcon, plusIcon } from '../../assets/icons'

type Props = {
  time: number
  message: string
  handlePlus: () => void
  handleMinus: () => void
  onChange: (value: string) => void
}

const ChangeTime = ({ time, message, handlePlus, handleMinus, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="w-1/3">
      <h5 className="font-semibold">{message}</h5>
      <div className="my-4 w-[140px] h-[50px] rounded-lg bg-bg-200 flex items-center justify-center">
        <img
          src={minusIcon}
          alt="minus"
          className="h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-l-lg cursor-pointer"
          onClick={handleMinus}
        />
        <input
          value={time}
          className="w-1/3 h-full bg-bg-200 text-center"
          ref={inputRef}
          onChange={() => {
            if (inputRef.current) onChange(inputRef.current.value)
          }}
        />
        <img
          src={plusIcon}
          alt="plus"
          className="h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer"
          onClick={handlePlus}
        />
      </div>
    </div>
  )
}

export default ChangeTime
