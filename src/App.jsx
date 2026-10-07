import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-warm-white selection:bg-mint selection:text-white">
        {/* Premium Spacious Navbar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Executive Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
