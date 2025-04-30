import { gsap } from "gsap";
import React from "react";
import styles from "./Message.module.css";
import directorImage from "../../assets/Director.jpeg";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WelcomeMessage = () => {
  useGSAP(() => {
    // Animate the Director's Image (fade in from left)
    gsap.fromTo(
      `.${styles.directorImage}`,
      { opacity: 0, x: -100 }, // Start off-screen to the left
      {
        opacity: 1,
        x: 0, // Slide into the center
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.messageContent}`,
          start: "top 80%", // Start animation when the top of the content is 80% visible
          end: "bottom 50%", // End animation when the bottom of the content is 50% visible
          scrub: true, // Tie animation progress to scroll position
        },
      }
    );

    // Animate the Message Text (fade in from right)
    gsap.fromTo(
      `.${styles.messageText}`,
      { opacity: 0, x: 100 }, // Start off-screen to the right
      {
        opacity: 1,
        x: 0, // Slide into the center
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.messageContent}`,
          start: "top 80%", // Start animation when the top of the content is 80% visible
          end: "bottom 50%", // End animation when the bottom of the content is 50% visible
          scrub: true, // Tie animation progress to scroll position
        },
      }
    );
  }, []);

  return (
    <section className={styles.message}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.messageHeader}>
          <h1>WELCOME TO SEETA HIGH SCHOOLS</h1>
          <p className={styles.directorTitle}>Mrs. Rose Namayanja Muyingo, Director</p>
        </div>

        {/* Content Section */}
        <div className={styles.messageContent}>
          {/* Director's Image */}
          <div className={styles.directorImage}>
            <img src={directorImage} alt="School Director" />
            <div className={styles.imageFrame}></div>
          </div>

          {/* Message Text */}
          <div className={styles.messageText}>
            <div className={styles.quoteMark}>"</div>
            <p>
              Welcome to Seeta High School, an institution dedicated to both academic excellence and
              holistic student development. Our mission is to nurture young minds, equipping them
              with the knowledge, skills, and values they need to succeed in today's fast-changing world.
            </p>
            <p>
              With a team of passionate educators, state-of-the-art facilities, and a vibrant learning
              environment, we foster both personal and academic growth. Since our first school opened in
              2000, we have expanded into a network of four campuses, each catering to specific stages of
              learning: Main, Mukono, Green (focusing on developing innovative leaders), and A-Level.
            </p>
            <p>
              We believe every child has the potential to thrive. We are committed to partnering with
              you to provide your child with the best education and support throughout their time at
              Seeta High School, empowering them to become well-rounded individuals ready to make a
              positive impact on the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;