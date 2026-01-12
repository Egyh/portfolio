'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import styles from '../styles/LanguageToggle.module.css';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={styles.toggle}
      aria-label={language === 'ja' ? 'Switch to English' : '日本語に切り替え'}
    >
      <span className={styles.label}>
        {language === 'ja' ? 'EN' : 'JA'}
      </span>
    </button>
  );
}
