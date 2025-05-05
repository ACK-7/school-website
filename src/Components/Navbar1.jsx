import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <nav className={`fixed z-50 w-full top-0 left-0 py-4 px-8 transition-all duration-300 ease-in-out ${scrolled ? 'backdrop-blur-md bg-black/70' : 'bg-transparent'} lg:py-4 lg:px-8 md:py-2 md:px-4`}>
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="flex items-center gap-2 z-50 no-underline">
          <img src="./src/assets/schoolbadge.png" alt="Badge" className="w-[60px] h-auto" />
          <span className="text-[25px] text-white font-sans">SHS</span>
        </Link>
        
        <button 
          className="hidden lg:hidden md:block p-1 bg-transparent border border-white/10 rounded text-white cursor-pointer z-50"
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="inline-block w-6 h-6 bg-no-repeat bg-center bg-contain" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")" }}></span>
        </button>
        
        <div className={`flex-1 flex items-center ${isMobile ? 'fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex-col items-start w-full h-screen pt-20 pb-5 px-5 overflow-y-auto z-40' : ''} ${isOpen || !isMobile ? 'block' : 'hidden'}`}>
          <ul className={`ml-auto mr-4 flex list-none pl-0 ${isMobile ? 'flex-col w-full m-0 p-0' : 'flex-row items-center'}`}>
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''}`}>
              <Link className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`} to="/">Home</Link>
            </li>
            
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(1);
                  }}
                >
                  About Us
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-xs`}>
                    {activeDropdown === 1 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`fixed lg:left-1/2 lg:-translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-md 
                              ${isMobile ? 'relative w-full left-0 transform-none shadow-none bg-transparent py-0 px-0' : 'opacity-0 invisible pointer-events-none transition-opacity duration-300'} 
                              ${activeDropdown === 1 ? '!block' : ''} 
                              ${!isMobile ? 'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto' : ''} z-50`}>
                <div className={`max-w-6xl mx-auto ${isMobile ? 'grid grid-cols-1 gap-4 p-0' : 'grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 p-2.5 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/about" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        About SHS
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/administration" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Administration
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/mission-vision" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Mission & Vision
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">About SHS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Seeta High schools' mission is to nurture holistic growth in our students, fostering a deep understanding and love for Christ while providing an exceptional academic foundation.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/aboutus.png"
                        alt="About Us Image"
                        className="w-[150px] h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(2);
                  }}
                >
                  Admissions
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-xs`}>
                    {activeDropdown === 2 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`fixed lg:left-1/2 lg:-translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-md 
                              ${isMobile ? 'relative w-full left-0 transform-none shadow-none bg-transparent py-0 px-0' : 'opacity-0 invisible pointer-events-none transition-opacity duration-300'} 
                              ${activeDropdown === 2 ? '!block' : ''} 
                              ${!isMobile ? 'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto' : ''} z-50`}>
                <div className={`max-w-6xl mx-auto ${isMobile ? 'grid grid-cols-1 gap-4 p-0' : 'grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 p-2.5 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/apply" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admission-overview" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Admission Overview
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/fees-structure" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        School Fees
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">ADMISSIONS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
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
                        className="w-[150px] h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(3);
                  }}
                >
                  Academics
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-xs`}>
                    {activeDropdown === 3 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`fixed lg:left-1/2 lg:-translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-md 
                              ${isMobile ? 'relative w-full left-0 transform-none shadow-none bg-transparent py-0 px-0' : 'opacity-0 invisible pointer-events-none transition-opacity duration-300'} 
                              ${activeDropdown === 3 ? '!block' : ''} 
                              ${!isMobile ? 'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto' : ''} z-50`}>
                <div className={`max-w-6xl mx-auto ${isMobile ? 'grid grid-cols-1 gap-4 p-0' : 'grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 p-2.5 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/curriculum" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Curriculum
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/academic-calendar" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Academic Calendar
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">ACADEMICS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
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
                        className="w-[150px] h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(4);
                  }}
                >
                  Student Life
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-xs`}>
                    {activeDropdown === 4 ? '▲' : '▼'}
                  </span>
                </a>
              </div>
              <div className={`fixed lg:left-1/2 lg:-translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-md 
                              ${isMobile ? 'relative w-full left-0 transform-none shadow-none bg-transparent py-0 px-0' : 'opacity-0 invisible pointer-events-none transition-opacity duration-300'} 
                              ${activeDropdown === 4 ? '!block' : ''} 
                              ${!isMobile ? 'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto' : ''} z-50`}>
                <div className={`max-w-6xl mx-auto ${isMobile ? 'grid grid-cols-1 gap-4 p-0' : 'grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 p-2.5 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/sports-athletics" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Sports & Athletics
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/student-clubs" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Clubs & Activities
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/gallery" 
                        className={`block py-3 ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'} transition-all duration-300 ease-in-out no-underline`}
                      >
                        Gallery
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">STUDENT LIFE</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Experience vibrant student life at Seeta. Our diverse clubs, exciting events, and supportive community offer opportunities to connect with peers, pursue your passions, and create lasting memories.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/studentlife.png" 
                        alt="About Us Image"
                        className="w-[150px] h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className={`relative ${isMobile ? 'w-full border-b border-white/10' : ''}`}>
              <Link className={`text-white font-medium py-2 px-4 transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 ${isMobile ? 'py-4 px-0 text-lg' : ''}`} to="/contact-us">Contact Us</Link>
            </li>
          </ul>
          <Link 
            to="/apply" 
            className={`bg-[#DAA520] text-white border-none rounded-full py-2 px-6 font-medium no-underline transition-all duration-300 ease-in-out hover:bg-[#c69500] hover:text-white ${isMobile ? 'mt-6 inline-block w-full text-center py-3' : ''}`}
          >
            APPLY NOW
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;