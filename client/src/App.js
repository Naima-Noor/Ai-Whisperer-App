import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Singup';
import Login from './components/Login';
import TextAnalysis from './components/TextAnalysis/TextAnalysis';
import Header from './components/Header-Footer/Header';
import Footer from './components/Header-Footer/Footer';
import Home from './Pages/Home';
import ContactSection from './Pages/Contact';
import About from './Pages/About';
import Pricing from './Pages/Pricing';
import AIContent from './Pages/AIContent';
import ServicesPage from './Pages/Services';
import PrivacyPolicy from './components/Singup/privacypolicy';
import TermsModal from './components/Singup/TermsModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const user = localStorage.getItem('token');

    return (

        <div>
            <ScrollToTop />
            <Header />
            <Routes>
                {user ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Home />} />
                )}

                {/* Always accessible routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/text-analysis" element={<TextAnalysis />} />
                <Route path="/ContactSection" element={<ContactSection />} />
                <Route path="/About" element={<About />} />
                <Route path="/Pricing" element={<Pricing />} />
                <Route path="/ServicesPage" element={<ServicesPage />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/TermsModal" element={<TermsModal />} />
                <Route path="/AIContent" element={<AIContent />} />
            </Routes>
            <Footer />
        </div>

    );
}

export default App;
