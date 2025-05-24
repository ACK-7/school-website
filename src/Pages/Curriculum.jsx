import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import Curriculum from "../Components/Curriculum";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Curriculum />  
      <Footer />
    </div>
  );
};

export default About;
