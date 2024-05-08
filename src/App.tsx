import { AxiosError } from "axios"
import { useEffect } from "react"
import { Counter } from "./config/store/Counter"
import FAQ from "./FAQ"
import CountDown from "./templates/countDown/CountDown"
import Form from "./templates/Form"
import GoToTop from "./templates/GoToTop"
import Header from "./templates/Header"
import { API } from "./templates/lib/axios"
import ParallaxText from "./templates/ParallaxText"
import Slider from "./templates/Slider"
import Sponsors from "./templates/Sponsors"

const OrderlistStyle =
  "flex gap-5 before:inline-grid before:min-h-[40px] before:min-w-[40px] before:max-h-[40px] before:max-w-[40px] before:place-items-center before:rounded-full before:bg-emerald-400 before:text-sm before:font-bold before:text-black before:shadow-md before:shadow-black/20 before:content-[counter(howToBuy)] before:[counter-increment:howToBuy]"

function App() {
  const images = Array.from({ length: 7 }).map((_, i) => `/sponsor${i + 1}.png`)

  useEffect(() => {
    const getPoke = async () => {
      try {
        const response = await API.getPokemon?.<{ title: string }[]>({
          params: "products",
          query: { limit: 2 },
        })
        console.log(response?.data[0].title)
      } catch (e) {
        const err = e as AxiosError
        console.log(err.message)
      }
    }
    getPoke()
  }, [])

  return (
    <>
      <Header />
      <GoToTop whenShowSectionId="home" />
      <div
        className="grid min-h-screen w-screen place-items-center bg-emerald-600 py-8"
        id="home"
      >
        <Form />
        <CountDown
          date={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        />
      </div>
      <Counter />
      <div className="min-h-screen w-screen bg-red-400 py-8" id="about">
        <Slider imgArr={images} />
        <FAQ />
        <Sponsors sponsors={images} />
        <ParallaxText baseVelocity={-5}>Framer motion</ParallaxText>
        <ParallaxText baseVelocity={5}>Scroll Effect</ParallaxText>
      </div>
    </>
  )
}

export default App
