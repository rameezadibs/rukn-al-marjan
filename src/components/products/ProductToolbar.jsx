import React from 'react';
import { LayoutGrid, Rows3, ChevronDown } from 'lucide-react';

export default function ProductToolbar({
  totalVisible,
  totalFiltered,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-charcoal/10">
      {/* Left: Product Count */}
      <div className="text-[14.5px] font-medium text-charcoal/70">
        Showing <span className="font-semibold text-charcoal">{totalVisible}</span> of{' '}
        <span className="font-semibold text-charcoal">{totalFiltered}</span> products
      </div>

      {/* Right: Sort & Layout Mode */}
      <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
        {/* Sort By Dropdown */}
        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">
            Sort products
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal/60 uppercase font-semibold tracking-wider hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl bg-white border border-[#E2E2DC] text-charcoal text-xs sm:text-[13px] font-medium appearance-none focus:outline-none focus:border-forest cursor-pointer shadow-xs"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-charcoal/50">
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-white border border-[#E2E2DC] shadow-xs">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-forest text-white'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('compact')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'compact'
                ? 'bg-forest text-white'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
            aria-label="Compact view"
            title="Compact view"
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
