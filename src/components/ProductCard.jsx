import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80";

export default function ProductCard({ product, onQuoteRequest, onViewDetails, viewMode = 'grid' }) {
  const [imgError, setImgError] = useState(false);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'NEW':
        return 'bg-forest text-white';
      case 'POPULAR':
        return 'bg-evergreen text-white';
      case 'ECO':
        return 'bg-soft-mint text-forest font-bold';
      case 'LIMITED':
        return 'bg-[#E5E2D9] text-charcoal font-semibold';
      default:
        return 'bg-forest text-white';
    }
  };

  const imageSrc = imgError || !product?.image ? DEFAULT_FALLBACK_IMAGE : product.image;

  if (viewMode === 'compact') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-[20px] bg-white border border-[#E7E8E4] shadow-xs hover:border-forest/30 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Compact Image */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[14px] bg-[#F4F3EF] p-2 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={imageSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-1 rounded-[10px] group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {product.badge && (
              <span
                className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider z-10 ${getBadgeStyle(
                  product.badge
                )}`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider-luxury text-muted-grey block mb-1">
              {product.category}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-charcoal leading-snug group-hover:text-forest transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-forest inline-block" />
              <span className="text-xs text-forest font-medium">
                {product.availability || 'In Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0">
          <a
            href={`https://wa.me/971543808614?text=${encodeURIComponent(`Hello Rukn Al Marjan, I would like to request a quote for ${product.name} (${product.category}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-forest/60 text-forest hover:bg-forest hover:text-white font-medium text-sm transition-all duration-200"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between rounded-[22px] bg-white border border-[#E7E8E4] shadow-xs hover:border-forest/30 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
    >
      {/* Upper Product Image Area: 1:1 Square to match 600x600 photo dimensions */}
      <div className="relative w-full aspect-square bg-[#F5F5F3] overflow-hidden flex items-center justify-center">
        {/* Optional Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Lower Details Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Primary Category Label */}
          <span className="text-[11px] font-semibold uppercase tracking-wider-luxury text-muted-grey block mb-1.5 truncate">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg sm:text-[19px] font-semibold text-charcoal leading-snug line-clamp-2 min-h-[46px] group-hover:text-forest transition-colors duration-200">
            {product.name}
          </h3>

          {/* Stock / Availability Status */}
          <div className="flex items-center gap-2 mt-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-forest inline-block" />
            <span className="text-xs font-medium text-forest/90">
              {product.availability || 'In Stock'}
            </span>
          </div>
        </div>

        {/* Request a Quote Full-Width WhatsApp Button */}
        <a
          href={`https://wa.me/971543808614?text=${encodeURIComponent(`Hello Rukn Al Marjan, I would like to request a quote for ${product.name} (${product.category}).`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full border border-forest/60 bg-transparent text-forest hover:bg-forest hover:text-white font-medium text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-forest/30 text-center"
          aria-label={`Request a quote for ${product.name} on WhatsApp`}
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

