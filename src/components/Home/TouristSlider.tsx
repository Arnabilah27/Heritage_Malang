import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import heritageData from "../../maps.json";
import { Link } from "react-router-dom";

import "swiper/swiper-bundle.css";

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
        {heritageData.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`relative rounded-lg overflow-hidden py-10  
              ${i % 2 === 1 ? "md:mt-3" : "md:-mt-3"}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover rounded-lg"
              />

              {/* Overlapping bottom content */}
              <div className="absolute bottom-15 left-0 right-0 translate-y-1/2 pr-10">
                <div className="bg-white rounded-lg px-2 py-4 shadow-md text-left mb-3">
                  <p className="text-[12px] italic font-semibold text-[#C9AB81] mb-1">
                    {item.address}
                  </p>
                  <h3 className="font-semibold text-[#525252] text-md uppercase leading-tight tracking-wide">
                    {item.name}
                  </h3>
                </div>
                <Link to={`/destination`}>
                  <p className="text-sm text-gray-700 cursor-pointer hover:text-[#C9AB81] transition-colors">
                    <span className="font-sans text-[#C9AB81]">——&nbsp;</span>
                    View more
                  </p>
                </Link>
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
