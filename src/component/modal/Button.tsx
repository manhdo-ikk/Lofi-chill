type Props = {
  big?: boolean
  css?: string
  text: string
  active?: boolean
  handle: () => void
}

const Button = ({ big, css, text, active, handle }: Props) => {
  return (
    <div
      className={`${big ? 'w-1/3' : 'w-24 font-medium mx-2'} ${css ?? ''} text-white cursor-pointer`}
      onClick={handle}
    >
      <div
        className={`${active ? 'bg-primary text-black' : 'text-current'} text-center rounded-full py-1`}
      >
        {text}
      </div>
    </div>
  )
}

export default Button
