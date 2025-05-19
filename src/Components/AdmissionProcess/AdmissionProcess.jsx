import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import admissionProcessImage from '../../assets/admission-process.png'; 

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AdmissionsProcess = () => {
  useEffect(() => {
    // Hero section animations with parallax
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power4.out' }
    );
    gsap.fromTo(
      '.hero-image',
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
    );

    // Banner animation with scale and fade
    gsap.fromTo(
      '.banner-container',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.banner-container',
          start: 'top 80%',
        },
      }
    );

    // Process items animation with staggered reveal
    gsap.fromTo(
      '.process-item',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 75%',
        },
      }
    );

    // Quote section with parallax background
    gsap.fromTo(
      '.quote-image',
      { y: 100 },
      {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.quote-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      '.quote-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quote-section',
          start: 'top 80%',
        },
      }
    );

    // Why Choose section cards animation
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-container',
          start: 'top 75%',
        },
      }
    );

    // Alert section animation
    gsap.fromTo(
      '.alert-section',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.alert-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      
      <section className="relative h-screen bg-gradient-to-br  text-white overflow-hidden ">
        
        <img
          src={admissionProcessImage}
          alt="Vibrant school campus with students walking"
          className="hero-image absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 h-full flex items-center justify-center ">
          <div className="text-center z-10 ">
            <h1 className="hero-title text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Admission Process Overview
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Embark on a transformative educational journey at Seeta High School, where excellence meets opportunity.
            </p>
            <a
              href="/apply"
              className="mt-6 inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* Banner Component */}
      <section className="py-16 bg-white">
        <div className="banner-container container mx-auto px-6">
          <div className="relative bg-blue-50 rounded-2xl p-10 shadow-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/600x400?text=School+Community"
              alt="Students collaborating in a classroom"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Join the Seeta Family
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
                Discover a vibrant community that fosters academic excellence, personal growth, and spiritual development. Schedule a campus tour or attend an open house to experience Seeta High School firsthand.
              </p>
              <a
                href="/apply"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Prospective Students
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Thank you for considering Seeta High School. Our admissions process is designed to be straightforward and supportive, ensuring every applicant has the opportunity to join our community. For inquiries, contact our Admissions Office at{' '}
            <a href="mailto:admissions@seeta.edu" className="text-blue-600 hover:underline font-medium">
              admissions@seeta.edu
            </a>.
          </p>

          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Our Admissions Process
          </h3>
          <div className="process-container max-w-4xl mx-auto">
            {[
              { text: 'Fill out the Request More Information form to receive application materials from our Admissions Office.', img: 'https://via.placeholder.com/150?text=Form' },
              { text: 'Complete and submit the application form along with all required supporting documents.', img: 'https://via.placeholder.com/150?text=Application' },
              { text: 'Pay the non-refundable application processing fee to proceed with your application.', img: 'https://via.placeholder.com/150?text=Payment' },
              { text: 'Once all materials are received, your child’s application will be reviewed and placed on the appropriate waiting list based on submission date.', img: 'https://via.placeholder.com/150?text=Review' },
              { text: 'If a spot is available, provisional acceptance will be granted. Submit enrollment forms and deposit within 30 days to secure your place.', img: 'https://via.placeholder.com/150?text=Acceptance' },
              { text: 'Upon receipt and review of enrollment forms and full deposit payment, final acceptance will be confirmed.', img: 'https://via.placeholder.com/150?text=Confirmation' },
            ].map((step, index) => (
              <div
                key={index}
                className="process-item flex items-center mb-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={step.img}
                  alt={`Step ${index + 1} illustration`}
                  className="w-16 h-16 object-cover rounded-full mr-6"
                />
                <div>
                  <span className="text-blue-600 font-bold text-2xl mr-4">{index + 1}.</span>
                  <p className="text-gray-700 text-lg">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section relative py-20 bg-blue-100 overflow-hidden">
        <img
          src="https://via.placeholder.com/1920x600?text=Inspirational+Background"
          alt="Inspirational school background with students"
          className="quote-image absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="quote-content container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 italic mb-6">
            "Education is the most powerful weapon which you can use to change the world."
          </h3>
          <p className="text-gray-600 text-lg">— Nelson Mandela</p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Seeta High School?
          </h3>
          <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Holistic Education',
                text: 'Our curriculum integrates academic rigor with spiritual and personal growth, preparing students for success in all aspects of life.',
                img: 'https://via.placeholder.com/400x300?text=Holistic+Education',
              },
              {
                title: 'Dedicated Faculty',
                text: 'Our experienced educators are committed to nurturing each student’s unique talents and fostering a love for learning.',
                img: 'https://via.placeholder.com/400x300?text=Faculty',
              },
              {
                title: 'Vibrant Community',
                text: 'Join a supportive community where students build lifelong friendships and engage in diverse extracurricular activities.',
                img: 'https://via.placeholder.com/400x300?text=Community',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-blue-800 mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="alert-section py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="relative bg-blue-50 p-8 rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/600x400?text=School+Notice"
              alt="School notice board"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10">
              <h4 className="text-2xl font-semibold text-blue-800 mb-6">Important Notes for Applicants</h4>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
                <li>Submit results of a standardized achievement test from the last two years.</li>
                <li>Non-native English speakers must provide English Proficiency test results.</li>
                <li>New high school students will take math and foreign language screening tests.</li>
                <li>Band and choir applicants must audition for enrollment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsProcess;