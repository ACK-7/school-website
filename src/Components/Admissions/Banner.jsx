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
  const bannerImage = windowWidth <= 768 ? "src/assets/staff.png" : "src/assets/staff.png";
  
  return (
    <div className="relative overflow-hidden h-screen w-full">
      <img 
        src={bannerImage} 
        alt="Faculty" 
        className="w-full h-screen object-cover block" 
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-start pl-20 pt-[350px]">
        <h1 className="banner-title text-[80px] text-left text-yellow-500 font-serif mt-[500px] ml-[50px] opacity-0 md:text-[60px] md:mt-[200px] sm:text-[40px] sm:mt-[500px] sm:ml-[10px] xs:text-[30px] xs:mt-[50px] xs:ml-[20px]">
          Administration
        </h1>
        <p className="banner-text text-[25px] text-left text-white ml-[50px] mb-[50px] opacity-0 md:text-[20px] sm:text-[16px] sm:ml-[10px] xs:text-[14px] xs:ml-[20px]">
          Our dedicated administrators provide strong leadership and ensure the smooth operation of the school, fostering a supportive environment for both students and staff.
        </p>
      </div>
    </div>
  );
};

export default Banner;