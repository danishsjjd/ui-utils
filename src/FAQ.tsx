import { useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const faqContent = [
  {
    qe: "How can I quickly create a stylish website template for showcasing my website?",
    ans: "You can create a stunning website by following these steps",
  },
]

const FAQ = () => {
  const [active, setActive] = useState<null | number>(null)

  const clickHandler = (i: number) => {
    if (active === i) return setActive(null)
    setActive(i)
  }

  return (
    <div className="mx-auto mb-10 max-w-2xl scroll-m-32 px-3  lg:p-0">
      <div className="space-y-8">
        {faqContent.map((faq, i) => {
          const faqActive = active === i
          return (
            <div key={i}>
              <div
                className="relative flex h-[70px] w-full cursor-pointer items-center justify-between rounded-tl-xl border-2 border-white px-4"
                onClick={() => clickHandler(i)}
              >
                <div
                  className={`absolute left-2 top-2 grid h-12 w-12 origin-bottom-left place-items-center rounded-tl-xl rounded-br-xl text-4xl font-black transition-all duration-200 ${
                    faqActive
                      ? "-rotate-[30deg]  border-2 border-white bg-black text-white"
                      : "bg-white text-black "
                  }`}
                >
                  {i + 1}
                </div>
                <p className="pl-14 text-sm sm:text-base">{faq.qe}</p>
                {faqActive ? (
                  <AiOutlineMinus size={"2rem"} />
                ) : (
                  <AiOutlinePlus size={"2rem"} />
                )}
              </div>
              <div
                className={`text-primary-dark overflow-hidden border-2 border-white transition-all duration-[.4s] ${
                  faqActive ? "max-h-[500px] p-4" : "max-h-0"
                }`}
              >
                <p>{faq.ans}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQ

//
