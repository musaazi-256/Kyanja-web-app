import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
        setIsError(true);
        setMessage('Please enter your email.');
        return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        setIsError(true);
        setMessage('Please enter a valid email address.');
        return;
    }
    
    // Simulate API call
    setIsError(false);
    setMessage('Thanks — you are subscribed!');
    setEmail('');
  };

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">

          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-white p-1">
                <img src="/assets/logo.svg" alt="Kyanja Junior School" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-lg lg:text-2xl tracking-tight">Kyanja Junior School</span>
            </Link>

            <p className="text-sm lg:text-base text-white/90 max-w-md">
              A caring school community focused on academic excellence, character formation and holistic development.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="mt-2 sm:mt-4 flex flex-col gap-2 max-w-md">
              <label htmlFor="newsletter-email" className="text-sm lg:text-base font-semibold">Subscribe to our News Letter</label>
              <div className="flex gap-2">
                <input 
                  id="newsletter-email" 
                  type="email" 
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 text-sm lg:text-base rounded-md border border-white/20 bg-white/5 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button type="submit" className="px-3 py-2 rounded-md bg-white text-primary font-semibold text-sm lg:text-base shadow-sm hover:brightness-95">
                  Subscribe
                </button>
              </div>
              <div className={`text-sm h-6 mt-1 ${isError ? 'text-red-400' : 'text-green-400'}`}>
                {message}
              </div>
            </form>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm lg:text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3 text-sm lg:text-base">
              <Link to="/" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5">
                <span>Home</span>
              </Link>
              <Link to="/circulars" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5">
                <span>Circulars</span>
              </Link>
              <Link to="/events" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5">
                <span>Events</span>
              </Link>
              <Link to="/schedule" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5">
                <span>Schedule</span>
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm lg:text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm lg:text-base text-white/90">
              <div className="flex items-start gap-3">
                <span>📧</span>
                <div>admin@kjsch.com</div>
              </div>
              <div className="flex items-start gap-3">
                <span>📞</span>
                <div>+256 772 493 267<br/>+256 702 860 382<br/>+256 774 442 084</div>
              </div>
              <div className="flex items-start gap-3">
                <span>📍</span>
                <div>700m from Kensington Luxury Heights, Kampala</div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
               {['facebook', 'instagram', 'tiktok', 'twitter-x', 'whatsapp', 'youtube'].map(social => (
                 <a key={social} href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                   <img src={`/assets/${social}.svg`} alt={social} className="w-5 h-5" /> 
                 </a>
               ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3 text-sm lg:text-base text-white/90">
          <div>© {new Date().getFullYear()} Kyanja Junior School. All rights reserved.</div>
          <div>Designed by <a href="#" className="text-white underline">Malaika Kreatives</a></div>
        </div>
      </div>
    </footer>
  );
}
