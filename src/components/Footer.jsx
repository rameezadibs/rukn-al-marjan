import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-evergreen text-white relative overflow-hidden select-none">
      {/* Decorative top border line with subtle mint gradient */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent" />

      {/* ============================================================== */}
      {/* MAIN FOOTER NAVIGATION COLUMNS                                 */}
      {/* ============================================================== */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" onClick={scrollToTop} className="inline-block select-none mb-6">
                <div className="bg-white/95 rounded-xl px-3.5 py-2 inline-flex items-center shadow-sm hover:bg-white transition-colors">
                  <img
                    src="/logo.png"
                    alt="Rukn Al Marjan"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              </Link>
              <p className="text-[15px] sm:text-base text-white/70 leading-relaxed font-normal max-w-sm mb-6">
                Rukn Al Marjan is a premier trading and corporate merchandise supplier in the UAE. Delivering high-calibre promotional items, executive writing instruments, and dependable commercial solutions.
              </p>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/80">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>Showroom Open Monday – Saturday</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-wider-luxury text-mint uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-mint/70 rounded-full" />
              <span>NAVIGATION</span>
            </h4>
            <ul className="space-y-3.5 text-[15px] font-normal text-white/70">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-mint transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-mint transition-colors">About Rukn Al Marjan</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mint transition-colors">Promotional Categories</Link>
              </li>
              <li>
                <Link to="/#brands" className="hover:text-mint transition-colors">Featured Brands</Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-mint transition-colors">Showroom & Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Ranges (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-wider-luxury text-mint uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-mint/70 rounded-full" />
              <span>POPULAR RANGES</span>
            </h4>
            <ul className="space-y-3.5 text-[15px] font-normal text-white/70">
              <li>
                <Link to="/products?category=Tech%20Accessories" className="hover:text-mint transition-colors">Tech Gifts & Accessories</Link>
              </li>
              <li>
                <Link to="/products?category=Pens" className="hover:text-mint transition-colors">Maxema & Executive Pens</Link>
              </li>
              <li>
                <Link to="/products?category=Eco-friendly" className="hover:text-mint transition-colors">Sustainable & Eco Merchandise</Link>
              </li>
              <li>
                <Link to="/products?category=Bottles" className="hover:text-mint transition-colors">Premium Drinkware & Bottles</Link>
              </li>
              <li>
                <Link to="/products?category=Gift%20Sets" className="hover:text-mint transition-colors">Luxury Corporate Gift Sets</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom & Direct Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-wider-luxury text-mint uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-mint/70 rounded-full" />
              <span>SHOWROOM & CONTACT</span>
            </h4>
            <ul className="space-y-4 text-[14.5px] font-normal text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mint flex-shrink-0 mt-1" />
                <span>Showroom & Logistics Center, Commercial District, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-mint flex-shrink-0" />
                <a href="tel:+97140000000" className="hover:text-mint transition-colors">+971 4 000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-mint flex-shrink-0" />
                <a href="mailto:info@xyzcompany.com" className="hover:text-mint transition-colors">info@xyzcompany.com</a>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/60 leading-relaxed">
                  Mon – Fri: 8:30 AM – 6:30 PM<br />
                  Sat: 9:00 AM – 2:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM LEGAL BAR & BACK-TO-TOP                                 */}
      {/* ============================================================== */}
      <div className="border-t border-white/[0.08] bg-[#0A132B]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-[13px] text-white/50 tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} Rukn Al Marjan. All rights reserved. Professional Product Supply & Corporate Merchandise.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors">
              Terms of Supply
            </span>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-xs font-medium text-mint hover:text-soft-mint transition-colors ml-2 py-1 px-2 rounded focus:outline-none"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
