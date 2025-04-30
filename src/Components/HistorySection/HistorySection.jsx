import React, { useEffect } from 'react';
import styles from './HistorySection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHoldingCircle, faGraduationCap, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HistorySection = () => {
  useEffect(() => {
    // Animation for timeline items
    const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`);
    
    timelineItems.forEach((item, index) => {
      const icon = item.querySelector(`.${styles.iconContainer}`);
      const text = item.querySelector('p');
      
      // Stagger the animations with a 0.5 second delay between items
      const delay = index * 0.5;
      
      // Icon animation - slide in from left
      gsap.fromTo(
        icon,
        { 
          x: -100, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out',
          delay: delay,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
      
      // Text animation - slide in from right
      gsap.fromTo(
        text,
        { 
          x: 100, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out',
          delay: delay + 0.2, // Slight additional delay for text to follow icon
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });
    
    // Animate the timeline connectors if not on mobile
    if (window.innerWidth > 768) {
      const connectors = document.querySelectorAll(`.${styles.timelineConnector}`);
      
      connectors.forEach((connector, index) => {
        gsap.fromTo(
          connector,
          { 
            scale: 0,
            opacity: 0 
          },
          { 
            scale: 1,
            opacity: 1, 
            duration: 0.8, 
            ease: 'back.out(1.7)',
            delay: index * 0.5 + 0.4, // Appear after the items
            scrollTrigger: {
              trigger: connector,
              start: "top 80%",
            }
          }
        );
      });
    }
    
    // Animate the title and intro text
    gsap.fromTo(
      `.${styles.historyTitle}`,
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: `.${styles.historySection}`,
          start: "top 80%",
        }
      }
    );
    
    gsap.fromTo(
      `.${styles.historyText}`,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: `.${styles.historySection}`,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div className={styles.historySection}>
      <div className={styles.historyContainer}>
        <div className={styles.historyTitle}>
          <h2>Our History</h2>
        </div>
        
        <div className={styles.historyContent}>
          <div className={styles.historyText}>
            <p>
            Established in 2000, Seeta High School has proudly stood as a Towering Academic Giant for 24 years, 
            making its mark on the nation’s educational landscape. Located in Mukono district, we are a mixed
             boarding secondary school offering both Ordinary and Advanced Levels of education. As a Christian
              institution, we integrate faith into all our activities, nurturing students in both academics 
              and values. With uniform policies and guidelines across all campuses, we ensure consistency and excellence 
              in our students. Our serene environments, state-of-the-art facilities, and easy accessibility create
               the perfect setting for learning. We pride ourselves on offering a holistic, high-quality education
                that nurtures both academic success and talent development
            </p>
          </div>
          
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faHandsHoldingCircle} className={styles.faIcon} />
              </div>
              <p>
                Seeta is a high school of long-standing traditions with a strong Christian identity, an exceptional learning environment and a center of personal growth and development.
              </p>
            </div>
            
            <div className={styles.timelineConnector}></div>
            
            <div className={styles.timelineItem}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.faIcon} />
              </div>
              <p>
                SHS offers a superior education where students can grow spiritually, intellectually, physically, and emotionally. The greatest strength of a SHS education is the ability to integrate the concepts of morality and character development in your education.
              </p>
            </div>
            
            <div className={styles.timelineConnector}></div>
            
            <div className={styles.timelineItem}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faPeopleGroup} className={styles.faIcon} />
              </div>
              <p>
                From the moment your family selects SHS, the faculty and staff will guide your child to ensure a seamless entry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;