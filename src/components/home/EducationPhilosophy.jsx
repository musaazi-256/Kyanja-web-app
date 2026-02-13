export default function EducationPhilosophy() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-6xl font-bold text-primary mb-4">
            Our Education Philosophy
          </h2>

          <div className="space-y-6 text-2xl text-gray-500 leading-relaxed">
            <p>
              We believe that{" "}
              <span className="font-bold text-gray-600">
                every child is uniquely gifted by design
              </span>
              , fearfully and wonderfully made by God the Creator of the
              universe.
            </p>
            <p>
              Our individual differences are the outward mark of an inborn
              genius waiting to be discovered, nurtured, and released for global
              impact in every sphere of influence.
            </p>
            <p className="border-l-4 border-accent pl-6 italic text-gray-400">
              "As professional educators, we consider it our responsibility to
              identify this greatness and work in partnership with the
              children’s primary educators – the parents and guardians – to
              raise a generation of confident, powerful and Godly leaders."
            </p>
          </div>
        </div>

        <div className="relative">
          <div className=" rounded-3xl transform translate-x-4 translate-y-4"></div>
          <img
            src="/assets/kyanja-hero-image.webp"
            alt="Student Learning"
            className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
