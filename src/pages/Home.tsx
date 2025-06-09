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
                src="/history.png"
                alt="history"
                className="rounded-lg w-full lg:w-1/2"
              />
              <p className="text-md text-justify">
                Malang adalah kota yang menawan di provinsi Jawa Timur,
                Indonesia, terkenal karena iklim dataran tingginya yang sejuk,
                lanskap alamnya yang memukau, dan warisan budaya yang kaya.
                Terletak di antara perbukitan dan pegunungan yang hijau, kota
                ini menawarkan pelarian yang menyegarkan dari panas tropis,
                dengan daya tarik seperti situs bersejarah, candi kuno, dan
                lembaga pendidikan yang mencerminkan tradisi Jawa serta pengaruh
                kolonial Belanda.
                <br />
                Sebagai pusat utama pariwisata dan pertanian, Malang memadukan
                kehidupan modern dengan sejarah yang mendalam, menarik
                pengunjung lewat pasar tradisional, festival budaya, dan kebun
                apel yang terkenal. Di luar daya tarik alam dan budayanya,
                Malang juga berkembang sebagai pusat ekonomi yang ditopang oleh
                sektor manufaktur, pendidikan, dan pertanian, menjadikannya
                tujuan populer bagi pencari petualangan maupun ketenangan.
                Semangat kebersamaan masyarakatnya tampak dalam kuliner khas,
                pasar yang ramai, dan aktivitas luar ruang, menjadikan Malang
                sebagai permata tersembunyi di Indonesia yang menarik perhatian
                pelajar, wisatawan, dan pencinta alam. Dengan perpaduan
                keindahan alam dan kedalaman sejarah, Malang terus memikat siapa
                pun yang mencari liburan yang seimbang.
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
