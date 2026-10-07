import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BrandMarquee from './BrandMarquee';

export default function FeaturedBrands() {
  return (
    <section
      id="brands"
      className="relative w-full overflow-hidden bg-evergreen text-white py-10 sm:py-12 lg:py-16 select-none"
      style={{
        background:
          'radial-gradient(circle at 18% 25%, #203565 0%, #1B2B52 40%, #0F1C3F 85%, #0A132B 100%)',
      }}
      aria-label="Featured Brand Partners"
    >
      {/* ============================================================== */}
      {/* CREATIVE BACKGROUND ELEMENTS & OUTLINE TYPOGRAPHY              */}
      {/* ============================================================== */}

      {/* Giant Outline Typography "BRANDS" in Background */}
      <div
        className="absolute -bottom-10 -right-10 lg:right-6 pointer-events-none select-none z-0 hidden sm:block opacity-[0.035] leading-none"
        aria-hidden="true"
      >
        <span
          className="text-[140px] sm:text-[210px] lg:text-[270px] xl:text-[320px] font-black tracking-widest text-transparent uppercase font-sans"
          style={{
            WebkitTextStroke: '1.5px #FFFFFF',
          }}
        >
          BRANDS
        </span>
      </div>

      {/* Large subtle ambient geometric rings for architectural depth */}
      <div
        className="absolute top-1/2 -left-48 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03] pointer-events-none z-0 hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-28 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-mint/[0.04] pointer-events-none z-0 hidden lg:block"
        aria-hidden="true"
      />

      {/* Subtle top transition accent border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-mint/20 to-transparent" />

      {/* ============================================================== */}
      {/* MAIN CONTENT CONTAINER                                         */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top Decorative Label */}
        <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
          <span className="w-8 sm:w-10 h-[2px] bg-mint rounded-full inline-block" />
          <span className="text-xs sm:text-[13px] font-semibold tracking-wider-luxury text-mint uppercase">
            BRANDS WE WORK WITH
          </span>
        </div>

        {/* Two-Column Editorial + Marquee Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* ========================================================== */}
          {/* LEFT COLUMN: Editorial Heading & Context (~38% width)      */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center lg:pr-8 xl:pr-10 lg:border-r lg:border-white/[0.12]"
          >
            {/* Main Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[68px] font-bold tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="text-white block">Featured</span>
              <span className="text-mint block">Brands.</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-[18px] text-white/80 leading-relaxed font-normal max-w-[430px] mb-8 sm:mb-10 text-pretty">
              Discover a curated selection of trusted brands bringing together
              quality, design and products made to leave a lasting impression.
            </p>

            {/* Subtle Minimal Text Link CTA */}
            <div>
              <a
                href="#products"
                className="group inline-flex items-center gap-2.5 text-mint hover:text-soft-mint text-base font-medium tracking-wide transition-colors py-1 relative"
              >
                <span>Explore our products</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1.5" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-mint/40 group-hover:bg-mint transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: Dual Moving Brand Tile Marquee (~62% width)  */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full overflow-hidden"
          >
            <BrandMarquee />
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM TRUST STATEMENT                                         */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 sm:pt-10 border-t border-white/[0.12] text-center">
          <p className="text-xs sm:text-[13px] font-medium tracking-[0.24em] text-white/70 uppercase">
            <span>QUALITY PRODUCTS</span>
            <span className="mx-3 text-mint/80">•</span>
            <span>TRUSTED BRANDS</span>
            <span className="mx-3 text-mint/80">•</span>
            <span>PROFESSIONAL SOLUTIONS</span>
          </p>
        </div>
      </div>
    </section>
  );
}
