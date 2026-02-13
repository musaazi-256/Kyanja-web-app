import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000]">
      {/* Navbar */}
      <nav className="bg-primary text-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-[3rem] tracking-wide">Kyanja Junior School</span>
          </Link>

          {/* Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-3xl hover:text-yellow-300 focus:outline-none"
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-[1.5rem] font-medium">
            <li><Link to="/" className="hover:bg-accent rounded-lg px-2 py-1">Home</Link></li>
            <li><Link to="/gallery" className="hover:bg-accent rounded-lg px-2 py-1">Gallery</Link></li>
            <li><Link to="/admissions" className="hover:bg-accent rounded-lg px-2 py-1">Admissions</Link></li>

            <li className="relative group" 
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}>
              <div className="flex items-center gap-1 cursor-pointer hover:bg-accent rounded-lg px-2 py-1">
                School Programs <span className="text-xs">▼</span>
              </div>
              <ul className={`absolute left-0 top-full bg-white text-black rounded-md shadow-lg w-48 transition duration-150 py-2 z-[9999] ${isProgramsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <li><Link to="/programs/nursery" className="block px-4 py-2 hover:bg-gray-100">Nursery</Link></li>
                <li><Link to="/programs/primary" className="block px-4 py-2 hover:bg-gray-100">Primary</Link></li>
                <li><Link to="/programs/clubs" className="block px-4 py-2 hover:bg-gray-100">Clubs</Link></li>
              </ul>
            </li>

            <li><Link to="/about" className="hover:bg-accent rounded-lg px-2 py-1">About</Link></li>
          </ul>

          {/* Desktop CTA */}
          <Link to="/contact" className="hidden md:inline-block px-6 py-2 rounded-lg font-semibold tracking-wide text-white border border-white/60 backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.4)] hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,255,255,0.8)] transition duration-300">
            CONTACT US
          </Link>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 text-white pt-24 space-y-6 text-xl font-semibold z-[2000] transition-all backdrop-blur-xl bg-primary/95 border border-white/10 shadow-lg flex flex-col items-center">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-4xl p-2">
            ✕
          </button>

          <div className="flex flex-col items-center space-y-6">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Home</Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Gallery</Link>
            <Link to="/admissions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Admissions</Link>

            <details className="text-center w-full max-w-[200px]">
              <summary className="cursor-pointer hover:text-yellow-300 list-none">School Programs ▼</summary>
              <div className="flex flex-col mt-2 space-y-2 text-lg">
                <Link to="/programs/nursery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Nursery</Link>
                <Link to="/programs/primary" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Primary</Link>
                <Link to="/programs/clubs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">Clubs</Link>
              </div>
            </details>

            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 block">About</Link>
          </div>

          <div className="flex flex-col items-center gap-4 mt-6">
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 rounded-lg font-semibold tracking-wide text-white border border-white/50 backdrop-blur-lg shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:bg-white/10 transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      )}

      {/* Glass Admissions Ticker */}
      <div className="backdrop-blur-md bg-white/30 text-gray-900/80 shadow-xl py-2 overflow-hidden border-b border-white/20 z-[999] w-full">
        <div className="animate-marquee whitespace-nowrap text-xl sm:text-2xl md:text-2xl font-medium tracking-wide">
          📢 Admissions are still ongoing at school on week days — Enroll Your Child Today ⭐ Excellence • Discipline • Leadership 🏆
        </div>
      </div>
    </header>
  );
}
