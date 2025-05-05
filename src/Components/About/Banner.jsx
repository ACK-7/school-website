import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Banner = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation for the title sliding in from the left
    gsap.fromTo(
      '.banner-title',
      {
        x: '-100%',
        opacity: 0,
      },
      {
        duration: 2,
        x: '0%',
        opacity: 1,
        ease: 'power2.out',
        delay: 0.5,
      }
    );
    
    // Animation for the paragraph text sliding in from the right
    gsap.fromTo(
      '.banner-text',
      {
        x: '100%',
        opacity: 0,
      },
      {
        duration: 2,
        x: '0%',
        opacity: 1,
        ease: 'power2.out',
        delay: 0.5,
      }
    );
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Choose image based on screen size
  const bannerImage = windowWidth <= 768 ? "src/assets/bannerPic.png" : "src/assets/bannerPic.png";
  
  return (
    <div className="relative overflow-hidden h-screen w-full">
      <img 
        src={bannerImage} 
        alt="Faculty" 
        className="w-full h-screen object-cover block" 
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-start pl-20 md:pl-10 sm:pl-5">
        <h1 className="banner-title font-serif text-6xl md:text-5xl sm:text-4xl text-yellow-400 mt-[500px] md:mt-[200px] sm:mt-[50px] ml-12 md:ml-3 sm:ml-5 opacity-0">
          About SHS
        </h1>
        <p className="banner-text text-xl md:text-lg sm:text-sm text-white ml-12 md:ml-3 sm:ml-5 mb-12 md:mb-8 sm:mb-6 opacity-0">
          Seeta High School (SHS) is a center of academic excellence, nurturing young minds through quality education, discipline, and innovation. With a commitment to holistic development, SHS empowers students to become confident leaders, critical thinkers, and responsible global citizens.
        </p>
      </div>
    </div>
  );
};

export default Banner;