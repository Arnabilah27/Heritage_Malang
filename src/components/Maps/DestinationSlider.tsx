import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";

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

  // When a location is selected, move to its slide
  useEffect(() => {
    if (selectedLocation && swiperInstance) {
      const index = destinations.findIndex(
        (dest) => dest.title === selectedLocation.name
      );
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation, swiperInstance]);

  const destinations = [
    {
      id: 1,
      title: "Balai Kota",
      description:
        "The City Hall of Malang, a historic building that represents the city's administrative center.",
      image: "./hero-background.webp",
    },
    {
      id: 2,
      title: "Gereja Cor Jesu",
      description:
        "A beautiful Catholic church with stunning architecture and rich history.",
      image: "./hero-background.webp",
    },
    {
      id: 3,
      title: "Gereja Immanuel Malang",
      description: "A historic Protestant church in the heart of Malang.",
      image: "./hero-background.webp",
    },
    {
      id: 4,
      title: "Gereja Paroki Hati Kudus Yesus",
      description:
        "A Catholic church known for its beautiful architecture and peaceful atmosphere.",
      image: "./hero-background.webp",
    },
    {
      id: 5,
      title: "Idjen Boulevard",
      description:
        "A famous street in Malang known for its colonial architecture and vibrant atmosphere.",
      image: "./hero-background.webp",
    },
    {
      id: 6,
      title: "Kayu Tangan",
      description:
        "A popular shopping area in Malang with a mix of traditional and modern shops.",
      image: "./hero-background.webp",
    },
    {
      id: 7,
      title: "Klenteng Eng An Kiong",
      description:
        "A historic Chinese temple that showcases the city's cultural diversity.",
      image: "./hero-background.webp",
    },
    {
      id: 8,
      title: "Kuburan Londo",
      description:
        "A historic Dutch cemetery that tells stories of Malang's colonial past.",
      image: "./hero-background.webp",
    },
    {
      id: 9,
      title: "Masjid Jami'",
      description:
        "A historic mosque that represents the Islamic heritage of Malang.",
      image: "./hero-background.webp",
    },
    {
      id: 10,
      title: "Tugu Merdeka",
      description:
        "The Independence Monument of Malang, a symbol of the city's freedom.",
      image: "./hero-background.webp",
    },
  ];

  return (
    <div className="w-full bg-[#EBE9E2] h-full p-4 sm:p-6 flex flex-col items-center justify-center">
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
