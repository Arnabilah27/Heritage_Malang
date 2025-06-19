import { useState, useRef, useEffect } from "react";
import mapsData from "@/maps.json";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState(5);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // --- Tambahan untuk auto scroll ---
  const location = useLocation();
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // --- Auto scroll ke item jika ada state.scrollTo dari router ---
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const name = location.state.scrollTo;
      // Pastikan item yang ingin discroll sudah terlihat
      const idx = mapsData.findIndex((item) => item.name === name);
      if (idx !== -1) {
        // Jika belum visible, tambahkan visibleItems dulu
        if (visibleItems <= idx) {
          setVisibleItems(idx + 1);
        } else {
          // Scroll ke elemen
          setTimeout(() => {
            itemRefs.current[name]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 200);
        }
      }
    }
    // eslint-disable-next-line
  }, [location.state, visibleItems]);

  const handleViewMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  useEffect(() => {
    const updateLineHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight;
        setLineHeight(height);
      }
    };

    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);

    return () => {
      window.removeEventListener("resize", updateLineHeight);
    };
  }, [visibleItems]);

  return (
    <div className="max-w-7xl mx-auto py-10 sm:py-20 px-4 relative">
      {/* Vertical Line - hidden on mobile */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-black z-0 hidden md:block"
        style={{ height: `${lineHeight}px` }}
      ></div>

      <div ref={contentRef} className="flex flex-col gap-16 sm:gap-32">
        {mapsData.slice(0, visibleItems).map((item, i) => (
          <div
            key={item.name}
            ref={(el) => (itemRefs.current[item.name] = el)}
            className={`flex flex-col md:flex-row items-center justify-center md:items-start gap-6 md:gap-10 relative z-10 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image & Info */}
            <div className="w-full md:w-[300px] lg:w-[400px] h-auto flex flex-col">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg border shadow-md w-full h-[500px] sm:h-[350px] md:h-[500px] object-cover"
              />
              {/* Info di bawah gambar */}
              <div className="mt-4 space-y-2">
                <div>
                  <strong className="block font-medium mb-1 text-sm sm:text-base">
                    🎫 Biaya Masuk
                  </strong>
                  <p className="whitespace-pre-line text-sm sm:text-base">
                    {item.fee}
                  </p>
                </div>
                <div>
                  <strong className="block font-medium mb-1 text-sm sm:text-base">
                    🕒 Jam Operasional
                  </strong>
                  <p className="whitespace-pre-line text-sm sm:text-base">
                    {item.workingOperational}
                  </p>
                </div>
                <div>
                  <p className="whitespace-pre-line text-sm sm:text-base">
                    📍{item.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div
              className={`w-full md:w-[300px] lg:w-[500px] text-gray-700 mt-4 md:mt-0 ${
                i % 2 === 0
                  ? "md:pl-10 lg:pl-20 md:text-left"
                  : "md:pr-10 lg:pr-20 md:text-right"
              }`}
            >
              <p className="italic text-[#C9AB81] text-xl mb-2">
                Sejarah Tentang
              </p>
              <h3 className="text-xl sm:text-3xl font-serif font-semibold uppercase tracking-wide mb-3 sm:mb-4">
                {item.name}
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-justify">
                {item.timeline}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visibleItems < mapsData.length && (
        <div className="flex flex-col items-center justify-center mt-20">
          <button
            onClick={handleViewMore}
            className="border border-[#9A8F69] text-[#9A8F69] px-4 py-2 rounded-sm hover:bg-[#9A8F69] hover:text-white transition duration-200 cursor-pointer"
          >
            Lihat Detail
          </button>
        </div>
      )}
    </div>
  );
}
