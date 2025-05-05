"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

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
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })

    // Student Life section animation with improved effects
    if (studentLifeRef.current) {
      gsap.from(studentLifeRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: studentLifeRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
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
          toggleActions: "play none none reverse", 
          markers: false,
        },
      })

      bannerTl
        .from(statementsBannerRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .from(
          bannerTextRef.current,
          {
            opacity: 0,
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
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })
      })
    }

    // History block animation with text reveal
    if (historyBlockRef.current) {
      gsap.from(historyBlockRef.current, {
        opacity: 0,
        x: 70,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: historyBlockRef.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      })

      gsap.from(historyTitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: historyTitleRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      })

      // Animate history text paragraphs
      if (historyTextRef.current && historyTextRef.current.children) {
        Array.from(historyTextRef.current.children).forEach((child, index) => {
          gsap.from(child, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: child,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
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
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })
      })
    }

    // Campus button animation
    if (campusBtnRef.current) {
      gsap.from(campusBtnRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: campusBtnRef.current,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none reverse",
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
        span.style.opacity = "0"
        philosophyTitleRef.current.appendChild(span)
      })

      // Animate each character
      gsap.to(philosophyTitleRef.current.children, {
        opacity: 1,
        stagger: 0.03,
        duration: 0.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: philosophyTitleRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      })
    }

    // Philosophy blocks animation with staggered reveal and hover effects
    if (philosophyBlocksRef.current.length) {
      philosophyBlocksRef.current.forEach((block, index) => {
        // Initial animation on scroll
        gsap.from(block, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 90%", // Trigger earlier
            end: "top 50%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })

        // Create hover animations
        block.addEventListener("mouseenter", () => {
          gsap.to(block, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          })
        })

        block.addEventListener("mouseleave", () => {
          gsap.to(block, {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          })
        })
      })
    }

    // Success blocks animation with staggered reveal and hover effects
    if (successBlocksRef.current.length) {
      successBlocksRef.current.forEach((block, index) => {
        // Initial animation on scroll
        gsap.from(block, {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })

        // Create hover animations
        block.addEventListener("mouseenter", () => {
          gsap.to(block, {
            x: index % 2 === 0 ? -5 : 5,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          })
        })

        block.addEventListener("mouseleave", () => {
          gsap.to(block, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          })
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
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Student Life Section */}
      <section ref={studentLifeRef} className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Student Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add your student life content here */}
          </div>
        </div>
      </section>

      {/* Statements Banner */}
      <section ref={statementsBannerRef} className="relative h-[60vh] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div ref={bannerTextRef} className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-5">
          <h2 className="text-5xl font-bold text-white mb-5">Our Statements</h2>
          <p className="text-xl text-white/90 max-w-3xl">
            Discover our core values and guiding principles that shape our educational journey.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesWrapperRef} className="py-20 px-5 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={themeBlockRef} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Theme</h3>
              <p>Our theme statement goes here...</p>
            </div>
            <div ref={visionBlockRef} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p>Our vision statement goes here...</p>
            </div>
            <div ref={missionBlockRef} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p>Our mission statement goes here...</p>
            </div>
            <div ref={mottoBlockRef} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Motto</h3>
              <p>Our motto goes here...</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section ref={historyBlockRef} className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 ref={historyTitleRef} className="text-4xl font-bold text-center mb-10">
            Our History
          </h2>
          <div ref={historyTextRef} className="prose max-w-3xl mx-auto">
            {/* Add your history content here */}
          </div>
        </div>
      </section>

      {/* Campus Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ul ref={campusListRef} className="space-y-8">
            {/* Add your campus items here */}
          </ul>
          <button
            ref={campusBtnRef}
            className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Educational Philosophy Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 ref={philosophyTitleRef} className="text-4xl font-bold text-center mb-10">
            Educational Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add your philosophy blocks here */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Statements