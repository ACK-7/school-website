import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Banner.module.css';

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
    <div className={styles.bannerContainer}>
      <img src={bannerImage} alt="Faculty" className={styles.bannerImage} />
      <div className={styles.bannerOverlay}>
        <h1 className={`banner-title ${styles.bannerTitle}`}>Administration</h1>
        <p className={`banner-text ${styles.bannerText}`}>
        Our dedicated administrators provide strong leadership and ensure the smooth operation of the school, fostering a supportive environment for both students and staff.
        </p>
      </div>
    </div>
  );
};

export default Banner;