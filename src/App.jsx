import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Placeholder Pages
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-[50vh] text-center">
    <div>
        <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
        <p className="text-xl text-gray-600">Coming Soon</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Placeholder title="About Us" />} />
        <Route path="admissions" element={<Placeholder title="Admissions" />} />
        <Route path="gallery" element={<Placeholder title="Gallery" />} />
        <Route path="contact" element={<Placeholder title="Contact Us" />} />
        <Route path="programs/nursery" element={<Placeholder title="Nursery Program" />} />
        <Route path="programs/primary" element={<Placeholder title="Primary Program" />} />
        <Route path="programs/clubs" element={<Placeholder title="School Clubs" />} />
        <Route path="circulars" element={<Placeholder title="Circulars" />} />
        <Route path="events" element={<Placeholder title="Events" />} />
        <Route path="schedule" element={<Placeholder title="Schedule" />} />
      </Route>
    </Routes>
  );
}

export default App;
