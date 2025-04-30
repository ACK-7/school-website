import React, { useEffect, useRef } from "react";
import styles from "./Administration.module.css";
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
      <section className={`${styles.contentSection} content-section`}>
        <div className={styles.container}>
          <h1>We believe that everyone's a student and everyone's a teacher.</h1>
          <p>
            Our faculty and staff are experts in their respective fields and enthusiastic collaborators who enjoy sharing their deep content knowledge and research interests with the community...
          </p>
        </div>
      </section>

      {/* School Administrators Section */}
      <section className={`${styles.adminSection} py-5 bg-light`}>
        <div className={styles.container}>
          <h2 className={styles.headteacher}>SCHOOL ADMINISTRATORS</h2>
          <p className={styles.headteacherDescription}>
            The administrators at Seeta High Schools are visionary leaders...
          </p>
          <div className={styles.adminCards}>
            {[
              { name: "Mr. Lumu Charles", role: "Head Of Finance", img: "src/assets/charles.jpeg" },
              { name: "Ms Nagawa Joan", role: "Human Resource", img: "src/assets/Nagawa.jpg" },
              { name: "MR Sekiziyivu Joseph", role: "Financial Officer", img: "src/assets/Joseph.jpg" },
            ].map((admin, idx) => (
              <div
                key={idx}
                className="col-md-4"
                ref={(el) => addToRefs(el, adminCardsRef)}
              >
                <div className={styles.adminCard}>
                  <img src={admin.img} alt={admin.name} className="img-fluid rounded" />
                  <div className={styles.adminOverlay}>
                    <h5>{admin.name}</h5>
                    <p>{admin.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headteachers Section */}
      <section className={`${styles.headteacherSection} py-5`}>
        <div className="container text-center">
          <h2 className={styles.headteacher}>Meet Our Headteachers</h2>
          <p className={styles.headteacherDescription}>
            Each of our campuses is managed by a Headteacher who oversees the school’s programs and activities.
          </p>
          <div className={styles.headteacherCards}>
            <div
              className="col-md-3"
              ref={(el) => addToRefs(el, headteacherCardsRef)}
            >
              <div className={styles.headteacherCard}>
                <img
                  src="src/assets/Paul.jpeg"
                  alt="Namulondo Lilian"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Namulondo Lilian</h5>
                  <p className="text-muted">Headteacher | Main Campus</p>
                  <p>
                    Tel: +256759700088<br />
                    Email: namulondo@seetahigh.ac.ug
                  </p>
                  <div className={styles.socialIcons}>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-dark">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              ref={(el) => addToRefs(el, headteacherCardsRef)}
            >
              <div className={styles.headteacherCard}>
                <img
                  src="src/assets/Namulondo-Lilian.jpg"
                  alt="Namulondo Lilian"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Namulondo Lilian</h5>
                  <p className="text-muted">Headteacher | Main Campus</p>
                  <p>
                    Tel: +256759700088<br />
                    Email: namulondo@seetahigh.ac.ug
                  </p>
                  <div className={styles.socialIcons}>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-dark">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              ref={(el) => addToRefs(el, headteacherCardsRef)}
            >
              <div className={styles.headteacherCard}>
                <img
                  src="src/assets/Bonny.jpeg"
                  alt="Namulondo Lilian"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Mr. Ssebukalu Bonny</h5>
                  <p className="text-muted">Headteacher | Main Campus</p>
                  <p>
                    Tel: +256759700088<br />
                    Email: namulondo@seetahigh.ac.ug
                  </p>
                  <div className={styles.socialIcons}>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-dark">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              ref={(el) => addToRefs(el, headteacherCardsRef)}
            >
              <div className={styles.headteacherCard}>
                <img
                  src="src/assets/Songha.jpeg"
                  alt="Namulondo Lilian"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Mr. Songha Ramadhan</h5>
                  <p className="text-muted">Headteacher | Main Campus</p>
                  <p>
                    Tel: +256759700088<br />
                    Email: namulondo@seetahigh.ac.ug
                  </p>
                  <div className={styles.socialIcons}>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-dark me-2">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-dark">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Trustees Section */}
      <section className={styles.boardSection}>
        <div className="container">
          <h2>Meet the School Heads</h2>
          <div className={styles.boardDescription}>
            <p>
              Discover the leadership that makes Seeta schools a special place: Meet our School heads.
            </p>
          </div>
          <div className={styles.boardMembers}>
            {[
              {
                name: "Mrs. Rose Namayanja Muyingo",
                role: "Director",
                img: "src/assets/Director.jpeg",
              },
              {
                name: "Mr. Kafumbe Davis",
                role: "Principal",
                img: "src/assets/principal.jpeg",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className={styles.boardColumn}
                ref={(el) => addToRefs(el, boardMembersRef)}
              >
                <ul>
                  <li>
                    <img
                      src={member.img}
                      alt={member.name}
                      className={styles.boardImage}
                    />
                  </li>
                  <li>{member.name}</li>
                  <li>{member.role}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Administration;
