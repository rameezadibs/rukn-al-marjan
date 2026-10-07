import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isProducts = location.pathname === '/products';

  const navItems = [
    { label: 'Home', path: '/', isPage: true, isActive: isHome },
    { label: 'About', path: '/#about', isPage: false, isActive: false },
    { label: 'Products', path: '/products', isPage: true, isActive: isProducts },
    { label: 'Contact', path: '/#contact', isPage: false, isActive: false },
  ];

  const handleNavClick = (item) => {
    if (item.isPage) {
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (isHome) {
        const hash = item.path.replace('/', '');
        const elem = document.querySelector(hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(item.path);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-warm-white border-b border-charcoal/5 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[100px] flex items-center justify-between">
        {/* Left: Text-based Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center select-none py-2"
            aria-label="Rukn Al Marjan Home"
          >
            <img
              src="/logo.png"
              alt="Rukn Al Marjan"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain max-w-[220px] transition-opacity group-hover:opacity-90"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 lg:space-x-12" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = item.isActive;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-2.5 text-[15px] tracking-wide transition-colors duration-200 group focus:outline-none ${
                  isActive
                    ? 'text-forest font-semibold'
                    : 'text-charcoal/80 font-normal hover:text-forest'
                }`}
              >
                <span>{item.label}</span>

                {/* Animated underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-forest rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => {
              if (!isHome) {
                e.preventDefault();
                navigate('/#contact');
              }
            }}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-forest text-white text-[15px] font-medium tracking-wide shadow-sm hover:bg-[#094d3f] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            <Phone className="w-4 h-4 text-mint/90 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-rotate-6" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-charcoal hover:text-forest hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-forest/20"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.75]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.75]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onSelect={(item) => handleNavClick(item)}
      />
    </header>
  );
}
