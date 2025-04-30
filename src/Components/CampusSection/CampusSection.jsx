import React, { useEffect, useRef } from "react";
import styles from "./CampusSection.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CampusSection = () => {
  const campusRef = useRef(null);
  const campusItems = useRef([]);

  const campuses = [
    {
      image: "src/assets/main campus.jpeg",
      name: "MUKONO CAMPUS",
      link: "#",
      animationFrom: "top", // First from top
    },
    {
      image: "src/assets/Greencampus.jpg",
      name: "GREEN CAMPUS",
      link: "#",
      animationFrom: "bottom", // Second from bottom
    },
    {
      image: "src/assets/mbalala campus.jpeg",
      name: "MBALALA CAMPUS",
      link: "#",
      animationFrom: "top", // Third from top
    },
    {
      image: "src/assets/mbalala campus.jpeg",
      name: "A'LEVEL CAMPUS",
      link: "#",
      animationFrom: "bottom", // Fourth from bottom
    },
  ];

  useEffect(() => {
    // Use a small delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      if (campusItems.current.length === campuses.length) {
        campusItems.current.forEach((element, index) => {
          const direction = campuses[index].animationFrom;
          const yStart = direction === "top" ? -100 : 100;

          gsap.fromTo(
            element,
            { y: yStart, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top center", // Adjust based on your layout
                toggleActions: "play none none reverse",
              },
              delay: index * 0.5, // Staggered delay for each item
            }
          );
        });

        // Animate the header section separately
        gsap.fromTo(
          ".campusHeader",
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: campusRef.current,
              start: "top center",
            },
          }
        );
      }
    }, 100); // Small delay to allow DOM elements to render

    return () => clearTimeout(timer);
  }, [campuses]);

  // Function to add elements to the refs array
  const addToRefs = (el) => {
    if (el && !campusItems.current.includes(el)) {
      campusItems.current.push(el);
    }
  };

  return (
    <section className={styles.campusSection} ref={campusRef}>
      {/* Header */}
      <div className={`${styles.campusHeader} campusHeader`}>
        <h1>OUR CAMPUSES</h1>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <div className={styles.dot}></div>
          <div className={styles.diamond}></div>
          <div className={styles.dot}></div>
          <div className={styles.line}></div>
        </div>
        <p className={styles.subtitle}>Discover our state-of-the-art educational facilities</p>
      </div>

      {/* Campus Grid */}
      <div className={styles.row}>
        {campuses.map((campus, index) => (
          <div
            key={index}
            className={styles.campusCol}
            ref={addToRefs} // Add each campus item to the refs array
          >
            <div className={styles.imageWrapper}>
              <img
                src={campus.image}
                alt={campus.name}
                onError={(e) => console.error("Image failed to load:", e)}
              />
              <div className={styles.overlay}></div>
              <div className={styles.contentOverlay}>
                <h3>{campus.name}</h3>
                <a href={campus.link} className={styles.learnMoreBtn}>
                  Explore Campus <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusSection;