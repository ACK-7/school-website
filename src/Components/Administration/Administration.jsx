import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Administration = () => {
  const sectionRef = useRef(null);
  const adminCardsRef = useRef([]);
  const headteacherCardsRef = useRef([]);
  const boardMembersRef = useRef([]);

  // Function to add elements to refs
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".content-section h1",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      }
    );

    gsap.fromTo(
          ".text-animation",
          { opacity: 0, x: -100 }, 
          {
            opacity: 1,
            x: 0, 
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".message-content",
              start: "top 80%", 
              end: "bottom 50%", 
              scrub: true, 
            },
          }
        );


    const animateCards = (cards) => {
      cards.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
            delay: index * 0.2,
          }
        );
      });
      
    };

    animateCards(adminCardsRef);
    animateCards(headteacherCardsRef);
    animateCards(boardMembersRef);
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Content Section */}
      <section className="py-16 bg-gray-50 content-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-left text-animation">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight transition-all duration-300 hover:text-blue-600">
              We believe that everyone’s a student and everyone’s a teacher.
            </h1>
            <div className="w-24 h-1 bg-blue-500 mb-8 rounded-full transition-all duration-500 hover:w-32"></div>
            <p className="text-lg text-gray-600 leading-relaxed transition-all duration-300 hover:text-gray-800">
              Our faculty and staff are experts in their respective fields and enthusiastic collaborators who enjoy sharing their deep content knowledge and research interests with the community...
            </p>
          </div>
          <div className="md:w-1/2 image-animation">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="School administrators collaborating" 
              className="rounded-lg shadow-lg object-cover w-full h-64 md:h-auto"
            />
          </div>
        </div>
      </div>
    </section>

      {/* School Administrators Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">SCHOOL ADMINISTRATORS</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            The administrators at Seeta High Schools are visionary leaders...
          </p>
          <div className="flex flex-wrap justify-center gap-8 py-8">
            {[
              { name: "Mr. Lumu Charles", role: "Head Of Finance", img: "src/assets/charles.jpeg" },
              { name: "Ms Nagawa Joan", role: "Human Resource", img: "src/assets/Nagawa.jpg" },
              { name: "MR Sekiziyivu Joseph", role: "Financial Officer", img: "src/assets/Joseph.jpg" },
            ].map((admin, idx) => (
              <div
                key={idx}
                className="w-full md:w-1/3"
                ref={(el) => addToRefs(el, adminCardsRef)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white transition-transform duration-300 hover:-translate-y-2">
                  <img 
                    src={admin.img} 
                    alt={admin.name} 
                    className="w-full h-[350px] object-cover transition-transform duration-500" 
                  />
                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-center p-4 transition-colors duration-300">
                    <h5 className="text-xl font-semibold">{admin.name}</h5>
                    <p className="text-sm mt-1">{admin.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headteachers Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Headteachers</h2>
          <p className="text-lg text-gray-600 mb-8">
            Each of our campuses is managed by a Headteacher who oversees the school's programs and activities.
          </p>
          <div className="flex flex-wrap justify-center gap-8 py-8">
            {[
              { 
                name: "Namulondo Lilian", 
                role: "Headteacher | Main Campus",
                img: "src/assets/Paul.jpeg",
                contact: {
                  tel: "+256759700088",
                  email: "namulondo@seetahigh.ac.ug"
                }
              },
              { 
                name: "Namulondo Lilian", 
                role: "Headteacher | Main Campus",
                img: "src/assets/Namulondo-Lilian.jpg",
                contact: {
                  tel: "+256759700088",
                  email: "namulondo@seetahigh.ac.ug"
                }
              },
              { 
                name: "Mr. Ssebukalu Bonny", 
                role: "Headteacher | Main Campus",
                img: "src/assets/Bonny.jpeg",
                contact: {
                  tel: "+256759700088",
                  email: "namulondo@seetahigh.ac.ug"
                }
              },
              { 
                name: "Mr. Songha Ramadhan", 
                role: "Headteacher | Main Campus",
                img: "src/assets/Songha.jpeg",
                contact: {
                  tel: "+256759700088",
                  email: "namulondo@seetahigh.ac.ug"
                }
              }
            ].map((headteacher, idx) => (
              <div
                key={idx}
                className="w-full md:w-1/4"
                ref={(el) => addToRefs(el, headteacherCardsRef)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <img
                    src={headteacher.img}
                    alt={headteacher.name}
                    className="w-full h-[300px] object-cover border-b border-gray-200"
                  />
                  <div className="p-4 text-center">
                    <h5 className="text-xl font-semibold text-gray-800">{headteacher.name}</h5>
                    <p className="text-gray-500 mb-2">{headteacher.role}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Tel: {headteacher.contact.tel}<br />
                      Email: {headteacher.contact.email}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <i className="bi bi-facebook text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                        <i className="bi bi-twitter text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
                        <i className="bi bi-linkedin text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Trustees Section */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Meet the School Heads</h2>
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg text-gray-600">
              Discover the leadership that makes Seeta schools a special place: Meet our School heads.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Board members content will go here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Administration;
