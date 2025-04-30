import React, { useState, useEffect } from "react";
import styles from "./TestimonialSlider.module.css";

const Testimonials = [
  {
    id: 1,
    name: "Gabriella Irvin",
    classYear: "Class of '23",
    testimonial:
      "At Foley I can find support from my teachers, counselors or anyone in administration. I feel comfortable asking teachers for help or advice when I need it. Foley has really set me up for an excellent future and has helped me prepare for my future.",
    image: "src/assets/std1.jpg",
  },
  {
    id: 2,
    name: "Ethan Johnson",
    classYear: "Class of '24",
    testimonial:
      "The faculty at Foley are incredibly dedicated and passionate about teaching. They go above and beyond to ensure that every student succeeds. I've learned so much here and feel prepared for college.",
    image: "src/assets/std2.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    classYear: "Class of '25",
    testimonial:
      "Foley offers a wide range of extracurricular activities that have allowed me to explore my interests and develop new skills. The supportive community has been instrumental in my personal growth.",
    image: "src/assets/std3.jpg",
  },
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === Testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === Testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Testimonials.length - 1 : prev - 1));
  };

  return (
    <div className={styles.testimonialSlider}>
      <div className={styles.sliderContainer}>
        <button className={styles.arrow + " " + styles.prev} onClick={goToPrevSlide}>
          &lt;
        </button>
        
        <div className={styles.slideTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {Testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.slide}>
              <div className={styles.testimonialLayout}>
                <div className={styles.quotesLeft}>&ldquo;</div>
                
                <div className={styles.contentWrapper}>
                  <div className={styles.imageWrapper}>
                    <img src={testimonial.image} alt={testimonial.name} className={styles.testimonialImage} />
                  </div>
                  
                  <div className={styles.textContent}>
                    <div className={styles.textBorder}>
                      <p className={styles.quote}>{testimonial.testimonial}</p>
                      <p className={styles.author}>
                        &mdash; {testimonial.name}, {testimonial.classYear}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.quotesRight}>&rdquo;</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={styles.arrow + " " + styles.next} onClick={goToNextSlide}>
          &gt;
        </button>
      </div>
      
      <div className={styles.dots}>
        {Testimonials.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;