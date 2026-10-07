import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import ProductSearch from '../components/products/ProductSearch';
import ProductFilters from '../components/products/ProductFilters';
import ProductToolbar from '../components/products/ProductToolbar';
import ProductGrid from '../components/products/ProductGrid';
import QuoteModal from '../components/products/QuoteModal';
import { products as initialProducts } from '../data/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Interactive filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [activeQuickFilter, setActiveQuickFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  // Quote modal state
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Update selected category if URL search param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Handle category change and sync with URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(12);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // 1. Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }

        // 2. Category filter
        if (selectedCategory !== 'All') {
          if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // 3. Quick Filter Chips
        if (activeQuickFilter === 'popular' && !p.popular) return false;
        if (activeQuickFilter === 'newest' && !p.newest) return false;
        if (activeQuickFilter === 'eco-friendly' && !p.ecoFriendly) return false;
        if (activeQuickFilter === 'corporate-gifts' && !p.corporateGifts) return false;
        if (activeQuickFilter === 'tech' && !p.tech) return false;
        if (activeQuickFilter === 'office' && !p.office) return false;
        if (activeQuickFilter === 'travel' && !p.travel) return false;

        return true;
      })
      .sort((a, b) => {
        // 4. Sorting logic
        if (sortBy === 'newest') return (b.newest ? 1 : 0) - (a.newest ? 1 : 0);
        if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0; // recommended default
      });
  }, [searchQuery, selectedCategory, activeQuickFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    handleCategoryChange('All');
    setActiveQuickFilter('all');
    setSortBy('recommended');
  };

  const handleOpenQuoteModal = (product) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FAFAF7] min-h-screen">
      {/* ============================================================== */}
      {/* 01 — PRODUCTS PAGE INTRO / HERO (300-380px tall)               */}
      {/* ============================================================== */}
      <section
        className="relative w-full bg-[#1B2B52] text-white overflow-hidden py-14 sm:py-16 lg:py-20 select-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, #203565 0%, #1B2B52 45%, #0F1C3F 100%)',
        }}
      >
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              {/* Understated Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-white/60">
                <Link to="/" className="hover:text-mint transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-mint font-medium">Products Catalogue</span>
              </nav>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-mint rounded-full inline-block" />
                <span className="text-xs font-semibold tracking-wider-luxury text-mint uppercase">
                  OUR COLLECTION
                </span>
              </div>

              {/* Large Editorial Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] mb-5">
                <span className="text-white block">Products Made</span>
                <span className="text-mint block">to Be Remembered.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-xl text-pretty">
                Explore our collection of promotional products, corporate gifts and branded essentials selected for quality, functionality and lasting impact.
              </p>
            </motion.div>

            {/* Right Side: Catalogue Still-Life Showcase */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-end relative">
              <div className="relative w-full max-w-[390px] h-[260px] rounded-[24px] bg-white/[0.04] border border-white/10 backdrop-blur-xs p-5 flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Visual plinth */}
                <div className="absolute bottom-3 inset-x-8 h-10 rounded-full bg-black/40 filter blur-md" />

                <div className="relative z-10 grid grid-cols-3 gap-3 w-full h-full items-center">
                  {/* Item 1: Insulated Bottle */}
                  <div className="h-44 rounded-2xl bg-white/10 border border-white/10 p-2 flex flex-col items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80"
                      alt="Insulated Bottle"
                      className="w-full h-28 object-contain"
                    />
                    <span className="text-[10px] text-white/70 font-medium mt-1">Bottles</span>
                  </div>

                  {/* Item 2: Executive Gift Set */}
                  <div className="h-52 rounded-2xl bg-white/15 border border-mint/20 p-2.5 flex flex-col items-center justify-center transform scale-105 shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
                      alt="Gift Set"
                      className="w-full h-32 object-contain"
                    />
                    <span className="text-[10px] text-mint font-semibold mt-1">Gift Sets</span>
                  </div>

                  {/* Item 3: Notebook & Pen */}
                  <div className="h-44 rounded-2xl bg-white/10 border border-white/10 p-2 flex flex-col items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
                      alt="Notebook"
                      className="w-full h-28 object-contain"
                    />
                    <span className="text-[10px] text-white/70 font-medium mt-1">Stationery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02 — PRODUCT DISCOVERY AREA (Warm-white #FAFAF7)                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-24">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="mb-2">
            <span className="text-xs font-semibold tracking-wider-luxury text-forest uppercase">
              EXPLORE THE COLLECTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal mb-3">
            Find the Right Product.
          </h2>
          <p className="text-base text-charcoal/70 leading-relaxed">
            Browse our collection or narrow your search by category, popularity and availability.
          </p>
        </div>

        {/* 03 — Search Bar & Category Dropdown */}
        <ProductSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onResetSearch={() => setSearchQuery('')}
        />

        {/* 05 — Quick Filter Chips */}
        <ProductFilters
          activeFilter={activeQuickFilter}
          onFilterSelect={setActiveQuickFilter}
        />

        {/* 06 — Results Toolbar */}
        <ProductToolbar
          totalVisible={Math.min(visibleCount, filteredProducts.length)}
          totalFiltered={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 07 — Product Grid */}
        <ProductGrid
          products={filteredProducts}
          visibleCount={visibleCount}
          onLoadMore={() => setVisibleCount((prev) => prev + 6)}
          onQuoteRequest={handleOpenQuoteModal}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
        />

        {/* ============================================================== */}
        {/* 20 — COMPACT QUOTE CTA SECTION (150-200px tall)                */}
        {/* ============================================================== */}
        <div
          className="mt-20 sm:mt-24 rounded-[26px] bg-[#0F1C3F] text-white p-8 sm:p-12 lg:p-14 border border-white/10 shadow-xl relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 80% 30%, #203565 0%, #1B2B52 50%, #0F1C3F 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 relative z-10">
            {/* Left */}
            <div>
              <span className="text-xs font-semibold tracking-wider-luxury text-mint uppercase block mb-2">
                NEED SOMETHING SPECIFIC?
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Can’t find exactly <br className="hidden sm:inline" />
                what you’re looking for?
              </h3>
            </div>

            {/* Right */}
            <div className="max-w-md flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Our enterprise team can custom-source, prototype, and brand bespoke promotional items tailored to your campaign.
              </p>
              <button
                type="button"
                onClick={() =>
                  handleOpenQuoteModal({
                    name: 'Custom Product Sourcing',
                    category: 'Bespoke Inquiries',
                    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80',
                    availability: 'Custom Order',
                  })
                }
                className="group flex-shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-mint text-white font-semibold text-sm hover:bg-[#0092cb] active:scale-[0.98] transition-all duration-200 shadow-md"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={selectedProductForQuote}
      />
    </div>
  );
}
