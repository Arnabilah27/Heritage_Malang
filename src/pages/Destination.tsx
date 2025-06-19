import Timeline from "@/components/Destination/Timeline";

export default function Destination() {
  return (
    <div>
      <div className="w-full h-auto bg-destination" />
      <div className="flex flex-col gap-2 items-center justify-center py-8">
        <div className="flex flex-col items-center justify-center px-8">
          <h1 className="text-4xl pb-8 italic text-[#9A8F69] font-semibold">
            Tentang Destinasi
          </h1>
          <p className="lg:px-64 text-md text-[#5F5F5F] text-justify">
            Kunjungi tempat-tempat menarik dan bersejarah di Kota Malang.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Timeline />
        </div>
      </div>
    </div>
  );
}
