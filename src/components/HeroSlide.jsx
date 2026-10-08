import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

export default function HeroSlide({ slide, isActive }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 ${
        isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      {/* Clean Full-Width Banner Image */}
      <div className="absolute inset-0 w-full h-full bg-[#FAFAF7]">
        <img
          src={slide.image}
          alt={slide.imageAlt || slide.titleWhite || 'Banner'}
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
        />
      </div>

      {/* Subtle Gradient Scrim for Legibility */}
      {(slide.titleWhite || slide.titleAccent) && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 pointer-events-none" />
      )}

      {/* Content Overlay */}
      {(slide.titleWhite || slide.titleAccent || slide.eyebrow) && (
        <div className="relative h-full max-w-7xl mx-auto pl-12 sm:pl-16 md:pl-20 lg:pl-24 pr-12 sm:pr-16 md:pr-20 lg:pr-24 flex flex-col justify-center">
          <motion.div
            key={`slide-content-${slide.id}-${isActive}`}
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="max-w-xl lg:max-w-2xl py-4 sm:py-6 text-left"
          >
            {/* Location & Status Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
              {slide.location && (
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-mint shadow-xs">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-mint" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{slide.location}</span>
                </div>
              )}

              {slide.statusBadge && (
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-mint text-white text-[10px] sm:text-[11px] font-bold tracking-wide uppercase shadow-xs">
                  <span>{slide.statusBadge}</span>
                </div>
              )}
            </motion.div>

            {/* Eyebrow */}
            {slide.eyebrow && !slide.statusBadge && (
              <motion.div variants={itemVariants} className="mb-2 sm:mb-3 flex items-center gap-2">
                <span className="inline-block w-4 sm:w-6 h-[2px] bg-mint rounded-full" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider-luxury text-soft-mint uppercase">
                  {slide.eyebrow}
                </span>
              </motion.div>
            )}

            {/* Editorial Headline */}
            {(slide.titleWhite || slide.titleAccent) && (
              <motion.h1
                variants={itemVariants}
                className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-tight mb-2 sm:mb-4 font-sans"
              >
                <span>{slide.titleWhite}</span>{' '}
                <span className="text-mint font-bold drop-shadow-sm block sm:inline">
                  {slide.titleAccent}
                </span>
              </motion.h1>
            )}

            {/* Supporting Paragraph */}
            {slide.description && (
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal max-w-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3"
              >
                {slide.description}
              </motion.p>
            )}

            {/* CTA Buttons */}
            {(slide.primaryCTA || slide.secondaryCTA) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2.5 sm:gap-5"
              >
                {slide.primaryCTA && (
                  <a
                    href={slide.primaryHref || '/#contact'}
                    className="group inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-mint text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-[#0092cb] transition-all duration-200"
                  >
                    <span>{slide.primaryCTA}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                )}

                {slide.secondaryCTA && (
                  <a
                    href={slide.secondaryHref || '/products'}
                    className="group inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white font-semibold text-xs sm:text-sm shadow-md backdrop-blur-md transition-all duration-200"
                  >
                    <span>{slide.secondaryCTA}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
