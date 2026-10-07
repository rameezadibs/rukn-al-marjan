import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { categories } from '../../data/categories';

export default function ProductSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onResetSearch,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4 mb-6">
      {/* Search Input Field */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-charcoal/40">
          <Search className="w-5 h-5 stroke-[2]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, categories or keywords..."
          className="w-full h-14 sm:h-[58px] pl-12 pr-10 rounded-[14px] bg-white border border-[#E2E2DC] text-charcoal text-base placeholder-charcoal/40 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all shadow-xs"
          aria-label="Search products, categories or keywords"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={onResetSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal/40 hover:text-charcoal transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        )}
      </div>

      {/* Category Dropdown Filter */}
      <div className="relative md:w-72 flex-shrink-0">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full h-14 sm:h-[58px] px-5 pr-10 rounded-[14px] bg-white border border-[#E2E2DC] text-charcoal text-[15px] font-medium appearance-none focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all shadow-xs cursor-pointer"
          aria-label="Filter products by category"
        >
          <option value="All">All Categories</option>
          {/* Include Summer Promotional Items, Desk Items & Sets, and the 33 homepage categories */}
          <option value="Summer Promotional Items">Summer Promotional Items</option>
          <option value="Desk Items & Sets">Desk Items & Sets</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-charcoal/50">
          <ChevronDown className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
}
