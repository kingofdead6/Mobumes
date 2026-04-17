import React from 'react';

import Hero from '../Components/Home/Hero';
import Categories from '../Components/Home/Categories';
import FAQ from '../Components/Home/FAQ';
import WhyChooseUs from '../Components/Home/WhyUs';
import Gallery from '../Components/Home/Gallery';
import CTASection from '../Components/Home/CTA';

const HomePage = () => {
  return (
    <div className="-mt-20">
      <Hero />
      <Categories />
      <WhyChooseUs />
      <Gallery />
      <FAQ />
    </div>
  );
};

export default HomePage;