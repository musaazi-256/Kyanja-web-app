export default function AdvertismentBanner() {
  return (
    <section
      aria-label="Advertisment"
      className="relative bg-transparent select-none px-40 pb-40"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto pb-20 pt-40 text-center">
        <h1 className="font-extrabold text-[3rem] sm:text-[4rem] lg:text-[6rem] text-primary leading-[1.2]">
          Stay Informed
        </h1>
        <p className="mt-4 text-text-secondary text-xl sm:text-2xl lg:text-3xl max-w-[900px] mx-auto">
          Don't miss out on any updates from school.
        </p>
      </div>

      <img
        src="/assets/admissions-banner.webp"
        alt="Admissions banner"
        className="w-full h-auto rounded-2xl block select-none pointer-events-none"
        loading="lazy"
      />
    </section>
  );
}
