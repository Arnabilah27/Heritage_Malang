import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

const slides = [
  {
    image: "./hero-background.webp",
    title: "HERITAGE MALANG CITY",
    subtitle: "STADSKAART",
  },
  {
    image: "./hero-background.webp",
    title: "EXPLORE MALANG HISTORY",
    subtitle: "STADSKAART",
  },
  {
    image: "./hero-background.webp",
    title: "DISCOVER CULTURE",
    subtitle: "STADSKAART",
  },
];

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] lg:h-[80vh]">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 600000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-fill brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
                <h4 className="text-xl italic tracking-widest mb-2 uppercase">
                  {slide.subtitle}
                </h4>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                  <span className="hidden md:inline">—&nbsp;&nbsp;</span>
                  {slide.title}
                  <span className="hidden md:inline">&nbsp;&nbsp;—</span>
                </h1>
                <button className="mt-6 px-6 py-2 border-2 font-semibold border-[#C9AB81] text-[#C9AB81] cursor-pointer hover:bg-white hover:text-black transition duration-300">
                  Explore city
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}
