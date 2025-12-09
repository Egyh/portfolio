import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>
            © {currentYear} Gucchi. All rights reserved.
          </p>
        </div>
        
        <div className={styles.footerRight}>
          <a
            href="https://github.com"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
