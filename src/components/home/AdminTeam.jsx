export default function AdminTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Our Administrative Team</h2>
        <p className="text-2xl text-gray-600 mb-16">The servant leaders guiding our vision.</p>

        <div className="flex flex-wrap justify-center gap-10">
          
          <article className="w-64">
            <img src="/assets/Director.webp" className="w-56 h-56 mx-auto rounded-full object-cover border-4 border-gray-100 shadow-lg mb-4" alt="Sarah Kasajja" />
            <h3 className="text-2xl font-bold text-gray-500">Sarah Kasajja</h3>
            <p className="text-lg text-gray-400 font-medium">Director</p>
          </article>

          <article className="w-64">
            <img src="/assets/brian.png" className="w-56 h-56 mx-auto rounded-full object-cover border-4 border-gray-100 shadow-lg mb-4" alt="Brian Muwulya" />
            <h3 className="text-2xl font-bold text-gray-500">Brian Muwulya</h3>
            <p className="text-lg text-gray-400 font-medium">Director</p>
          </article>

          <article className="w-64">
            <img src="/assets/DOS.webp" className="w-56 h-56 mx-auto rounded-full object-cover border-4 border-gray-100 shadow-lg mb-4" alt="Muhindo Peter" />
            <h3 className="text-2xl font-bold text-gray-500">Muhindo Peter</h3>
            <p className="text-lg text-gray-400 font-medium">Director of Studies</p>
          </article>

        </div>
      </div>
    </section>
  );
}
