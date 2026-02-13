import { useEffect, useRef } from 'react';

export default function CoreValues() {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    elementsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const values = [
    { title: 'Faith', color: '#6D28D9', icon: '/assets/faith-201.png', desc: 'Through encouraging a personal relationship with God and integrating prayer and religious teachings into daily school routine.' },
    { title: 'Community', color: '#16A34A', icon: '/assets/community-203.png', desc: 'The school builds a strong sense of community by fostering trust, participation, collaboration and friendships amongst pupils, staff and the community.' },
    { title: 'Excellence', color: '#F59E0B', icon: '/assets/excellence-202.png', desc: 'We strive for academic and personal excellence through the delivery of a curriculum that fosters creativity, curiosity, ambition and the development of pupils’ talents.' },
    { title: 'Responsibility', color: '#1E293B', icon: '/assets/responsibility-206.png', desc: 'Our pupils are taught stewardship for their actions, fulfilling one’s duties and making decisions in ethical and considerate manners enabling them build a character of dependability and accountability.' },
    { title: 'Respect', color: '#0EA5E9', icon: '/assets/respect-204.png', desc: 'We foster respect for oneself, others, rules and the environment through encouraging empathy, kindness and equality for all our pupils.' },
    { title: 'Resilience', color: '#DC2626', icon: '/assets/resilience-205.png', desc: 'Our pupils are taught to be courageous, motivated and determined when faced with life’s challenges to enable them recover from setbacks and adapt to change with a positive attitude.' },
  ];

  return (
    <section className="w-full sm:p-40 bg-gray-50" id="core-values">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Our Core Values</h2>
        <p className="text-2xl text-gray-600 mb-16">The principles that shape our learners and guide our community every day.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-black/60 text-center">
          {values.map((val, idx) => (
            <div 
              key={val.title}
              ref={addToRefs}
              className={`fade-up core-card flex flex-col items-center gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`w-16 h-16 grid place-items-center rounded-xl shadow-md`} style={{ backgroundColor: val.color }}>
                <img src={val.icon} alt={`${val.title} icon`} className="w-10 h-10 object-contain brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-bold text-4xl sm:text-4xl mb-1" style={{ color: val.color }}>{val.title}</h3>
                <p className="space-y-6 text-2xl text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
