import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper/types";
import heritageData from "../../maps.json";
import { Link } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

interface Location {
  name: string;
  lat: number;
  long: number;
  image?: string;
  description?: string;
}

interface DestinationSliderProps {
  selectedLocation: Location | null;
  onClose: () => void;
}

export default function DestinationSlider({
  selectedLocation,
  onClose,
}: DestinationSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  useEffect(() => {
    if (selectedLocation && swiperInstance) {
      const index = (heritageData as Location[]).findIndex(
        (dest) => dest.name === selectedLocation.name
      );
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selectedLocation, swiperInstance]);

  return (
    <div className="w-full bg-[#EBE9E2] h-full p-6 pt-20 flex flex-col justify-center relative">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-[#9A8F69] hover:text-gray-800 transition-colors z-10"
        aria-label="Close"
      >
        <RiCloseFill size={28} />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        className="w-full"
      >
        {(heritageData as Location[]).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg w-full h-[450px] sm:h-[450px] md:h-[450px] object-cover"
              />

              <div className="h-8"></div>

              <h3 className="uppercase text-lg font-semibold tracking-wide my-4">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xl">
                {item.description}
              </p>
              <Link to={`/destination`}>
                <button className="border border-[#9A8F69] text-[#9A8F69] px-4 py-2 rounded-sm hover:bg-[#9A8F69] hover:text-white transition duration-200 cursor-pointer">
                  View More
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
