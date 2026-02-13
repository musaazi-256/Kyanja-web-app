import { useState } from 'react';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    { title: 'Admission Form 2025', category: 'admission', size: '1.2 MB', bg: 'bg-blue-500', color: 'text-blue-600', icon: '/assets/form.svg' },
    { title: 'Term 1 Circular 2025', category: 'circular', size: '450 KB', bg: 'bg-purple-500', color: 'text-purple-600', icon: '/assets/circular.svg' },
    { title: 'P.3 - P.7 Timetable', category: 'timetable', size: '800 KB', bg: 'bg-green-500', color: 'text-green-600', icon: '/assets/time-table.svg' },
    { title: 'Sports Day Requirements', category: 'circular', size: '200 KB', bg: 'bg-orange-500', color: 'text-orange-600', icon: '/assets/circular.svg' },
  ];

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="mx-auto px-4 max-w-[1400px]">

        <header className="text-center mb-16">
          <h2 className="font-extrabold text-[3rem] sm:text-[4rem] lg:text-[6rem] text-primary leading-[1.2]">
            Resources & Downloads
          </h2>
          <p className="mt-4 text-text-secondary text-xl sm:text-2xl lg:text-3xl max-w-[900px] mx-auto">
            Search, filter, and download admission forms, circulars, and timetables
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 max-w-[1000px] mx-auto bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {['all', 'admission', 'circular', 'timetable'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full sm:text-2xl font-light transition-all duration-200 capitalise ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-auto group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="search" 
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="relative bg-gray-100/50 rounded-2xl p-2 sm:p-4 border border-gray-200">
          <div className="flex flex-wrap justify-center gap-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredResources.map((res, idx) => (
              <article key={idx} className="group bg-white hover:bg-blue-50/30 border border-gray-100 hover:border-primary rounded-xl p-4 flex flex-row items-center gap-4 w-full md:w-[300px] shrink-0 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className={`w-12 h-12 rounded-lg ${res.bg} text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                   <img src={res.icon} className="w-6 h-6" alt="Icon" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-primary transition-colors">{res.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">PDF • {res.size}</p>
                </div>
                <a href="#" download className="flex-shrink-0 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:brightness-110 active:scale-95 transition-all">
                  Download
                </a>
              </article>
            ))}

            {filteredResources.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-gray-500 font-medium">No resources found matching your search.</p>
                    <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="mt-2 text-primary text-sm font-semibold hover:underline">Clear filters</button>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
