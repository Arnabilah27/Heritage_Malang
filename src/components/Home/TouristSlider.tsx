import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

const data = [
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
  {
    title: "THE STREET PAVEMENTS",
    date: "Mar 1 - Mar 3 2025",
    image: "./hero-background.webp",
  },
];

export default function TouristSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`relative rounded-lg overflow-hidden py-10  
              ${i % 2 === 1 ? "md:mt-3" : "md:-mt-3"}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg"
              />

              {/* Overlapping bottom content */}
              <div className="absolute bottom-15 left-0 right-0 translate-y-1/2 pr-10">
                <div className="bg-white rounded-lg px-2 py-4 shadow-md text-left mb-3">
                  <p className="text-[12px] italic font-semibold text-[#C9AB81] mb-1">
                    {item.date}
                  </p>
                  <h3 className="font-semibold text-[#525252] text-md uppercase leading-tight tracking-wide">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 cursor-pointer">
                  <span className="font-sans text-[#C9AB81]">——&nbsp;</span>{" "}
                  View more
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bullet customization */}
      <style>{`
        .swiper-wrapper {
          margin-bottom: 60px;
        }
        .swiper-pagination-bullet {
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
