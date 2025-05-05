import { gsap } from "gsap";
import React from "react";
import directorImage from "../../assets/Director.jpeg";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WelcomeMessage = () => {
  useGSAP(() => {
    // Animate the Director's Image (fade in from left)
    gsap.fromTo(
      ".director-image",
      { opacity: 0, x: -100 }, // Start off-screen to the left
      {
        opacity: 1,
        x: 0, // Slide into the center
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".message-content",
          start: "top 80%", // Start animation when the top of the content is 80% visible
          end: "bottom 50%", // End animation when the bottom of the content is 50% visible
          scrub: true, // Tie animation progress to scroll position
        },
      }
    );

    // Animate the Message Text (fade in from right)
    gsap.fromTo(
      ".message-text",
      { opacity: 0, x: 100 }, // Start off-screen to the right
      {
        opacity: 1,
        x: 0, // Slide into the center
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".message-content",
          start: "top 80%", // Start animation when the top of the content is 80% visible
          end: "bottom 50%", // End animation when the bottom of the content is 50% visible
          scrub: true, // Tie animation progress to scroll position
        },
      }
    );
  }, []);

  return (
    <section className="py-5 px-5 md:px-20 bg-gray-50 text-center">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-800 mb-5">WELCOME TO SEETA HIGH SCHOOLS</h1>
          <p className="text-gray-600 italic text-xl">Mrs. Rose Namayanja Muyingo, Director</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-12 items-start message-content">
          {/* Director's Image */}
          <div className="w-full md:w-1/2 relative director-image">
            <img 
              src={directorImage} 
              alt="School Director" 
              className="w-full h-auto rounded-lg relative z-10 shadow-md"
            />
            <div className="absolute top-5 left-5 right-[-20px] bottom-[-20px] border-4 border-yellow-600 rounded-lg z-0"></div>
          </div>

          {/* Message Text */}
          <div className="w-full md:w-3/5 relative p-8 bg-white rounded-lg shadow-lg text-left leading-relaxed text-lg message-text">
            <div className="absolute -top-8 left-5 text-[120px] text-yellow-600 opacity-20 font-serif">"</div>
            <p className="text-gray-700 leading-loose mb-5 relative z-10">
              Welcome to Seeta High School, an institution dedicated to both academic excellence and
              holistic student development. Our mission is to nurture young minds, equipping them
              with the knowledge, skills, and values they need to succeed in today's fast-changing world.
            </p>
            <p className="text-gray-700 leading-loose mb-5 relative z-10">
              With a team of passionate educators, state-of-the-art facilities, and a vibrant learning
              environment, we foster both personal and academic growth. Since our first school opened in
              2000, we have expanded into a network of four campuses, each catering to specific stages of
              learning: Main, Mukono, Green (focusing on developing innovative leaders), and A-Level.
            </p>
            <p className="text-gray-700 leading-loose relative z-10">
              We believe every child has the potential to thrive. We are committed to partnering with
              you to provide your child with the best education and support throughout their time at
              Seeta High School, empowering them to become well-rounded individuals ready to make a
              positive impact on the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;