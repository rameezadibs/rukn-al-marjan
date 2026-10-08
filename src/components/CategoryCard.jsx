import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DEFAULT_CATEGORY_FALLBACK = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80";

export default function CategoryCard({ category, index }) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError || !category.image ? DEFAULT_CATEGORY_FALLBACK : category.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 11) * 0.035, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center"
    >
      <Link
        to={`/products?category=${encodeURIComponent(category.name)}`}
        className="group flex flex-col items-center select-none cursor-pointer focus:outline-none"
        aria-label={`Browse ${category.name} category`}
      >
        {/* Pure Circular Image */}
        <div className="w-[76px] h-[76px] sm:w-26 sm:h-26 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-xl border border-charcoal/10 bg-[#F4F3EF] transition-all duration-300 ease-out group-hover:-translate-y-1.5 flex items-center justify-center flex-shrink-0">
          <img
            src={imgSrc}
            alt={category.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover rounded-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Category Title Label */}
        <h3 className="mt-2 sm:mt-3 text-[11.5px] sm:text-[13px] lg:text-[14px] font-semibold text-charcoal group-hover:text-forest transition-colors duration-200 text-center leading-tight max-w-[95px] sm:max-w-[115px] lg:max-w-[130px] line-clamp-2">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
}
