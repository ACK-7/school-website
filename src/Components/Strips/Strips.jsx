import React, { useEffect } from "react";
import styles from "./Strips.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const stripsData = [
  { width: "40%", bgColor: "#1c4673", alignRight: true }, // Blue top strip
  { width: "80%", bgColor: "#d59f0f", alignRight: false }, // Gold middle strip
  { width: "40%", bgColor: "#1c4673", alignRight: true }, // Blue bottom strip
];

const Strips = () => {
  useEffect(() => {
    gsap.utils.toArray(`.${styles.strip}`).forEach((strip, index) => {
      const isGold = index === 1; // Gold strip is in the middle (index 1)
      const isRightAligned = stripsData[index].alignRight;

      gsap.fromTo(
        strip,
        {
          opacity: 0,
          x: isGold ? "-100vw" : isRightAligned ? "100vw" : "-100vw", // Start from the left for gold, right for blue
        },
        {
          opacity: 1,
          x: 0, // Move to center
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 85%", // Animation starts when the strip is near the viewport
            end: "top 40%", // Ends smoothly
            scrub: 1, // Scroll-linked animation
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.diagonalTransition}>
      <div className={styles.stripContainer}>
        {stripsData.map((strip, index) => (
          <div
            key={index}
            className={styles.strip}
            style={{
              width: strip.width,
              backgroundColor: strip.bgColor,
              marginTop: `${index * 50}px`, // Spacing between strips
              right: strip.alignRight ? "0" : "auto", // Align right if specified
              left: strip.alignRight ? "auto" : "0", // Align left otherwise
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Strips;
