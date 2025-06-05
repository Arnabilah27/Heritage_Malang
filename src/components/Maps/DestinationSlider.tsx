import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper/types";
import heritageData from "../../maps.json";
import { IoMdClose } from "react-icons/io"; // Impor ikon untuk tombol close

interface Location {
  name: string;
  lat: number;
  long: number;
  image?: string; // Tambahkan properti lain agar sesuai dengan data di maps.json
  description?: string;
}

// Tambahkan 'onClose' ke dalam interface props
interface DestinationSliderProps {
  selectedLocation: Location | null;
  onClose: () => void; // Fungsi yang tidak mengembalikan apa-apa
}

export default function DestinationSlider({
  selectedLocation,
  onClose, // Ambil 'onClose' dari props
}: DestinationSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  // When a location is selected, move to its slide
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
    // Tambahkan 'relative' agar tombol 'absolute' berfungsi dengan benar
    <div className="w-full bg-[#EBE9E2] h-full p-4 sm:p-6 flex flex-col items-center justify-center relative">
      {/* Buat tombol Close di pojok kanan atas */}
      <button
        onClick={onClose} // Panggil fungsi onClose saat diklik
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
        aria-label="Close"
      >
        <IoMdClose size={28} />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        className="w-full"
      >
        {(heritageData as Location[]).map((item, index) => (
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
              <button className="border border-[#9A8F69] text-[#9A8F69] px-4 py-2 rounded-sm hover:bg-[#9A8F69] hover:text-white transition duration-200 cursor-pointer">
                View More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
