import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import BookingFlow from './pages/BookingFlow';
import BusinessDashboard from './pages/BusinessDashboard';
import AboutUs from './pages/AboutUs';
import VisionMission from './pages/VisionMission';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/book" element={<BookingFlow />} />
              <Route path="/dashboard" element={<BusinessDashboard />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/vision" element={<VisionMission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
