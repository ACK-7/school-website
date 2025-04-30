import React from 'react';
import styles from './Services.module.css';

const services = [
  {
    icon: 'fa-book',
    title: 'Academic Excellence',
    description:
      'Achieve your full potential with a commitment to academic excellence. Our programs are designed to foster critical thinking, innovation, and lifelong learning.',
    bgColor: styles.blueBackground,
  },
  {
    icon: 'fa-users',
    title: 'Expert Teachers',
    description:
      'Learn from passionate, highly qualified educators dedicated to guiding you toward success. Our teachers provide personalized support and inspire confidence.',
    bgColor: styles.goldBackground,  
  },
  {
    icon: 'fa-table',
    title: 'Best Classrooms',
    description:
      'Experience a state-of-the-art learning environment. Our classrooms are equipped with advanced technology and resources to ensure effective and enjoyable education.',
    bgColor: styles.blueBackground,  
  },
];

const Service = () => {
  return (
      <div className={styles.serviceContainer}>
        {services.map((service, index) => (
          <article key={index} className={`${styles.serviceSingle} ${service.bgColor}`}>
            <span className={`fa ${service.icon}`}></span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
  );
};

export default Service;
