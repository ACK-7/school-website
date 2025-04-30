import React, { useEffect } from 'react';
import styles from './Hero.module.css';
import video from '../../assets/video.mp4';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  useGSAP(() => {
    gsap.to("#hero1", {
      opacity: 1,
      duration: 1.5,
      delay: 2,
    });
    gsap.to("#hero2", {
      opacity: 1,
      duration: 1.5,
      delay: 2.5,
    });
    gsap.to("#btn1", {
      opacity: 1,
      duration: 1.5,
      delay: 3,
    });
  });
  
  return (
    <div className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.videoBackground}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.blackOverlay}></div>
      <div className={styles.overlay}>
        <h1 id='hero1' className={styles.texttop}>
          <span className={styles.bigLetter}>R</span>eady to unlock your 
        </h1>
        <h2 id='hero2' className={styles.textbottom}>Potential?</h2>
        <button id='btn1' className={styles.btn}>Join Us</button>
      </div>
    </div>
  );
}

export default Hero;