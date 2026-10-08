import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlide from './HeroSlide';

export default function HeroSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const totalSlides = slides.length;

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
  }, [totalSlides]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetAutoplay]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    resetAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    resetAutoplay();
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    resetAutoplay();
  };

  return (
    <section
      id="home"
      aria-label="Promotional Banner Carousel"
      className="relative w-full h-[380px] sm:h-[400px] md:h-[430px] lg:h-[460px] xl:h-[480px] bg-warm-white overflow-hidden select-none"
    >
      {/* Rectangular Banner Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Navigation Arrow Left */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group focus:outline-none"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      {/* Navigation Arrow Right */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group focus:outline-none"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto pl-12 sm:pl-16 md:pl-20 lg:pl-24 pr-4 sm:pr-8 lg:pr-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="group py-1 focus:outline-none"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-400 ease-out ${
                      isActive
                        ? 'w-8 sm:w-10 bg-mint shadow-xs'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Slide Counter */}
          <div className="text-xs font-mono text-white/80 tracking-wider hidden sm:block pointer-events-auto bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
            <span className="text-mint font-semibold">0{currentIndex + 1}</span>
            <span className="mx-1 text-white/50">/</span>
            <span>0{totalSlides}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
