import React from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ isOpen, onClose, navItems, onSelect }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-x-0 top-[96px] z-50 bg-warm-white/98 backdrop-blur-md border-b border-charcoal/10 shadow-xl px-6 py-8 md:hidden"
        >
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => {
              const isActive = item.isActive;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className={`text-left text-lg font-medium tracking-wide transition-colors py-2 flex items-center justify-between border-b border-charcoal/5 ${
                    isActive
                      ? 'text-forest font-semibold'
                      : 'text-charcoal/80 hover:text-forest'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-forest" />
                  )}
                </button>
              );
            })}

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  onSelect({ label: 'Contact', path: '/#contact', isPage: false });
                  onClose();
                }}
                className="group flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-forest text-white font-medium text-base shadow-sm hover:bg-[#084e40] active:scale-[0.99] transition-all duration-200"
              >
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
