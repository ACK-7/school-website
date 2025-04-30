import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Statements.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Statements = () => {
  // Create refs for animated elements
  const studentLifeRef = useRef(null);
  const statementsBannerRef = useRef(null);
  const themeBlockRef = useRef(null);
  const visionBlockRef = useRef(null);
  const missionBlockRef = useRef(null);
  const mottoBlockRef = useRef(null);
  const historyBlockRef = useRef(null);
  const campusListRef = useRef(null);
  const campusItemsRef = useRef([]);
  const philosophyTitleRef = useRef(null);
  const philosophyBlocksRef = useRef([]);
  const successBlocksRef = useRef([]);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Student Life section animation
    gsap.from(studentLifeRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: studentLifeRef.current,
        start: "top 80%",
      }
    });
    
    // Statements Banner animation
    gsap.from(statementsBannerRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: statementsBannerRef.current,
        start: "top 80%",
      }
    });
    
    // School Values animations - staggered
    const valueBlocks = [
      themeBlockRef.current,
      visionBlockRef.current, 
      missionBlockRef.current,
      mottoBlockRef.current
    ];
    
    gsap.from(valueBlocks, {
      opacity: 1,
      y: 20,
      stagger: 0.2,
      duration: 0.7,
      scrollTrigger: {
        trigger: themeBlockRef.current,
        start: "top 80%",
      }
    });
    
    // History block animation
    gsap.from(historyBlockRef.current, {
      opacity: 1,
      x: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: historyBlockRef.current,
        start: "top 80%",
      }
    });
    
    // Campus list items animation
    gsap.from(campusItemsRef.current, {
      opacity: 1,
      x: 20,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: campusListRef.current,
        start: "top 80%",
      }
    });
    
    // Educational Philosophy title animation
    gsap.from(philosophyTitleRef.current, {
      opacity: 1,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: philosophyTitleRef.current,
        start: "top 85%",
      }
    });
    
    // Philosophy blocks animation
    gsap.from(philosophyBlocksRef.current, {
      opacity: 1,
      y: 40,
      stagger: 0.25,
      duration: 0.7,
      scrollTrigger: {
        trigger: philosophyBlocksRef.current[0],
        start: "top 80%",
      }
    });
    
    // Success blocks animation
    gsap.from(successBlocksRef.current, {
      opacity: 1,
      y: 50,
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: successBlocksRef.current[0],
        start: "top 85%",
      }
    });
  }, []);

  // Function to add campus items to refs array
  const addToCampusItemsRef = (el) => {
    if (el && !campusItemsRef.current.includes(el)) {
      campusItemsRef.current.push(el);
    }
  };

  // Function to add philosophy blocks to refs array
  const addToPhilosophyBlocksRef = (el) => {
    if (el && !philosophyBlocksRef.current.includes(el)) {
      philosophyBlocksRef.current.push(el);
    }
  };

  // Function to add success blocks to refs array
  const addToSuccessBlocksRef = (el) => {
    if (el && !successBlocksRef.current.includes(el)) {
      successBlocksRef.current.push(el);
    }
  };

  return (
    <div className={styles.schoolPage}>
      {/* Student Life Section */}
      {/* <section className={styles.studentLifeSection}>
        <div className={styles.container}>
          <div className={styles.studentLifeMenu}>
            <ul>
              <li><a href="#sports">Sports & Athletics</a></li>
              <li><a href="#clubs">Clubs & Activities</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          
          <div className={styles.studentLifeContent} ref={studentLifeRef}>
            <h2>STUDENT LIFE</h2>
            <p>
              Experience vibrant student life at Seeta. Our diverse clubs, exciting events, and supportive
              community offer opportunities to connect with peers, pursue your passions, and create lasting
              memories.
            </p>
          </div>
        </div>
      </section> */}

      {/* Statements Banner Section */}
      {/* <section className={styles.statementsBanner}>
        <h1 ref={statementsBannerRef}>STATEMENTS</h1>
      </section> */}

      {/* School Values Section */}
      <section className={styles.schoolValues}>
        <div className={styles.container}>
          <div className={styles.valuesWrapper}>
            <div className={styles.valuesLeft}>
              <div className={`${styles.valueBlock} ${styles.themeBlock}`} ref={themeBlockRef}>
                <h3>» THEME</h3>
                <p>Our Family, Our Strength</p>
              </div>

              <div className={`${styles.valueBlock} ${styles.visionBlock}`} ref={visionBlockRef}>
                <h3>» VISION</h3>
                <p>To be a model school in molding God-fearing, academically excellent and responsible leaders.</p>
              </div>

              <div className={`${styles.valueBlock} ${styles.missionBlock}`} ref={missionBlockRef}>
                <h3>» MISSION</h3>
                <p>To develop academic and other talents of students in a truly humane and Christian environment.</p>
              </div>

              <div className={`${styles.valueBlock} ${styles.mottoBlock}`} ref={mottoBlockRef}>
                <h3>» MOTTO</h3>
                <p>Education For A Bright Future</p>
              </div>
            </div>

            <div className={styles.valuesRight} ref={historyBlockRef}>
              <div className={styles.historyBlock}>
                <h3>Our History</h3>
                <p>
                  Established in 2000, Seeta High School has proudly stood as a Towering Academic Giant for 
                  24 years, making its mark on the national educational landscape. Located in Mukono district, 
                  we are a mixed boarding secondary school offering both Ordinary and Advanced Levels of 
                  education. As a Christian institution, we integrate faith into all our activities, mentoring 
                  students in both academics and values.
                </p>

                <p>Seeta High School spans four campuses:</p>

                <ul ref={campusListRef}>
                  <li ref={addToCampusItemsRef}>• Main Campus (Seeta, before Kiranga trading center)</li>
                  <li ref={addToCampusItemsRef}>• A-level Campus (1km past Watertek, along Kampala-Jinja Highway)</li>
                  <li ref={addToCampusItemsRef}>• Mukono Campus (3km past Mukono town, along Kampala-Jinja Highway)</li>
                  <li ref={addToCampusItemsRef}>• Green Campus (1km along Kayunga-Bugerere Road)</li>
                </ul>

                <p>
                  With modern policies and structures across all campuses, we emphasize academic 
                  excellence in our students. Our serene environment, state-of-the-art facilities, and easy 
                  accessibility create the perfect setting for learning. We pride ourselves in offering a holistic, 
                  high-quality education that nurtures both academic success and talent development.
                </p>

                <div className={styles.campusBtn}>
                  <a href="#campuses">OUR CAMPUSES</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Philosophy Section */}
      <section className={styles.eduPhilosophy}>
        <div className={styles.container}>
          <h2 ref={philosophyTitleRef}>Educational Philosophy</h2>

          <div className={styles.philosophyBlocks}>
            <div 
              className={`${styles.philosophyBlock} ${styles.learnerCentered}`}
              ref={addToPhilosophyBlocksRef}
            >
              <h3>Learner-centered</h3>
              <p>
                Students are given the chance and encouragement to take control of their own learning 
                acknowledging their own frames of past experiences and cultural advantages. Teacher 
                guides focus on an environment that's conducive to student independence. They 
                achieve this by nurturing student resilience, utilizing engaging academic and social 
                creative activities.
              </p>
            </div>

            <div 
              className={`${styles.philosophyBlock} ${styles.teacherMethods}`}
              ref={addToPhilosophyBlocksRef}
            >
              <h3>Teacher Methods</h3>
              <p>
                Instead of simply relying on traditional lectures, teacher starts employing questioning 
                techniques, direct teaching and provide creative opportunities while still necessarily 
                fostering a more engaging and personalized learning process.
              </p>
            </div>

            <div 
              className={`${styles.philosophyBlock} ${styles.learningSpace}`}
              ref={addToPhilosophyBlocksRef}
            >
              <h3>Learning is not bound by time or space</h3>
              <p>
                Learning can take place at any time or any place outside classroom classrooms. Not 
                just in classrooms, today's education off-campus programs in academics, study sports. 
                While not straying behind, the school applies to this ideal and practices flexibility in 
                learning environments.
              </p>
            </div>

            <div 
              className={`${styles.philosophyBlock} ${styles.studentSuccess}`}
              ref={addToPhilosophyBlocksRef}
            >
              <h3>Students Success in their educational journeys</h3>
            </div>
          </div>

          <div className={styles.successBlocks}>
            {[1, 2, 3].map((index) => (
              <div 
                key={index}
                className={styles.successBlock}
                ref={addToSuccessBlocksRef}
              >
                <h3>Students Success in their educational journeys</h3>
                <p>
                  Students with a strong foundation can master college-level content while in high 
                  school, often learning and retaining the material more effectively than in a traditional 
                  setting. The achievement rates from dual high school/college credit courses are 
                  consistently higher than those in regular college prep. Similarly, elementary and 
                  middle school students, when properly guided, can often excel in any high school-level 
                  work.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statements;