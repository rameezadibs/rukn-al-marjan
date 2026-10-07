import React from 'react';
import { brands } from '../data/brands';

export default function BrandMarquee() {
  // Brand lookup dictionary for precise row sequencing
  const brandMap = Object.fromEntries(brands.map((b) => [b.name, b]));

  // Sequence defined in prompt for Row 1
  const row1Names = [
    'Amabel Designs',
    'Dorniel Designs',
    'MagicTransUSA',
    'Maxema',
    'Cross',
    'SUBLI-M',
    'Raphael',
    'Chase Plus',
  ];

  // Sequence defined in prompt for Row 2 (offset for visual rhythm)
  const row2Names = [
    'Cross',
    'Raphael',
    'Chase Plus',
    'Maxema',
    'Dorniel Designs',
    'SUBLI-M',
    'Amabel Designs',
    'MagicTransUSA',
  ];

  const row1Brands = row1Names.map((name) => brandMap[name] || { name, logo: '' });
  const row2Brands = row2Names.map((name) => brandMap[name] || { name, logo: '' });

  // Duplicate for seamless infinite loop (render list twice)
  const loopRow1 = [...row1Brands, ...row1Brands];
  const loopRow2 = [...row2Brands, ...row2Brands];

  return (
    <div className="w-full relative flex flex-col gap-4 sm:gap-6 overflow-hidden py-2 mask-marquee-edges">
      {/* ========================================== */}
      {/* ROW 01: Moves Right → Left                 */}
      {/* ========================================== */}
      <div className="relative w-full overflow-hidden group">
        <div className="animate-marquee-left group-hover:[animation-play-state:paused] flex items-center gap-3.5 sm:gap-5 py-1">
          {loopRow1.map((brand, idx) => (
            <div
              key={`row1-${brand.name}-${idx}`}
              className="flex-shrink-0 w-[175px] sm:w-[205px] lg:w-[220px] h-[100px] sm:h-[115px] lg:h-[124px] rounded-[18px] sm:rounded-[20px] bg-warm-white border border-charcoal/5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col items-center justify-center p-4 sm:p-5 select-none cursor-default group/tile"
              title={`${brand.name} - ${brand.category || 'Featured Partner'}`}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-9 sm:h-11 object-contain transition-transform duration-300 ease-out group-hover/tile:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* ROW 02: Moves Left → Right (Reverse)       */}
      {/* ========================================== */}
      <div className="relative w-full overflow-hidden group">
        <div className="animate-marquee-right group-hover:[animation-play-state:paused] flex items-center gap-3.5 sm:gap-5 py-1">
          {loopRow2.map((brand, idx) => (
            <div
              key={`row2-${brand.name}-${idx}`}
              className="flex-shrink-0 w-[175px] sm:w-[205px] lg:w-[220px] h-[100px] sm:h-[115px] lg:h-[124px] rounded-[18px] sm:rounded-[20px] bg-warm-white border border-charcoal/5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col items-center justify-center p-4 sm:p-5 select-none cursor-default group/tile"
              title={`${brand.name} - ${brand.category || 'Featured Partner'}`}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-9 sm:h-11 object-contain transition-transform duration-300 ease-out group-hover/tile:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
