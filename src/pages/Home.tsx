import Hero from "@/components/Home/Hero";
import TouristSlider from "@/components/Home/TouristSlider";
export default function Home() {
  return (
    <div>
      <Hero />

      {/* History of Malang City */}
      <div className="w-full bg-[#edece9] text-[#847C65]">
        <div className="flex flex-col items-center justify-center gap-2 py-10">
          <h1 className="text-xl italic">STADSKAART</h1>
          <h1 className="text-2xl lg:text-4xl italic text-center font-semibold">
            <span className="hidden md:inline">—&nbsp;&nbsp;&nbsp;&nbsp;</span>
            HISTORY OF MALANG CITY
            <span className="hidden md:inline">&nbsp;&nbsp;&nbsp;&nbsp;—</span>
          </h1>
          <div className="flex flex-row gap-2 py-10">
            <div className="flex gap-10 flex-col lg:flex-row px-6 lg:px-40">
              <img
                src="/history.webp"
                alt="history"
                className="w-full lg:w-1/2"
              />
              <p className="text-md text-justify">
                Di balik pesona alam dan hiruk pikuk Kota Malang, tersembunyi
                jejak sejarah yang membentuk identitasnya hingga hari ini. Pada
                masa kolonial Belanda, Malang berkembang menjadi kota
                peristirahatan favorit para pejabat kolonial karena iklimnya
                yang sejuk dan pemandangannya yang menawan. Bangunan bergaya
                Eropa, jalanan yang tertata rapi, serta villa dan rumah dinas
                yang megah menjadi saksi bisu era keemasan arsitektur kolonial
                di tanah Jawa. Sisa-sisa peninggalan itu masih berdiri kokoh
                menyimpan cerita tentang masa lalu, tentang kekuasaan dan
                perlawanan, serta tentang kehidupan masyarakat Malang yang terus
                bergerak di tengah bayang-bayang sejarah. Kini, setiap sudut
                kota menjadi ruang hidup yang menyatu antara warisan budaya dan
                modernitas. Mari telusuri cerita di balik setiap bangunan tua,
                dengarkan bisikan masa lalu di lorong-lorong kota, dan rasakan
                atmosfer khas yang hanya bisa ditemukan di Kota Malang.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tourist Attraction */}
      <div className="w-full bg-[#D5D4D1] text-[#847C65]">
        <div className="flex flex-col items-center justify-center gap-2 py-10">
          <h1 className="text-2xl lg:text-4xl italic text-center font-semibold">
            <span className="hidden md:inline">—&nbsp;&nbsp;&nbsp;&nbsp;</span>
            TOURIST ATTRACTION
            <span className="hidden md:inline">&nbsp;&nbsp;&nbsp;&nbsp;—</span>
          </h1>
          <div className="w-full flex flex-row gap-2 lg:pt-12">
            <TouristSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
