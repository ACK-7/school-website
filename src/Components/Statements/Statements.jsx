"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

const Statements = () => {
  const pageRef = useRef(null);
  const studentLifeRef = useRef(null);
  const statementsBannerRef = useRef(null);
  const bannerTextRef = useRef(null);
  const valuesWrapperRef = useRef(null);
  const themeBlockRef = useRef(null);
  const visionBlockRef = useRef(null);
  const missionBlockRef = useRef(null);
  const mottoBlockRef = useRef(null);
  const historyBlockRef = useRef(null);
  const historyTitleRef = useRef(null);
  const historyTextRef = useRef(null);
  const campusListRef = useRef(null);
  const campusItemsRef = useRef([]);
  const campusBtnRef = useRef(null);
  const philosophyTitleRef = useRef(null);
  const philosophyBlocksRef = useRef([]);
  const successBlocksRef = useRef([]);

  const fadeInUp = {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
  };

  const fadeInLeft = {
    x: -40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
  };

  const fadeInRight = {
    x: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      gsap.to(window, {
        duration: 0.4,
        scrollTo: { y: 0, autoKill: true },
        ease: "power2.inOut",
      });

      gsap.fromTo(
        studentLifeRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: studentLifeRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const bannerTl = gsap.timeline({
        scrollTrigger: {
          trigger: statementsBannerRef.current,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      bannerTl
        .fromTo(
          statementsBannerRef.current,
          { scale: 0.98, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          }
        )
        .fromTo(
          bannerTextRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );

      gsap.fromTo(
        valuesWrapperRef.current,
        { backgroundPosition: "50% 0px" },
        {
          backgroundPosition: `50% ${window.innerHeight / 2.5}px`,
          ease: "none",
          scrollTrigger: {
            trigger: valuesWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      const valueBlocks = [
        themeBlockRef.current,
        visionBlockRef.current,
        missionBlockRef.current,
        mottoBlockRef.current,
      ];

      valueBlocks.forEach((block, index) => {
        gsap.fromTo(
          block,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        historyBlockRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: historyBlockRef.current,
            start: "top 80%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        historyTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: historyTitleRef.current,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (historyTextRef.current?.children) {
        Array.from(historyTextRef.current.children).forEach((child, index) => {
          gsap.fromTo(
            child,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: child,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      if (campusListRef.current && campusItemsRef.current.length) {
        campusItemsRef.current.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      gsap.fromTo(
        campusBtnRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: campusBtnRef.current,
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (philosophyTitleRef.current) {
        const originalText = philosophyTitleRef.current.textContent || "";
        philosophyTitleRef.current.innerHTML = "";

        originalText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          philosophyTitleRef.current.appendChild(span);
        });

        gsap.fromTo(
          philosophyTitleRef.current.children,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.15,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: philosophyTitleRef.current,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (philosophyBlocksRef.current.length) {
        philosophyBlocksRef.current.forEach((block, index) => {
          gsap.fromTo(
            block,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 90%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );

          block.addEventListener("mouseenter", () => {
            gsap.to(block, {
              y: -8,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            });
          });

          block.addEventListener("mouseleave", () => {
            gsap.to(block, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
            });
          });
        });
      }

      if (successBlocksRef.current.length) {
        successBlocksRef.current.forEach((block, index) => {
          gsap.fromTo(
            block,
            {
              x: index % 2 === 0 ? -40 : 40,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            }
          );

          block.addEventListener("mouseenter", () => {
            gsap.to(block, {
              x: index % 2 === 0 ? -5 : 5,
              y: -8,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            });
          });

          block.addEventListener("mouseleave", () => {
            gsap.to(block, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
            });
          });
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToCampusItemsRef = (el) => {
    if (el && !campusItemsRef.current.includes(el)) {
      campusItemsRef.current.push(el);
    }
  };

  const addToPhilosophyBlocksRef = (el) => {
    if (el && !philosophyBlocksRef.current.includes(el)) {
      philosophyBlocksRef.current.push(el);
    }
  };

  const addToSuccessBlocksRef = (el) => {
    if (el && !successBlocksRef.current.includes(el)) {
      successBlocksRef.current.push(el);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        
        .gradient-text {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .card {
          transition: all 0.3s ease;
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <section ref={studentLifeRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 gradient-text">
            Student Life
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vibrant Community</h3>
              <p className="text-gray-600 leading-relaxed">Engage in diverse student activities and clubs.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Services</h3>
              <p className="text-gray-600 leading-relaxed">Access to academic and personal support resources.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Campus Events</h3>
              <p className="text-gray-600 leading-relaxed">Join exciting events throughout the year.</p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={statementsBannerRef}
        className="relative h-[60vh] sm:h-[70vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')"
        }}
      >
        <div ref={bannerTextRef} className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our Statements
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl leading-relaxed">
            Discover our core values and guiding principles that shape our educational journey.
          </p>
        </div>
      </section>

      <section ref={valuesWrapperRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div ref={themeBlockRef} className="card">
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">Theme</h3>
              <p className="text-gray-600 leading-relaxed">Inspiring innovation and excellence in education.</p>
            </div>
            <div ref={visionBlockRef} className="card">
              <h3 className="text-2xl font-semibold text-purple-600 mb-3">Vision</h3>
              <p className="text-gray-600 leading-relaxed">Empowering future leaders through knowledge.</p>
            </div>
            <div ref={missionBlockRef} className="card">
              <h3 className="text-2xl font-semibold text-green-600 mb-3">Mission</h3>
              <p className="text-gray-600 leading-relaxed">Fostering a transformative learning environment.</p>
            </div>
            <div ref={mottoBlockRef} className="card">
              <h3 className="text-2xl font-semibold text-red-600 mb-3">Motto</h3>
              <p className="text-gray-600 leading-relaxed">Learn, Grow, Succeed.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={historyBlockRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 ref={historyTitleRef} className="text-4xl sm:text-5xl font-bold text-center mb-12 gradient-text">
            Our History
          </h2>
          <div ref={historyTextRef} className="prose prose-lg max-w-3xl mx-auto text-gray-600">
            <p>Founded in 1950, our institution began as a small community college...</p>
            <p>Over the decades, we have grown into a leading educational institution...</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <ul ref={campusListRef} className="space-y-6">
            <li ref={addToCampusItemsRef} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Main Campus</h3>
              <p className="text-gray-600 leading-relaxed">A vibrant hub with state-of-the-art facilities.</p>
            </li>
            <li ref={addToCampusItemsRef} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">North Campus</h3>
              <p className="text-gray-600 leading-relaxed">Specialized facilities for science and technology.</p>
            </li>
          </ul>
          <button
            ref={campusBtnRef}
            className="mt-10 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 ref={philosophyTitleRef} className="text-4xl sm:text-5xl font-bold text-center mb-12 gradient-text">
            Educational Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div ref={addToPhilosophyBlocksRef} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Holistic Learning</h3>
              <p className="text-gray-600 leading-relaxed">Fostering intellectual and personal growth.</p>
            </div>
            <div ref={addToPhilosophyBlocksRef} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">Encouraging creative problem-solving.</p>
            </div>
            <div ref={addToPhilosophyBlocksRef} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">Building strong, inclusive connections.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statements;