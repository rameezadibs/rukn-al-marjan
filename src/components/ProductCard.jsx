import React, { useState } from 'react';
import { ArrowRight, Eye, ImageOff } from 'lucide-react';
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
              className="w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
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
          <button
            type="button"
            onClick={() => onQuoteRequest(product)}
            className="group/btn flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-forest/60 text-forest hover:bg-forest hover:text-white font-medium text-sm transition-all duration-200"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
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
      {/* Upper Product Image Area */}
      <div className="relative w-full aspect-[4/3.2] bg-[#F4F3EF] overflow-hidden flex items-center justify-center">
        {/* Optional Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
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

        {/* Gradient Bottom Vignette for text contrast on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Desktop Quick View Overlay Button */}
        <div className="absolute inset-x-0 bottom-4 z-10 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails(product);
              else onQuoteRequest(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-charcoal border border-charcoal/10 text-xs font-semibold shadow-md hover:bg-forest hover:text-white transition-all duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
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

        {/* Request a Quote Full-Width Button */}
        <button
          type="button"
          onClick={() => onQuoteRequest(product)}
          className="group/btn relative flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full border border-forest/60 bg-transparent text-forest hover:bg-forest hover:text-white font-medium text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-forest/30"
          aria-label={`Request a quote for ${product.name}`}
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

