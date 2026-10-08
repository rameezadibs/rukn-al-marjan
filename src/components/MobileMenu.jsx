import React, { useEffect } from 'react';
import { X, ArrowRight, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const POPULAR_MOBILE_CATEGORIES = [
  {
    name: 'Cups',
    image: '/home/5.png',
  },
  {
    name: 'Powerbanks',
    image: '/home/6.png',
  },
  {
    name: 'Sadu Design',
    image: '/home/2.png',
  },
  {
    name: 'Tech Accessories',
    image: '/home/7.png',
  },
];

export default function MobileMenu({ isOpen, onClose, navItems, onSelect }) {
  // Prevent body scrolling when full screen menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-[#0F1C3F] text-white flex flex-col justify-between overflow-y-auto md:hidden select-none"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, #203565 0%, #1B2B52 45%, #0F1C3F 90%)',
          }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link
              to="/"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/95 rounded-xl px-3 py-1.5 inline-flex items-center shadow-sm"
            >
              <img
                src="/logo.png"
                alt="Rukn Al Marjan"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Main Body Content */}
          <div className="px-6 py-8 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
            {/* Nav Items List */}
            <div className="space-y-4 mb-8">
              {navItems.map((item, idx) => {
                const isActive = item.isActive;
                return (
                  <motion.div key={item.label} variants={itemVariants}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      className="group w-full py-3 text-left flex items-center justify-between border-b border-white/10 focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-mint/80 font-bold">
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                            isActive
                              ? 'text-mint'
                              : 'text-white/90 group-hover:text-mint'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                        )}
                        <ArrowRight className="w-5 h-5 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-mint" />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Popular Categories Grid */}
            <motion.div variants={itemVariants} className="pt-2 pb-4">
              <span className="text-[11px] font-semibold tracking-wider-luxury text-mint/90 uppercase block mb-3">
                POPULAR CATEGORIES
              </span>
              <div className="grid grid-cols-4 gap-3">
                {POPULAR_MOBILE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={onClose}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-white/10 p-0.5 group-hover:border-mint transition-colors">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] text-white/80 font-medium mt-1.5 truncate w-full group-hover:text-mint transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer Action Area */}
          <div className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="max-w-lg mx-auto w-full space-y-3">
              <button
                type="button"
                onClick={() => {
                  onSelect({ label: 'Contact', path: '/#contact', isPage: false });
                  onClose();
                }}
                className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-mint text-white font-semibold text-base shadow-lg hover:bg-[#0092cb] active:scale-[0.98] transition-all duration-200"
              >
                <Phone className="w-4 h-4 stroke-[2.2]" />
                <span>Request a Quote / Contact Us</span>
              </button>

              <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-mint" />
                  <span>Showroom • Dubai, UAE</span>
                </span>
                <a
                  href="tel:+97140000000"
                  className="hover:text-mint transition-colors font-medium"
                >
                  +971 4 000 0000
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
