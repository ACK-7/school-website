import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import styles from "./CounterSection.module.css";

const CounterSection = () => {
  const counters = [
    { icon: "fa-book", count: 20, label: "Subjects" },
    { icon: "fa-users", count: 2000, label: "Students" },
    { icon: "fa-flask", count: 5, label: "Modern Lab" },
    { icon: "fa-user-secret", count: 25, label: "Teachers" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const counterSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section ref={counterSectionRef} className={styles.counterSection}>
      <div className={styles.counterGrid}>
        {counters.map((counter, index) => (
          <div key={index} className={styles.counterItem}>
            <i className={`fas ${counter.icon}`}></i>
            <h4>
              {hasAnimated && <CountUp end={counter.count} duration={2} separator="," />}
            </h4>
            <p>{counter.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CounterSection;
