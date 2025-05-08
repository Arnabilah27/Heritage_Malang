import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="w-full bg-[#edece9]">
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <h1 className="text-xl">STADSKAART</h1>
          <h1 className="text-4xl">
            <span className="hidden md:inline">—&nbsp;&nbsp;&nbsp;&nbsp;</span>
            HISTORY OF MALANG CITY
            <span className="hidden md:inline">&nbsp;&nbsp;&nbsp;&nbsp;—</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
