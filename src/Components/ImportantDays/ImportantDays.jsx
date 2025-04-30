import React from 'react';
import styles from './ImportantDays.module.css';

const ImportantDays = () => {
  return (
    <div className={styles.importantdaysContainer}>
      <h1 className={styles.title}>Important Days Term ONE 2025</h1>
      
      <div className={styles.campusGrid}>
        <div className={`${styles.campusCard} ${styles.alevelCampus}`}>
          <h2 className={styles.campusTitle}>ALEVEL CAMPUS</h2>
          <ul className={styles.eventsList}>
            <li>2nd Feb Reporting Day</li>
            <li>8th March S.2/S.3 <br />Career Day</li>
            <li>16th March S.4/S.6 <br />Career Day</li>
            <li>5th April Sports Day</li>
            <li>4th May Closing Day</li>
          </ul>
        </div>
        
        <div className={`${styles.campusCard} ${styles.greenCampus}`}>
          <h2 className={styles.campusTitle}>GREEN CAMPUS</h2>
          <ul className={styles.eventsList}>
            <li>2nd Feb Reporting Day</li>
            <li>8th March S.2/S.3 <br />Career Day</li>
            <li>15th March S.4/S.6 <br />Career Day</li>
            <li>12th April General Visitation</li>
            <li>4th May Closing Day</li>
          </ul>
        </div>
        
        <div className={`${styles.campusCard} ${styles.mainCampus}`}>
          <h2 className={styles.campusTitle}>MAIN CAMPUS</h2>
          <ul className={styles.eventsList}>
            <li>2nd Feb Reporting day</li>
            <li>2nd March S.5 Reporting day</li>
            <li>8th March S.4& S.6 <br />Careers day</li>
            <li>9th March S.2& S.3 <br />Careers day</li>
            <li>15th March S.1 Careers day</li>
            <li>5th April Sports day</li>
            <li>4th May Closing day</li>
          </ul>
        </div>
        
        <div className={`${styles.campusCard} ${styles.mbalalaCampus}`}>
          <h2 className={styles.campusTitle}>MBALALA CAMPUS</h2>
          <ul className={styles.eventsList}>
            <li>2nd Feb Reporting Day</li>
            <li>15th March S.2 VD</li>
            <li>16th March S.3 VD</li>
            <li>22nd March S.4 VD</li>
            <li>23rd March S.6 VD</li>
            <li>4th May Closing Day</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImportantDays;