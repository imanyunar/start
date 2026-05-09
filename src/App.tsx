import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import InnovationPage from './pages/InnovationPage';
import ContactPage from './pages/ContactPage';
import LabPage from './pages/LabPage';
import SmartFlowPage from './pages/SmartFlowPage';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/smartflow');

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {!isAppRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/laboratory" element={<LabPage />} />
          <Route path="/smartflow" element={<SmartFlowPage />} />
        </Routes>
      </main>
      {!isAppRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
