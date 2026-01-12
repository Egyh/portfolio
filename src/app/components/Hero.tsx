'use client';

import React from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "../styles/Hero.module.css";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
        <p className={styles.heroDescription}>
          {t('hero.description')}
        </p>
        <div className={styles.heroActions}>
          <a href="#contact" className={styles.secondaryButton}>
            {t('hero.contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
