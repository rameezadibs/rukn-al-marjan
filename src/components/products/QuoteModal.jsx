import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    quantity: '100',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when opening a new product
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulation of quote submission and WhatsApp direct redirect
    setSubmitted(true);
    const textMsg = `Hello Rukn Al Marjan, I would like to request a quote:%0A%0A*Product:* ${product?.name || 'Corporate Merchandise'} (${product?.category || ''})%0A*Name:* ${formData.fullName}%0A*Company:* ${formData.companyName || 'N/A'}%0A*Quantity:* ${formData.quantity} units%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Notes:* ${formData.message || 'None'}`;
    setTimeout(() => {
      window.open(`https://wa.me/971543808614?text=${textMsg}`, '_blank');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-evergreen/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-warm-white rounded-[26px] border border-charcoal/10 shadow-2xl overflow-hidden z-10 my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between px-6 sm:px-8 pt-7 pb-4 border-b border-charcoal/5">
              <div>
                <span className="text-[11px] font-semibold tracking-wider-luxury text-forest uppercase">
                  OFFICIAL INQUIRY
                </span>
                <h3 id="quote-modal-title" className="text-2xl sm:text-[26px] font-bold text-charcoal">
                  Request a Quote
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-forest/30"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              {submitted ? (
                /* Success State */
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-soft-mint text-forest flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                  </div>
                  <h4 className="text-2xl font-bold text-charcoal mb-2">
                    Quote Request Received
                  </h4>
                  <p className="text-muted-grey text-base max-w-sm mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-charcoal">{formData.fullName}</span>. Your quote inquiry for <span className="font-semibold text-forest">{product?.name}</span> has been dispatched to our enterprise sourcing team.
                  </p>
                  <p className="text-xs text-charcoal/50 flex items-center gap-1.5 mb-8">
                    <ShieldCheck className="w-4 h-4 text-forest" />
                    <span>A dedicated consultant will respond within 2-4 business hours.</span>
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-full bg-forest text-white font-medium text-sm hover:bg-[#142347] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Product Preview Snippet */}
                  {product && (
                    <div className="flex items-center gap-4 p-3.5 rounded-[18px] bg-[#F4F3EF] border border-charcoal/5">
                      <div className="w-14 h-14 rounded-[12px] bg-white p-1 flex-shrink-0 border border-charcoal/5 overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80";
                          }}
                          className="w-full h-full object-contain p-0.5 rounded-[8px]"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10.5px] uppercase font-semibold tracking-wider text-muted-grey block">
                          {product.category}
                        </span>
                        <h4 className="text-sm font-semibold text-charcoal truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs text-forest font-medium flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest inline-block" />
                          {product.availability || 'In Stock'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                        Full Name <span className="text-forest">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Al Mansoori"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-charcoal placeholder-charcoal/30 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-charcoal/15 focus:border-forest'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Apex Global Trading"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-charcoal/15 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                        Work Email <span className="text-forest">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tariq@apex.ae"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-charcoal placeholder-charcoal/30 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-charcoal/15 focus:border-forest'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                        Phone Number <span className="text-forest">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-charcoal placeholder-charcoal/30 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-charcoal/15 focus:border-forest'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                      Estimated Quantity (Units)
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:border-forest transition-colors"
                    >
                      <option value="50">50 – 100 units</option>
                      <option value="100">100 – 250 units</option>
                      <option value="250">250 – 500 units</option>
                      <option value="500">500 – 1,000 units</option>
                      <option value="1000">1,000 – 5,000 units</option>
                      <option value="5000">5,000+ units (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/80 mb-1.5">
                      Branding Specifications or Inquiries
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Add branding requirements (e.g. laser engraving, screen print, custom packaging deadline)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-charcoal/15 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-forest text-white font-semibold text-base shadow-sm hover:bg-[#142347] active:scale-[0.99] transition-all duration-200"
                    >
                      <span>Send Quote Request</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="text-[11.5px] text-center text-muted-grey mt-2.5">
                      No commitment required. Custom corporate pricing provided with bulk tier breakdown.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
