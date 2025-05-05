import React from "react";
import Navbar1 from "../Components/Navbar1";
import Banner from "../Components/About/Banner";
import HistorySection from "../Components/About/HistorySection";
import CampusSection from "../Components/About/CampusSection";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <HistorySection />
      <CampusSection />
      <Footer />
    </div>
  );
};

export default About;
