import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import  styles from "./WhyChooseUs.module.css"; 

const WhyChooseUs = () => {
  const features = [
    {
      icon: "fa-graduation-cap",
      title: "Academic Excellence",
      description:
        "Consistently outstanding academic performance with high success rates in national examinations, demonstrated by a strong foundation in core subject areas.",
    },
    {
      icon: "fa-chalkboard-teacher",
      title: "Experienced Faculty",
      description:
        "Our highly qualified teachers bring years of experience and passion for education, providing personalized attention to each student's learning journey.",
    },
    {
      icon: "fa-building",
      title: "Modern Facilities",
      description:
        "State-of-the-art laboratories, libraries, and sports facilities ensure a comprehensive learning environment for all-round development.",
    },
    {
      icon: "fa-child",
      title: "Holistic Development",
      description:
        "Focus on both academic and personal growth through various extracurricular activities, leadership opportunities, and character development programs.",
    },
  ];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initialize GSAP timeline
    const tl = gsap.timeline({ paused: true });

    // Add animations for each card
    cardsRef.current.forEach((card, index) => {
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2, // Staggered delay for each card
        }
      );
    });

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play(); // Play animation when the section is in view
          } else {
            tl.reverse(); // Reverse animation when the section leaves the view
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.programSection}>
      <div className={styles.programHeader}>
        <h1>WHY CHOOSE US</h1>
        <div className={styles.headerUnderline}>
          <span className={styles.line}></span>
          <span className={styles.diamond}></span>
          <span className={styles.line}></span>
        </div>
      </div>

      <div className={styles.row}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles.programCol}
            ref={(el) => (cardsRef.current[index] = el)} 
          >
            <div className={styles.programCard}>
              <div className={styles.iconWrapper}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <div className={styles.cardContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="cardOverlay"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;