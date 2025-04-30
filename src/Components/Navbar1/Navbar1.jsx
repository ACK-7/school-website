import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar1.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    // Only toggle dropdown in mobile view
    if (isMobile) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.containerFluid}>
        <Link to="/" className={styles.navbarBrand}>
          <img src="./src/assets/schoolbadge.png" alt="Badge" className={styles.navbarLogo} />
          <span className={styles.navbarTitle}>SHS</span>
        </Link>
        
        <button 
          className={styles.navbarToggler}
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className={styles.navbarTogglerIcon}></span>
        </button>
        
        <div className={`${styles.navbarCollapse} ${isOpen ? styles.show : ''}`}>
          <ul className={styles.navbarNav}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/">Home</Link>
            </li>
            
            <li className={styles.navItemDropdown}>
              <div className={styles.dropdownToggle}>
                <a 
                  className={styles.navLink} 
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(1);
                  }}
                >
                  About Us
                  <span className={styles.dropdownArrow}>
                    {activeDropdown === 1 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`${styles.megaMenu} ${activeDropdown === 1 ? styles.showMobile : ''}`}>
                <div className={styles.megaMenuContent}>
                  <ul className={styles.megaMenuLinks}>
                    <li><Link to="/about">About SHS</Link></li>
                    <li><Link to="/administration">Administration</Link></li>
                    <li><Link to="/mission-vision">Mission & Vision</Link></li>
                  </ul>
                  <div className={styles.megaMenuContentRight}>
                    <div>
                      <h2 className={styles.megaMenuTitle}>About SHS</h2>
                      <p className={styles.megaMenuDescription}>
                        Seeta High schools' mission is to nurture holistic growth in our students, fostering a deep understanding and love for Christ while providing an exceptional academic foundation.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/aboutus.png"
                        alt="About Us Image"
                        className={styles.navImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={styles.navItemDropdown}>
              <div className={styles.dropdownToggle}>
                <a 
                  className={styles.navLink} 
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(2);
                  }}
                >
                  Admissions
                  <span className={styles.dropdownArrow}>
                    {activeDropdown === 2 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`${styles.megaMenu} ${activeDropdown === 2 ? styles.showMobile : ''}`}>
                <div className={styles.megaMenuContent}>
                  <ul className={styles.megaMenuLinks}>
                    <li><Link to="/apply">Apply Now</Link></li>
                    <li><Link to="/admission-overview">Admission Overview</Link></li>
                    <li><Link to="/fees-structure">School Fees</Link></li>
                  </ul>
                  <div className={styles.megaMenuContentRight}>
                    <div>
                      <h2 className={styles.megaMenuTitle}>ADMISSIONS</h2>
                      <p className={styles.megaMenuDescription}>
                        Join the Seeta Family! When you take part in on-campus tours, 
                        Venture for a Day experiences, and open houses, you will be able 
                        to discover what it means to be part of our extraordinary 
                        community and how we can assist you as you venture to become 
                        the very best version of yourself.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/admission.png" 
                        alt="About Us Image"
                        className={styles.navImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={styles.navItemDropdown}>
              <div className={styles.dropdownToggle}>
                <a 
                  className={styles.navLink} 
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(3);
                  }}
                >
                  Academics
                  <span className={styles.dropdownArrow}>
                    {activeDropdown === 3 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`${styles.megaMenu} ${activeDropdown === 3 ? styles.showMobile : ''}`}>
                <div className={styles.megaMenuContent}>
                  <ul className={styles.megaMenuLinks}>
                    <li><Link to="/curriculum">Curriculum</Link></li>
                    <li><Link to="/academic-calendar">Academic Calendar</Link></li>
                  </ul>
                  <div className={styles.megaMenuContentRight}>
                    <div>
                      <h2 className={styles.megaMenuTitle}>ACADEMICS</h2>
                      <p className={styles.megaMenuDescription}>
                        Experience excellence in education through our comprehensive 
                        academic programs. Our dedicated faculty and innovative curriculum 
                        are designed to challenge, inspire, and prepare you for success 
                        in your chosen field and beyond.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/academics.png" 
                        alt="About Us Image"
                        className={styles.navImage} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={styles.navItemDropdown}>
              <div className={styles.dropdownToggle}>
                <a 
                  className={styles.navLink} 
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(4);
                  }}
                >
                  Student Life
                  <span className={styles.dropdownArrow}>
                    {activeDropdown === 4 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`${styles.megaMenu} ${activeDropdown === 4 ? styles.showMobile : ''}`}>
                <div className={styles.megaMenuContent}>
                  <ul className={styles.megaMenuLinks}>
                    <li><Link to="/sports-athletics">Sports & Athletics</Link></li>
                    <li><Link to="/student-clubs">Clubs & Activities</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                  </ul>
                  <div className={styles.megaMenuContentRight}>
                    <div>
                      <h2 className={styles.megaMenuTitle}>STUDENT LIFE</h2>
                      <p className={styles.megaMenuDescription}>
                        Experience vibrant student life at Seeta. Our diverse clubs, exciting events, and supportive community offer opportunities to connect with peers, pursue your passions, and create lasting memories.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/studentlife.png" 
                        alt="About Us Image"
                        className={styles.navImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/contact-us">Contact Us</Link>
            </li>
          </ul>
          <Link to="/apply" className={styles.btnApply}>APPLY NOW</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;