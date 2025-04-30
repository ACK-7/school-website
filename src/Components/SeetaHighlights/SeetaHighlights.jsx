import React, { useEffect, useRef } from 'react';
import styles from './SeetaHighlights.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SeetaHighlights = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const blueAccentRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Split text into words for animation
    const text = textRef.current;
    const content = text.textContent;
    const words = content.split(' ');
    
    // Clear original text
    text.textContent = '';
    
    // Create spans for each word
    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
      wordSpan.className = styles.animatedWord;
      text.appendChild(wordSpan);
    });
    
    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate blue accent
    tl.fromTo(blueAccentRef.current, 
      { width: 0, opacity: 0 }, 
      { width: "120px", opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    // Animate each word
    tl.fromTo(`.${styles.animatedWord}`,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.5, ease: "back.out" },
      "-=0.4"
    );
    
    // Animate video container
    tl.fromTo(videoContainerRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );
    
    // Cleanup function
    return () => {
      if (tl) tl.kill();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.highlightsSection}>
      <div ref={blueAccentRef} className={styles.blueAccent}></div>
      
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <p ref={textRef} className={styles.description}>
            As a result of their unwavering commitment
            to excellence, Seeta High Schools have
            earned a stellar reputation both locally and
            nationally, producing graduates who excel
            not only academically but also as
            responsible citizens and future leaders. In
            Mukono District and beyond, Seeta High
            Schools continue to serve as beacons of
            educational innovation and excellence,
            shaping the leaders of tomorrow.
          </p>
        </div>
        
        <div ref={videoContainerRef} className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <iframe 
              width="800" 
              height="400" 
              src="https://www.youtube.com/embed/DRQ7SHcXK6M?si=TzPxxUn6A1Te-nMt" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeetaHighlights;