'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import styles from '../styles/Header.module.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setScrolled(window.scrollY > 0);
    
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
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (typeof window === 'undefined') return;
    
    try {
      const element = document.getElementById(id);
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <span className={styles.logoText}>Gucchi</span>
            <span className={styles.logoDot}>.</span>
          </a>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className={styles.headerActions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
