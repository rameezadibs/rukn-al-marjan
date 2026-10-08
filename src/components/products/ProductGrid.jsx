import React from 'react';
import ProductCard from '../ProductCard';
import { SearchX, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGrid({
  products,
  visibleCount,
  onLoadMore,
  onQuoteRequest,
  onResetFilters,
  viewMode = 'grid',
}) {
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const progressPercent = Math.min(100, Math.round((visibleProducts.length / (products.length || 1)) * 100));

  if (products.length === 0) {
    return (
      <div className="w-full py-20 px-6 rounded-[24px] bg-white border border-[#E7E8E4] text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-soft-mint/60 text-forest flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 stroke-[1.8]" />
        </div>
        <h3 className="text-2xl font-bold text-charcoal mb-2">No products found</h3>
        <p className="text-muted-grey text-base max-w-md mx-auto mb-6 leading-relaxed">
          Try adjusting your search or filters to explore more of our corporate promotional collection.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-7 py-3 rounded-full bg-forest text-white font-medium text-sm hover:bg-[#142347] transition-colors shadow-sm"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Product Grid / Compact View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteRequest={onQuoteRequest}
                viewMode="grid"
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteRequest={onQuoteRequest}
                viewMode="compact"
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Catalogue Progress & Load More Section */}
      {hasMore && (
        <div className="mt-14 sm:mt-16 flex flex-col items-center">
          {/* Progress Indicator */}
          <div className="w-full max-w-xs text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-grey">
              Showing {visibleProducts.length} of {products.length} products
            </span>
            <div className="w-full h-1.5 bg-[#E8E7E2] rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Load More Button */}
          <button
            type="button"
            onClick={onLoadMore}
            className="group flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-white border border-forest text-forest hover:bg-forest hover:text-white font-semibold text-base transition-all duration-300 shadow-sm active:scale-[0.98]"
          >
            <span>Load More Products</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
