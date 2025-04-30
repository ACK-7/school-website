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
  const bannerImage = windowWidth <= 768 ? "src/assets/bannerPic.png" : "src/assets/bannerPic.png";
  
  return (
    <div className={styles.bannerContainer}>
      <img src={bannerImage} alt="Faculty" className={styles.bannerImage} />
      <div className={styles.bannerOverlay}>
        <h1 className={`banner-title ${styles.bannerTitle}`}>STATEMENTS</h1>
        <p className={`banner-text ${styles.bannerText}`}>
          Seeta High School (SHS) is a center of academic excellence, nurturing young minds through quality education, discipline, and innovation. With a commitment to holistic development, SHS empowers students to become confident leaders, critical thinkers, and responsible global citizens.
        </p>
      </div>
    </div>
  );
};

export default Banner;