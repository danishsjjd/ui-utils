import { Dialog, Transition } from "@headlessui/react"
import { Spin as Hamburger } from "hamburger-react"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { FaDiscord, FaTelegramPlane, FaTwitter } from "react-icons/fa"
import { ReactComponent as ReactIcon } from "../assets/react.svg"
import LinkButton from "./LinkButton"

const links = ["home", "about", "other", "another"]

const socialLinks = [
  {
    href: "https://www.twitter.com/danishsjjd",
    bg: "bg-[#1DA1F2]",
    Icon: FaTwitter,
  },
  {
    href: "https://www.facebook.com/danishsjjd",
    bg: "bg-[#7289d9]",
    Icon: FaDiscord,
  },
  {
    href: "https://www.github.com/danishsjjd",
    bg: "bg-[#0088cc]",
    Icon: FaTelegramPlane,
  },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isGoingUp, setIsGoingUp] = useState(true)
  // todo: show and hide header while scrolling
  let scroll = useRef(0)

  const activeLink = useCallback((e: Event) => {
    if (window.scrollY > scroll.current) setIsGoingUp(false)
    else setIsGoingUp(true)

    scroll.current = window.scrollY
  }, [])

  useEffect(() => {
    // ? scroll where hash match to section id on initial loading
    window.scrollTo({
      top: document.getElementById(window.location.hash.slice(1))?.offsetTop,
      behavior: "smooth",
    })

    window.addEventListener("scroll", activeLink)
    return () => {
      window.removeEventListener("scroll", activeLink)
    }
  }, [activeLink])

  return (
    <header className="fixed top-0 z-20 w-screen">
      {/* mobile */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30 bg-white lg:hidden"
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 z-20 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                as="div"
                className="relative flex w-full max-w-xs flex-col justify-start gap-5 overflow-y-auto bg-red-600 pl-6 pb-12 shadow-xl"
              >
                <div className="relative">
                  <div className="absolute right-2 -top-0 block [@media_(min-width:350px)]:hidden">
                    <Hamburger
                      toggled={isOpen}
                      toggle={() => {
                        setIsOpen(false)
                      }}
                      size={32}
                      color="white"
                      direction="right"
                      duration={0.7}
                    />
                  </div>
                  <div
                    className="my-4 text-center text-4xl font-black uppercase"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      setIsOpen(false)
                    }}
                  >
                    <ReactIcon className="h-20 w-20" />
                  </div>
                </div>
                {links.map((link, index) => {
                  return (
                    <LinkButton to={link} key={index} setIsOpen={setIsOpen}>
                      {link}
                    </LinkButton>
                  )
                })}
                <div className="flex grow items-start justify-center gap-3 border-t border-t-white pt-4">
                  {socialLinks.map(({ Icon, bg, href }, i) => (
                    <a
                      key={i}
                      className={
                        "block cursor-pointer rounded p-2 hover:bg-opacity-80 " +
                        bg
                      }
                      href={href}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <Icon size="2.3rem" color="white" />
                    </a>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop */}
      <div
        className={`flex items-center justify-center bg-red-600 transition duration-300 ${
          isGoingUp ? "-translate-y-0" : "-translate-y-16 sm:-translate-y-20"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-14 sm:h-20 lg:px-6">
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ReactIcon className="h-20 w-20" />
          </div>
          <nav className="hidden items-center gap-2 lg:flex">
            <ul className="flex items-center gap-6">
              {links.map((link, i) => (
                <li key={i}>
                  <LinkButton to={link}>{link}</LinkButton>
                </li>
              ))}
            </ul>
          </nav>
          <div className="block lg:hidden">
            <Hamburger
              color="white"
              direction="left"
              toggled={isOpen}
              toggle={setIsOpen}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
