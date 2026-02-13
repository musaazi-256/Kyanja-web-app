export default function HolisticActivities() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Holistic Activities
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              We believe that learning is best achieved in a fun environment. We
              are keen on the development of patriotic citizens through a wide
              range of clubs.
            </p>

            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Daily Schedule</h3>
              <p className="text-xl">
                The typical school day ends at{" "}
                <span className="font-bold">4:30 PM</span> for Early Years and
                Primary School, and at{" "}
                <span className="font-bold">5:00 PM</span> for candidate
                classes.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 border-b border-white/20 pb-4">
              Primary School Clubs
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xl">
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Chess Club
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Basketball
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Football
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Netball
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Music, Dance & Dramma
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Home Economics
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Scoutes & Girl guides
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">★</span> Swimming{" "}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-3xl font-bold mb-6 border-b border-white/20 pb-4">
                Other Activities
              </h3>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-2 bg-white text-primary rounded-full text-lg font-bold">
                  Computer Training
                </span>
                <span className="px-6 py-2 bg-white text-primary rounded-full text-lg font-bold">
                  Cultural Activities
                </span>
                <span className="px-6 py-2 bg-white text-primary rounded-full text-lg font-bold">
                  Creative Arts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
