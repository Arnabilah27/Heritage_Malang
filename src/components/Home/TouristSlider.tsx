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
              className={`rounded overflow-hidden shadow-sm border hover:border-blue-500 transition duration-300 bg-white
              ${i % 2 === 1 ? "mt-0 md:mt-0" : "mt-0 md:mt-6"}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-84 w-full object-cover"
              />
              <div className="p-4 text-left ">
                <p className="text-[12px] italic text-[#C9AB81] mb-1">
                  {item.date}
                </p>
                <h3 className="font-serif font-semibold text-md uppercase leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1 underline cursor-pointer">
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
          margin-bottom: 80px;
        }
        .swiper-pagination-bullet {
          background-color: #333;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #000;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
