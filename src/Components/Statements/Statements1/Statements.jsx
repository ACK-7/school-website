"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"
import styles from "./Statements.module.css"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

const Statements = () => {
  // Create refs for animated elements
  const pageRef = useRef(null)
  const studentLifeRef = useRef(null)
  const statementsBannerRef = useRef(null)
  const bannerTextRef = useRef(null)
  const valuesWrapperRef = useRef(null)
  const themeBlockRef = useRef(null)
  const visionBlockRef = useRef(null)
  const missionBlockRef = useRef(null)
  const mottoBlockRef = useRef(null)
  const historyBlockRef = useRef(null)
  const historyTitleRef = useRef(null)
  const historyTextRef = useRef(null)
  const campusListRef = useRef(null)
  const campusItemsRef = useRef([])
  const campusBtnRef = useRef(null)
  const philosophyTitleRef = useRef(null)
  const philosophyBlocksRef = useRef([])
  const successBlocksRef = useRef([])

  useEffect(() => {
    // Scroll to top on component mount with smooth animation
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.inOut",
    })

    // Initial page load animation
    const pageLoadTl = gsap.timeline()
    pageLoadTl.from(pageRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })

    // Student Life section animation with improved effects
    if (studentLifeRef.current) {
      gsap.from(studentLifeRef.current, {
        y: 50,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: studentLifeRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })
    }

    // Statements Banner animation with text reveal
    if (statementsBannerRef.current && bannerTextRef.current) {
      const bannerTl = gsap.timeline({
        scrollTrigger: {
          trigger: statementsBannerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })

      bannerTl
        .from(statementsBannerRef.current, {
          scale: 0.95,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
        .from(
          bannerTextRef.current,
          {
            opacity: 1,
            y: 30,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        )
    }

    // Values section animations with staggered reveal and parallax effect
    if (valuesWrapperRef.current) {
      // Create parallax effect for the values section
      gsap.to(valuesWrapperRef.current, {
        backgroundPosition: `50% ${window.innerHeight / 2}px`,
        ease: "none",
        scrollTrigger: {
          trigger: valuesWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Animate value blocks with staggered effect
      const valueBlocks = [
        themeBlockRef.current,
        visionBlockRef.current,
        missionBlockRef.current,
        mottoBlockRef.current,
      ]

      valueBlocks.forEach((block, index) => {
        gsap.from(block, {
          opacity: 1,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
            markers: false,
          },
        })
      })
    }

    // History block animation with text reveal
    if (historyBlockRef.current) {
      gsap.from(historyBlockRef.current, {
        opacity: 1,
        x: 70,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: historyBlockRef.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })

      gsap.from(historyTitleRef.current, {
        opacity: 1,
        y: 20,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: historyTitleRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })

      // Animate history text paragraphs
      if (historyTextRef.current && historyTextRef.current.children) {
        Array.from(historyTextRef.current.children).forEach((child, index) => {
          gsap.from(child, {
            opacity: 1,
            y: 20,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: child,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
              markers: false,
            },
          })
        })
      }
    }

    // Campus list items animation with improved stagger
    if (campusListRef.current && campusItemsRef.current.length) {
      campusItemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          opacity: 1,
          x: -30,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
            markers: false,
          },
        })
      })
    }

    // Campus button animation
    if (campusBtnRef.current) {
      gsap.from(campusBtnRef.current, {
        opacity: 1,
        y: 20,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: campusBtnRef.current,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })
    }

    // Educational Philosophy title animation with text split effect
    if (philosophyTitleRef.current) {
      // Clear any existing content first to avoid duplication
      const originalText = philosophyTitleRef.current.textContent || ""
      philosophyTitleRef.current.innerHTML = ""

      // Create spans for each character
      originalText.split("").forEach((char) => {
        const span = document.createElement("span")
        span.textContent = char === " " ? "\u00A0" : char // Use non-breaking space for spaces
        span.style.display = "inline-block"
        span.style.opacity = "1"
        philosophyTitleRef.current.appendChild(span)
      })

      // Animate each character
      gsap.to(philosophyTitleRef.current.children, {
        opacity: 1,
        stagger: 0.03,
        duration: 0.1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: philosophyTitleRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
          markers: false,
        },
      })
    }

    // Philosophy blocks animation with staggered reveal and hover effects
    if (philosophyBlocksRef.current.length) {
      philosophyBlocksRef.current.forEach((block, index) => {
        // Initial animation on scroll
        gsap.from(block, {
          opacity: 1,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
            markers: false,
          },
        })

        // Create hover animations
        const hoverIn = gsap.to(block, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          paused: true,
        })

        const hoverOut = gsap.to(block, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          paused: true,
        })

        // Add event listeners
        block.addEventListener("mouseenter", () => hoverIn.play())
        block.addEventListener("mouseleave", () => {
          hoverIn.reverse()
          setTimeout(() => hoverOut.play(), 300)
        })
      })
    }

    // Success blocks animation with staggered reveal and hover effects
    if (successBlocksRef.current.length) {
      successBlocksRef.current.forEach((block, index) => {
        // Initial animation on scroll
        gsap.from(block, {
          opacity: 1,
          x: index % 2 === 0 ? -50 : 50,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
            markers: false,
          },
        })

        // Create hover animations
        const hoverIn = gsap.to(block, {
          x: index % 2 === 0 ? -5 : 5,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          paused: true,
        })

        const hoverOut = gsap.to(block, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          paused: true,
        })

        // Add event listeners
        block.addEventListener("mouseenter", () => hoverIn.play())
        block.addEventListener("mouseleave", () => {
          hoverIn.reverse()
          setTimeout(() => hoverOut.play(), 300)
        })
      })
    }

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Function to add campus items to refs array
  const addToCampusItemsRef = (el) => {
    if (el && !campusItemsRef.current.includes(el)) {
      campusItemsRef.current.push(el)
    }
  }

  // Function to add philosophy blocks to refs array
  const addToPhilosophyBlocksRef = (el) => {
    if (el && !philosophyBlocksRef.current.includes(el)) {
      philosophyBlocksRef.current.push(el)
    }
  }

  // Function to add success blocks to refs array
  const addToSuccessBlocksRef = (el) => {
    if (el && !successBlocksRef.current.includes(el)) {
      successBlocksRef.current.push(el)
    }
  }

  return (
    <div className={styles.schoolPage} ref={pageRef}>
    
      {/* School Values Section */}
      <section className={styles.schoolValues}>
        <div className={styles.container}>
          <div className={styles.valuesWrapper} ref={valuesWrapperRef}>
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
                <h3 ref={historyTitleRef}>Our History</h3>
                <div ref={historyTextRef}>
                  <p>
                    Established in 2000, Seeta High School has proudly stood as a Towering Academic Giant for 24 years,
                    making its mark on the national educational landscape. Located in Mukono district, we are a mixed
                    boarding secondary school offering both Ordinary and Advanced Levels of education. As a Christian
                    institution, we integrate faith into all our activities, mentoring students in both academics and
                    values.
                  </p>

                  <p>Seeta High School spans four campuses:</p>
                </div>

                <ul ref={campusListRef}>
                  <li ref={addToCampusItemsRef}>• Main Campus (Seeta, before Kiranga trading center)</li>
                  <li ref={addToCampusItemsRef}>• A-level Campus (1km past Watertek, along Kampala-Jinja Highway)</li>
                  <li ref={addToCampusItemsRef}>• Mukono Campus (3km past Mukono town, along Kampala-Jinja Highway)</li>
                  <li ref={addToCampusItemsRef}>• Green Campus (1km along Kayunga-Bugerere Road)</li>
                </ul>

                <p>
                  With modern policies and structures across all campuses, we emphasize academic excellence in our
                  students. Our serene environment, state-of-the-art facilities, and easy accessibility create the
                  perfect setting for learning. We pride ourselves in offering a holistic, high-quality education that
                  nurtures both academic success and talent development.
                </p>

                <div className={styles.campusBtn} ref={campusBtnRef}>
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
            <div className={`${styles.philosophyBlock} ${styles.learnerCentered}`} ref={addToPhilosophyBlocksRef}>
              <h3>Learner-centered</h3>
              <p>
                Students are given the chance and encouragement to take control of their own learning acknowledging
                their own frames of past experiences and cultural advantages. Teacher guides focus on an environment
                that's conducive to student independence. They achieve this by nurturing student resilience, utilizing
                engaging academic and social creative activities.
              </p>
            </div>

            <div className={`${styles.philosophyBlock} ${styles.teacherMethods}`} ref={addToPhilosophyBlocksRef}>
              <h3>Teacher Methods</h3>
              <p>
                Instead of simply relying on traditional lectures, teacher starts employing questioning techniques,
                direct teaching and provide creative opportunities while still necessarily fostering a more engaging and
                personalized learning process.
              </p>
            </div>

            <div className={`${styles.philosophyBlock} ${styles.learningSpace}`} ref={addToPhilosophyBlocksRef}>
              <h3>Learning is not bound by time or space</h3>
              <p>
                Learning can take place at any time or any place outside classroom classrooms. Not just in classrooms,
                today's education off-campus programs in academics, study sports. While not straying behind, the school
                applies to this ideal and practices flexibility in learning environments.
              </p>
            </div>

            <div className={`${styles.philosophyBlock} ${styles.studentSuccess}`} ref={addToPhilosophyBlocksRef}>
              <h3>Students Success in their educational journeys</h3>
            </div>
          </div>

          <div className={styles.successBlocks}>
            {[1, 2, 3].map((index) => (
              <div key={index} className={styles.successBlock} ref={addToSuccessBlocksRef}>
                <h3>Students Success in their educational journeys</h3>
                <p>
                  Students with a strong foundation can master college-level content while in high school, often
                  learning and retaining the material more effectively than in a traditional setting. The achievement
                  rates from dual high school/college credit courses are consistently higher than those in regular
                  college prep. Similarly, elementary and middle school students, when properly guided, can often excel
                  in any high school-level work.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Statements
