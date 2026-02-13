import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="font-sans text-gray-900 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[140px]"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
