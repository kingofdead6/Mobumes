import React, { useState, useEffect } from "react";

import Hero from "../Components/Home/Hero";
import Categories from "../Components/Home/Categories";
import FAQ from "../Components/Home/FAQ";
import WhyChooseUs from "../Components/Home/WhyUs";
import Gallery from "../Components/Home/Gallery";
import CTASection from "../Components/Home/CTA";

import BG from "../assets/BG.mp4";
import BG_MOBILE from "../assets/BG2.mp4"; 

const HomePage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  // 📱 Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="-mt-20 relative">
      {/* 🔥 INTRO VIDEO OVERLAY */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <video
            key={isMobile ? "mobile" : "desktop"} 
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          >
            <source
              src={isMobile ? BG_MOBILE : BG}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* 🧠 MAIN WEBSITE */}
      {!showIntro && (
        <>
          <Hero />
          <Categories />
          <WhyChooseUs />
          <Gallery />
          <FAQ />
        </>
      )}
    </div>
  );
};

export default HomePage;