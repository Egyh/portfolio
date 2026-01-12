'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import styles from '../styles/Footer.module.css';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>
            {t('footer.rights').replace('{year}', String(currentYear))}
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
