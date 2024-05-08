import { useEffect, useRef } from "react"
import { AiOutlineArrowUp } from "react-icons/ai"

interface Props {
  whenShowSectionId: string
}

export default function GoToTop({ whenShowSectionId }: Props) {
  const btn = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    function showGoToTopBtn() {
      if (
        window.scrollY > document?.getElementById(whenShowSectionId)!.offsetTop
      ) {
        btn?.current?.classList.add("right-9")
        btn?.current?.classList.remove("-right-12")
      } else {
        btn?.current?.classList.add("-right-12")
        btn?.current?.classList.remove("right-9")
      }
    }
    window.addEventListener("scroll", showGoToTopBtn)
    return () => {
      window.removeEventListener("scroll", showGoToTopBtn)
    }
  }, [])
  const goToBeginning = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <div
      className="fixed -right-12 bottom-12 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white bg-red-600 text-xl text-white shadow-md shadow-black/20 transition-all duration-500 ease-in-out"
      onClick={goToBeginning}
      ref={btn}
    >
      <AiOutlineArrowUp />
    </div>
  )
}
