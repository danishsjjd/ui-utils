import { Autoplay } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

const Slider = ({ imgArr }: { imgArr: string[] }) => {
  return (
    <Swiper
      autoplay={{ disableOnInteraction: false, delay: 1500 }}
      speed={500}
      initialSlide={0}
      grabCursor
      loop
      slidesPerView={5}
      spaceBetween={50}
      className="mx-auto !py-14 !px-7 lg:!px-0"
      modules={[Autoplay]}
      breakpoints={{
        190: {
          slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        },
        1800: {
          slidesPerView: 6,
        },
        2200: {
          slidesPerView: 8,
        },
        2800: {
          slidesPerView: 10,
        },
      }}
    >
      {imgArr.map((img, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded px-3">
              <img src={img} alt="Hacks NFT's" className="w-full rounded-3xl" />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default Slider
