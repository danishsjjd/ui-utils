import { ReactNode, Dispatch, SetStateAction } from "react"
import { Link } from "react-scroll"

interface Props {
  children: ReactNode
  to: string
  className?: string
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

const LinkButton = ({ children, to, className, setIsOpen }: Props) => {
  return (
    <Link
      to={`${to}`}
      spy
      activeClass={"text-red-400"}
      offset={-200}
      className={`cursor-pointer font-bold uppercase ${
        className ? className : ""
      }`}
      onClick={() => {
        window.history.pushState(null, "", `#${to}`)
        if (setIsOpen) setIsOpen(false)
      }}
    >
      {children}
    </Link>
  )
}

export default LinkButton
