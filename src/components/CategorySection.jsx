import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

export default function CategorySection() {
  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-[#FAF9F5] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 15%, #FFFFFF 0%, #FAF8F3 60%, #F5F3EC 100%)',
      }}
      aria-label="Promotional Gifts Categories"
    >
      {/* ============================================================== */}
      {/* SECTION CONTENT CONTAINER                                      */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-[13px] font-semibold tracking-wider-luxury text-forest uppercase">
              EXPLORE OUR RANGE
            </span>
          </motion.div>

          {/* Editorial Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[54px] font-bold tracking-tight leading-[1.12]"
          >
            <span className="text-charcoal">Promotional Gifts </span>
            <span className="text-forest">Categories</span>
          </motion.h2>

          {/* Tiny Centered Forest-Green Decorative Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="w-8 h-[2px] bg-forest rounded-full mx-auto my-4 sm:my-5"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base sm:text-[17.5px] text-charcoal/75 leading-relaxed max-w-[650px] mx-auto text-pretty font-normal"
          >
            Discover a wide range of premium promotional gifts for every occasion, brand and budget.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* CIRCULAR CATEGORIES GRID                                       */}
        {/* Mobile: 4 cols | Tablet: 4-6 cols | Desktop: 8 cols            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-y-7 sm:gap-y-9 gap-x-3 sm:gap-x-5 lg:gap-x-6 items-start justify-items-center">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
