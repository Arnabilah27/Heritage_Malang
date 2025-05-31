import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper/types";
import heritageData from "../../maps.json";

interface Location {
  name: string;
  lat: number;
  long: number;
}

interface DestinationSliderProps {
  selectedLocation: Location | null;
}

export default function DestinationSlider({
  selectedLocation,
}: DestinationSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  // When a location is selected, move to its slide
  useEffect(() => {
    if (selectedLocation && swiperInstance) {
      const index = heritageData.findIndex(
        (dest) => dest.name === selectedLocation.name
      );
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selectedLocation, swiperInstance]);

  return (
    <div className="w-full bg-[#EBE9E2] h-full p-4 sm:p-6 flex flex-col items-center justify-center">
      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        className="w-full"
      >
        {heritageData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center mt-10 md:mt-0">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover"
              />

              <div className="h-8"></div>

              <h3 className="uppercase text-lg font-semibold tracking-wide my-4">
                {item.name}
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
    </div>
  );
}
