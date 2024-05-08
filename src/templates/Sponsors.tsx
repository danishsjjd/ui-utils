import ScrollContainer from "react-indiana-drag-scroll"

interface Props {
  sponsors: string[]
}

const Sponsors = ({ sponsors }: Props) => {
  return (
    <div className="px-6">
      <ScrollContainer
        className="scroll-container mx-auto my-5 flex max-w-7xl items-center gap-8 overflow-x-auto bg-red-900 sm:gap-12"
        vertical={false}
        hideScrollbars={false}
      >
        {sponsors.map((img, index) => (
          <img
            src={img}
            alt="sponsors"
            key={index}
            className="aspect-video max-w-[130px] object-contain py-2 mix-blend-multiply sm:max-w-[170px]"
          />
        ))}
      </ScrollContainer>
    </div>
  )
}

export default Sponsors
