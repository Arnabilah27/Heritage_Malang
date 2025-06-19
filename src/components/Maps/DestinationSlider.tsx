import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper/types";
import heritageData from "../../maps.json";
import { Link, useNavigate } from "react-router-dom"; // Catatan: Jika ini proyek Next.js App Router, Anda mungkin ingin menggunakan `next/link`
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
  const navigate = useNavigate();

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
    // Mengubah justify-center menjadi justify-start pada container utama
    // Mengurangi padding-top agar konten lebih naik
    <div className="w-full bg-[#EBE9E2] h-full p-6 pt-10 flex flex-col justify-start relative">
      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        className="w-full"
      >
        {(heritageData as Location[]).map((item, index) => (
          <SwiperSlide key={index}>
            {/* Mengubah justify-center menjadi justify-start pada slide content */}
            <div className="flex flex-col items-center text-center h-full">
              {" "}
              {/* Tambahkan h-full di sini */}
              {/* Wadah relatif untuk gambar dan tombol close */}
              <div className="relative w-full mb-4">
                {" "}
                {/* Tambahkan mb-4 untuk jarak ke teks di bawah */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-[400px] sm:h-[400px] md:h-[400px] object-cover"
                />
                {/* Tombol close yang diposisikan di atas gambar */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-[white] bg-[#9A8F69] bg-opacity-50 rounded-full p-1 hover:bg-[#544d32] transition-colors z-10"
                  aria-label="Close"
                >
                  <RiCloseFill size={20} />
                </button>
              </div>
              {/* Hapus div dengan h-8 yang tidak perlu lagi */}
              {/* <div className="h-8"></div> */}
              <h3 className="uppercase text-lg font-semibold tracking-wide my-4">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xl">
                {item.description}
              </p>
              {/* Catatan: Untuk Next.js App Router, gunakan `next/link` */}
              {/* Contoh: <Link href={`/destination/${encodeURIComponent(item.name)}`}> */}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/destinasi", { state: { scrollTo: item.name } });
                }}
              >
                <button className="border border-[#9A8F69] text-[#9A8F69] px-4 py-2 rounded-sm hover:bg-[#9A8F69] hover:text-white transition duration-200 cursor-pointer">
                  Lihat Detail
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
