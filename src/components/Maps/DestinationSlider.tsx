import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";

const destinations = [
  {
    id: 1,
    title: "Destination 01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: "./hero-background.webp",
  },
  {
    id: 2,
    title: "Destination 02",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "./hero-background.webp",
  },
  {
    id: 3,
    title: "Destination 03",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: "./hero-background.webp",
  },
];

export default function DestinationSlider() {
  const paginationRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  // Update pagination whenever the ref or swiper instance changes
  useEffect(() => {
    if (paginationRef.current && swiperInstance) {
      // Update pagination element
      if (
        swiperInstance.params.pagination &&
        typeof swiperInstance.params.pagination !== "boolean"
      ) {
        swiperInstance.params.pagination.el = paginationRef.current;
        swiperInstance.pagination.init();
        swiperInstance.pagination.update();
      }
    }
  }, [swiperInstance]);

  return (
    <div className="w-full bg-[#EBE9E2] h-full p-4 sm:p-6 flex flex-col items-center justify-center">
      {/* Pagination container positioned above the slider */}
      <div className="w-full max-w-3xl relative">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
          }}
          className="w-full"
        >
          {destinations.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center text-center mt-10 md:mt-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover"
                />

                {/* Space for pagination */}
                <div className="h-8"></div>

                <h3 className="uppercase text-lg font-semibold tracking-wide my-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 max-w-xl">
                  {item.description}
                </p>
                <button className="border px-4 py-2 text-sm border-[#5F5F5F] hover:bg-gray-800 hover:text-white transition duration-200 cursor-pointer">
                  View More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination container positioned between image and title */}
        <div
          ref={paginationRef}
          className="destination-pagination flex justify-center absolute left-0 right-0 bottom-[calc(100%-500px)] z-10"
        />
      </div>

      <style>{`
        .destination-pagination {
          margin-bottom: 150px;
        }
        
        .destination-pagination .swiper-pagination-bullet {
          background-color: #000 !important;
          opacity: 0.6;
          margin: 0 4px;
        }
        
        .destination-pagination .swiper-pagination-bullet-active {
          background-color: #000 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
