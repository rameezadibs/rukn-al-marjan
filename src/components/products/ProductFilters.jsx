import React from 'react';

const filterChips = [
  { id: 'all', label: 'All Products' },
  { id: 'popular', label: 'Popular' },
  { id: 'newest', label: 'Newest' },
  { id: 'eco-friendly', label: 'Eco-friendly' },
  { id: 'corporate-gifts', label: 'Corporate Gifts' },
  { id: 'tech', label: 'Tech' },
  { id: 'office', label: 'Office' },
  { id: 'travel', label: 'Travel' },
];

export default function ProductFilters({ activeFilter, onFilterSelect }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-2 sm:pb-3 mb-8">
      <div className="flex items-center gap-2.5 min-w-max">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onFilterSelect(chip.id)}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-medium tracking-wide transition-all duration-200 select-none ${
                isActive
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-white border border-[#E2E2DC] text-charcoal/80 hover:bg-soft-mint/30 hover:border-forest/30'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
