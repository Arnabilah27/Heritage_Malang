const destinations = [
  {
    id: 1,
    title: "DESTINATION 01",
    subtitle: "History of the",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing et
elit, se sed do se eiusmod tempor incididunt ut labore
et sa nes in dolore si magna aliqua. Ut enim ad minim
veniam, in qu is nostrud e exercitation ullamco laboris
nisi ut sen don nins aliquip ex ea commodo consequat.
Duis aute irure do dolor eu est laborum. Sed ut perspic
iatis unde omnis iste natus i error sit don eu fugiat est
nulla duis aute.`,
    image: "./hero-background.webp",
    admissions: "Adults $10\nChildren under 12: free",
    hours: "Tue – Thu: 10AM – 6PM\nFri – Mon: 10AM – 9PM",
  },
  {
    id: 2,
    title: "DESTINATION 02",
    subtitle: "History of the",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing et
elit, se sed do se eiusmod tempor incididunt ut labore
et sa nes in dolore si magna aliqua. Ut enim ad minim
veniam, in qu is nostrud e exercitation ullamco laboris
nisi ut sen don nins aliquip ex ea commodo consequat.
Duis aute irure do dolor eu est laborum. Sed ut perspic
iatis unde omnis iste natus i error sit don eu fugiat est
nulla duis aute.`,
    image: "./hero-background.webp",
    admissions: "Adults $15\nChildren: $5",
    hours: "Mon – Fri: 9AM – 5PM\nSat – Sun: 10AM – 8PM",
  },
  {
    id: 3,
    title: "DESTINATION 03",
    subtitle: "History of the",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing et
elit, se sed do se eiusmod tempor incididunt ut labore
et sa nes in dolore si magna aliqua. Ut enim ad minim
veniam, in qu is nostrud e exercitation ullamco laboris
nisi ut sen don nins aliquip ex ea commodo consequat.
Duis aute irure do dolor eu est laborum. Sed ut perspic
iatis unde omnis iste natus i error sit don eu fugiat est
nulla duis aute.`,
    image: "./hero-background.webp",
    admissions: "Adults $15\nChildren: $5",
    hours: "Mon – Fri: 9AM – 5PM\nSat – Sun: 10AM – 8PM",
  },
  {
    id: 4,
    title: "DESTINATION 04",
    subtitle: "History of the",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing et
elit, se sed do se eiusmod tempor incididunt ut labore
et sa nes in dolore si magna aliqua. Ut enim ad minim
veniam, in qu is nostrud e exercitation ullamco laboris
nisi ut sen don nins aliquip ex ea commodo consequat.
Duis aute irure do dolor eu est laborum. Sed ut perspic
iatis unde omnis iste natus i error sit don eu fugiat est
nulla duis aute.`,
    image: "./hero-background.webp",
    admissions: "Adults $15\nChildren: $5",
    hours: "Mon – Fri: 9AM – 5PM\nSat – Sun: 10AM – 8PM",
  },
];

export default function Timeline() {
  return (
    <div className="max-w-7xl mx-auto py-10 sm:py-20 px-4 relative">
      {/* Vertical Line - hidden on mobile */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:h-[2400px] md:h-[2900px] w-[1px] bg-black z-0 hidden md:block"></div>

      <div className="flex flex-col gap-16 sm:gap-32">
        {destinations.map((item, i) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center justify-center md:items-start gap-6 md:gap-10 relative z-10 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-[300px] lg:w-[400px] h-auto">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg border shadow-md w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
              />
            </div>

            {/* Text content */}
            <div
              className={`w-full md:w-[300px] lg:w-[500px] text-gray-700 mt-4 md:mt-0 ${
                i % 2 === 0
                  ? "md:pl-10 lg:pl-20 md:text-left"
                  : "md:pr-10 lg:pr-20 md:text-right"
              }`}
            >
              <p className="italic text-[#C9AB81] text-md mb-2">
                {item.subtitle}
              </p>
              <h3 className="text-xl sm:text-3xl font-serif font-semibold uppercase tracking-wide mb-3 sm:mb-4">
                {item.title}
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-justify">
                {item.description}
              </p>
              <div className="mb-2">
                <strong className="block font-medium mb-1 text-sm sm:text-base">
                  🎫 Admissions
                </strong>
                <p className="whitespace-pre-line text-sm sm:text-base">
                  {item.admissions}
                </p>
              </div>
              <div>
                <strong className="block font-medium mb-1 text-sm sm:text-base">
                  🕒 Opening Hours
                </strong>
                <p className="whitespace-pre-line text-sm sm:text-base">
                  {item.hours}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center mt-20">
        <button className="border border-[#9A8F69] text-[#9A8F69] px-4 py-2 rounded-sm hover:bg-[#9A8F69] hover:text-white transition duration-200 cursor-pointer">
          View More
        </button>
      </div>
    </div>
  );
}
