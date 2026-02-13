export default function Identity() {
  return (
    <>
      {/* Who we are header */}
      <section className="relative py-28 bg-[#ffffff] text-white mt-[0px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 "></div>
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-extrabold text-[3rem] sm:text-[4rem] lg:text-[6rem] text-primary leading-[1.2]">
            Who We Are
          </h1>
          <p className="mt-4 text-text-secondary text-xl sm:text-2xl lg:text-3xl max-w-[900px] mx-auto">
            A Christian School raising the next generation of leaders who will
            transform their world.
          </p>
        </div>
      </section>

      {/* Our Identity */}
      <section className="pt-0 pb-40 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
              <h3 className="text-6xl font-bold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-4xl text-gray-700 leading-relaxed font-regular">
                is to produce a{" "}
                <span className="font-bold text-primary">
                  well-rounded, educated learner
                </span>{" "}
                who is spiritual, moral, social, focused, holistic, and
                self-reliant.
              </p>
            </div>

            <div className="bg-primary p-10 rounded-3xl text-white">
              <h3 className="text-6xl font-bold mb-4">Our Values</h3>
              <ul className="text-3xl leading-loose font-regular space-y-2">
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Excellence
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Integrity &
                  Discipleship
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Leadership
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Innovation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
