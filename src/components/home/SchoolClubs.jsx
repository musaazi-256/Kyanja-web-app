import { useRef } from "react";

export default function SchoolClubs() {
  const trackRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector(".carousel-card");
      if (card) {
        const scrollAmount = card.offsetWidth + 16;
        trackRef.current.scrollBy({
          left: direction * scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const clubs = [
    {
      name: "Scouts",
      img: "/assets/Scouts.webp",
      desc: "Starting young with discipline and survival skills.",
    },
    {
      name: "Music & Drama",
      img: "/assets/mdd.webp",
      desc: "Unleashing creativity through performance arts.",
    },
    {
      name: "Sports",
      img: "/assets/sports.webp",
      desc: "Building fitness, teamwork and competitive spirit.",
    },
  ];

  return (
    <section className="py-16 bg-white w-full mb-16">
      <div className="max-w-[800px] mx-auto px-4 relative group">
        <div
          id="carousel-track"
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 w-full no-scrollbar scroll-smooth relative z-0"
        >
          {clubs.map((club) => (
            <div
              key={club.name}
              className="carousel-card snap-center shrink-0 w-[85%] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] h-[500px] rounded-[2rem] overflow-hidden relative group cursor-pointer"
            >
              <img
                src={club.img}
                alt={club.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-3xl font-bold mb-2">
                  {club.name}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {club.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCarousel(-1)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full hidden md:flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => scrollCarousel(1)}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full hidden md:flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
