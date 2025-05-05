import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const services = [
  {
    icon: 'fa-book',
    title: 'Academic Excellence',
    description:
      'Achieve your full potential with a commitment to academic excellence. Our programs are designed to foster critical thinking, innovation, and lifelong learning.',
    bgColor: 'bg-[#45a0de]',
  },
  {
    icon: 'fa-users',
    title: 'Expert Teachers',
    description:
      'Learn from passionate, highly qualified educators dedicated to guiding you toward success. Our teachers provide personalized support and inspire confidence.',
    bgColor: 'bg-[#d59f0f]',
  },
  {
    icon: 'fa-table',
    title: 'Best Classrooms',
    description:
      'Experience a state-of-the-art learning environment. Our classrooms are equipped with advanced technology and resources to ensure effective and enjoyable education.',
    bgColor: 'bg-[#45a0de]',
  },
];

const Service = () => {
  return (
    <div className="flex max-w-full -mt-[100px] mx-[50px] sm:mx-[20px] sm:-mt-[80px] xs:flex-col xs:mx-[15px] xs:-mt-[50px]">
      {services.map((service, index) => (
        <article
          key={index}
          className={`flex-1 ${service.bgColor} p-5 z-[1] text-white text-center ${
            index !== services.length - 1
              ? 'border-r-2 border-white xs:border-r-0 xs:border-b-2'
              : ''
          } sm:p-[15px_10px]`}
        >
          <span className="fa block text-[40px] sm:text-[32px] mb-[15px] sm:mb-[10px]">{service.icon}</span>
          <h3 className="text-[25px] font-bold mb-[10px] sm:text-[20px] sm:mb-0">{service.title}</h3>
          <p className="text-[18px] leading-[1.5] xs:hidden">{service.description}</p>
        </article>
      ))}
    </div>
  );
};

export default Service;
