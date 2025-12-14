'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/Navigation.module.css';

const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'works', label: 'WORKS' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const sections = navItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleClick = (id: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const element = document.getElementById(id);
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => handleClick(item.id)}
            aria-label={`Navigate to ${item.label}`}
          >
            <span className={styles.navLabel}>{item.label}</span>
            {activeSection === item.id && (
              <span className={styles.navIndicator}>▶</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

