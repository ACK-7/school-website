import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./FacilitiesSection.module.css";

const FacilitiesSection = () => {
  const facilityCardsRef = useRef([]);

  useEffect(() => {
    // Animate facility cards using GSAP
    gsap.from(facilityCardsRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const facilities = [
    {
      title: "Modern Computer Lab",
      description:
        "State-of-the-art computer facility equipped with the latest hardware and software.",
      image: "src/assets/computer lab.jpeg",
    },
    {
      title: "Science Laboratory",
      description:
        "Advanced labs with modern equipment for practical experiments.",
      image: "src/assets/laboratories.jpeg",
    },
    {
      title: "Basketball Court",
      description:
        "Professional-grade court for sports activities and competitions.",
      image: "src/assets/basketball court.jpeg",
    },
    {
      title: "Swimming Pool",
      description: "Refreshing pool for relaxation and exercise.",
      image: "src/assets/swimmingpool.jpeg",
    },
    {
      title: "Multi-Purpose Auditorium",
      description: "Spacious venue for events and academic gatherings.",
      image: "src/assets/auditorium.jpg",
    },
    {
      title: "Modern Classrooms",
      description:
        "Spacious classrooms that offer a great environment for academic excellence.",
      image: "src/assets/classrooms.jpeg",
    },
    {
      title: "Library",
      description: "Well-equipped library to facilitate the learners' research.",
      image: "src/assets/library.jpg",
    },
    {
      title: "Dormitories",
      description: "Spacious sleeping areas with extreme comfortability.",
      image: "src/assets/dormitory.jpg",
    },
  ];

  return (
    <div className={styles.facilitiesSection}>
      <h1 className={styles.sectionTitle}>Our World-Class Facilities</h1>
      <div className={styles.row}>
        {facilities.slice(0, 4).map((facility, index) => (
          <div
            key={index}
            className={styles.colMd3}
            ref={(el) => (facilityCardsRef.current[index] = el)}
          >
            <div className={styles.facilityCard}>
              <img
                src={facility.image}
                alt={facility.title}
                className={styles.cardImgTop}
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{facility.title}</h5>
                <p className={styles.facilityDescription}>
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {facilities.slice(4).map((facility, index) => (
          <div
            key={index + 4}
            className={styles.colMd3}
            ref={(el) => (facilityCardsRef.current[index + 4] = el)}
          >
            <div className={styles.facilityCard}>
              <img
                src={facility.image}
                alt={facility.title}
                className={styles.cardImgTop}
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{facility.title}</h5>
                <p className={styles.facilityDescription}>
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSection;