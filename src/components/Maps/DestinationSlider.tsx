import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper/types";
import heritageData from "../../maps.json";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

interface Location {
  code?: string;
  name?: string;
  lat?: number;
  long?: number;
  image?: string;
  description?: string;
  element?: string;
  othername?: string;
  language?: string;
  meaning?: string;
  manager?: string;
  status?: string;
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
    <div className="w-full bg-[#EBE9E2] p-6 pt-10">
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="w-full"
      >
        {(heritageData as Location[]).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col text-center max-h-[92vh]">
              <div className="relative w-full mb-4 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-[300px] md:h-[350px] object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-white bg-[#9A8F69] bg-opacity-50 rounded-full p-1 hover:bg-[#544d32] transition-colors z-10"
                  aria-label="Close"
                >
                  <RiCloseFill size={20} />
                </button>
              </div>

              <div className="overflow-y-auto w-full max-w-xl mb-4 flex-grow">
                <table className="table-auto w-full border border-gray-300 text-sm text-left">
                  <tbody>
                    {[
                      { label: "Kode Bangunan", value: item.code || "—" },
                      { label: "Nama", value: item.name || "—" },
                      { label: "Unsur", value: item.element || "—" },
                      {
                        label: "Koordinat",
                        value:
                          item.lat && item.long
                            ? `${item.lat}, ${item.long}`
                            : "—",
                      },
                      { label: "Nama Lain", value: item.othername || "—" },
                      { label: "Asal Bahasa", value: item.language || "—" },
                      { label: "Arti Nama", value: item.meaning || "—" },
                      { label: "Sejarah Nama", value: item.description || "—" },
                      { label: "Pengelolah", value: item.manager || "—" },
                      { label: "Status Bangunan", value: item.status || "—" },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-300">
                        <td className="px-4 py-2 font-semibold text-[#544d32] w-1/3 align-top">
                          {row.label}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* === PERBAIKAN FINAL DI SINI: `mt-auto` DIHAPUS === */}
              <div className="flex-shrink-0">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
