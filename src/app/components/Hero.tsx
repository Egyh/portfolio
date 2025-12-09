import React from 'react';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot}></span>
          <span className={styles.badgeText}>Available for opportunities</span>
        </div>
        
        <h1 className={styles.heroTitle}>
          Full-Stack Engineer
          <br />
          Building Modern Web Experiences
        </h1>
        
        <p className={styles.heroDescription}>
          I create scalable web applications with a focus on clean code,
          user experience, and modern technologies. Passionate about turning
          ideas into reality through elegant solutions.
        </p>
        
        <div className={styles.heroActions}>
          <a href="#works" className={styles.primaryButton}>
            View My Work
          </a>
          <a href="#contact" className={styles.secondaryButton}>
            Get In Touch
          </a>
        </div>
        
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>Full-Stack</span>
            <span className={styles.statLabel}>Specialization</span>
          </div>
        </div>
      </div>
    </section>
  );
}
