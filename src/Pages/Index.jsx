import React from 'react'
import Hero from '../Components/Hero/Hero'
import Services from '../Components/Service-section/Services'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Strips from '../Components/Strips/Strips';
import Message from '../Components/Message/Message';
import CounterSection from '../Components/CounterSection/CounterSection';
import WhyChooseUs from '../Components/WhyChooseUs/WhyChooseUs';
import FacilitiesSection from '../Components/FacilitiesSection/FacilitiesSection';
import TestimonialSlider from '../Components/TestimonialSlider/TestimonialSlider';
import CallToActionSection from '../Components/CallToActionSection/CallToActionSection';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar1/Navbar1';
import ImportantDays from '../Components/ImportantDays/ImportantDays';
import SeetaHighlights from '../Components/SeetaHighlights/SeetaHighlights';


const Index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Strips />
      <Message />
      <CounterSection />
      <WhyChooseUs />
      <FacilitiesSection />
      <TestimonialSlider />
      <ImportantDays />
      <CallToActionSection />
      <SeetaHighlights />
      <Footer />
    </div>
  )
}

export default Index
