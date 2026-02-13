import { useEffect, useRef } from "react";

export default function Hero() {
  const wordsRef = useRef([]);

  useEffect(() => {
    const timeouts = wordsRef.current.map((word, index) => {
      return setTimeout(() => {
        if (word) word.classList.add("fade");
      }, 200 * index);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const addToRefs = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  return (
    <section
      aria-label="Hero"
      className="relative w-full flex items-start justify-center z-[10] h-[100vh] pt-[90px] min-h-[100vh] xs:min-h-[1000px] sm:min-h-[1300px] md:min-h-[1200px] lg:min-h-[1000px] xl:min-h-[1000px] 2xl:min-h-[1100px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-center">
        <img
          src="/assets/kyanja-hero-image.webp"
          alt="Hero Student"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-4">
        {/* Logo */}
        <div className="bg-white/0 rounded-md flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.4)] w-40 h-40 sm:w-60 sm:h-60 md:w-60 md:h-60 lg:w-80 lg:h-80">
          <img
            src="/assets/logo.svg"
            alt="School Logo"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Headline */}
        <h1 className="text-primary font-extrabold leading-tight text-[2.5rem] sm:text-[4rem] md:text-[4rem] lg:text-[6.5rem] mt-0">
          <span ref={addToRefs} className="word">
            Education
          </span>{" "}
          <span ref={addToRefs} className="word">
            is
          </span>{" "}
          <span ref={addToRefs} className="word">
            a
          </span>{" "}
          <span ref={addToRefs} className="word text-accent">
            TREASURE
          </span>
        </h1>

        {/* Subtitle */}
        {/* <p className="text-primary text-[1.2rem] sm:text-4xl lg:text-4xl font-light sm:tracking-[0.05em] max-w-[900px] mt-2 mb-4 mx-2">
          <span className="font-extrabold block mb-2">Our mission:</span>
          <span className="leading-[0.2] sm:leading-[1.05] tracking-[0.1] sm:tracking-[0.5]">
            To produce a well-rounded, educated learner who is spiritual, moral, social, focused,
            holistic, and self-reliant.
          </span>
        </p> */}

        {/* Buttons */}
        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <a
            href="#enroll"
            className="px-4 py-4 text-lg sm:text-xl md:text-2xl font-semibold rounded-xl shadow-xl bg-primary text-white transition-all duration-300 hover:bg-accent"
          >
            Enroll Your Child Now
          </a>
          <a
            href="#visit"
            className="px-8 py-4 text-lg sm:text-xl md:text-2xl border border-primary text-primary rounded-xl bg-white/80 transition-all duration-300 hover:bg-white hover:text-accent hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
