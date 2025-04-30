import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* School Info */}
          <div className={`${styles.column} ${styles.schoolInfo}`}>
            <div className={styles.logoContainer}>
              <img
                src="./src/assets/schoolbadge.png"
                alt="School Logo"
                className={styles.logo}
              />
              <h5 className={styles.footertitle}>SHS</h5>
            </div>
            <p>
              Seeta High School is committed to excellence in education,
              fostering academic achievement, personal growth, and character
              development in a supportive and innovative learning environment.
              We prioritize the holistic development of our students,
              encouraging creativity, critical thinking, and collaboration.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`${styles.column} ${styles.contactInfo}`}>
            <h5>Contact Information</h5>
            <div className={styles.divider}></div>
            <p>
              <i className="bi bi-geo-alt-fill"></i> P.O BOX 417, Mukono, Uganda
              <br />
              <i className="bi bi-telephone-fill"></i> Main: 0392 001786
              <br />
              <i className="bi bi-telephone-fill"></i> Mukono: 0392 174870
              <br />
              <i className="bi bi-telephone-fill"></i> Green: 0312 515031
              <br />
              <i className="bi bi-envelope-fill"></i> info@seetahighschool.ac.ug
            </p>
            <h5 className={styles.accreditedBy}>Accredited By</h5>
            <img
              src="./src/assets/education_logo.png"
              alt="Accreditation Logo"
              className={styles.accreditedLogo}
            />
            <p>Ministry of Education and Sports</p>
          </div>

          {/* Quick Links */}
          <div className={`${styles.column} ${styles.quickLinks}`}>
            <h5>Quick Links</h5>
            <div className={styles.divider}></div>
            <ul className={styles.linkList}>
              <li>
                <a href="index.html" className={styles.link}>
                  Home
                </a>
              </li>
              <li>
                <a href="about.html" className={styles.link}>
                  About SHS
                </a>
              </li>
              <li>
                <a href="apply.html" className={styles.link}>
                  Apply Now
                </a>
              </li>
              <li>
                <a href="gallery.html" className={styles.link}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="contact-us.html" className={styles.link}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div className={`${styles.column} ${styles.latestNews}`}>
            <h5>Latest News</h5>
            <div className={styles.divider}></div>
            <div className={styles.newsItem}>
              <div className={styles.newsImage}>
                <img
                  src="./src/assets/swimming team.jpeg"
                  alt="News Image"
                  className={styles.newsImg}
                />
              </div>
              <p className={styles.newsDate}>15 MAR</p>
              <p className={styles.newsTitle}>School Sports Day</p>
              <p className={styles.newsDescription}>
                Annual sports day scheduled for next month.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          © 2024 Seeta High School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;