import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategorySection from '../components/CategorySection';
import FeaturedBrands from '../components/FeaturedBrands';
import { heroSlides } from '../data/heroSlides';

export default function Home() {
  return (
    <main className="w-full flex-grow">
      {/* Existing Cinematic Hero Carousel */}
      <HeroSlider slides={heroSlides} />

      {/* SECTION 02: Promotional Gifts Categories */}
      <CategorySection />

      {/* SECTION 03: Featured Brands Showcase */}
      <FeaturedBrands />
    </main>
  );
}
