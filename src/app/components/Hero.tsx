"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "../styles/Hero.module.css";

export function Hero() {
  const { t } = useLanguage();
  const title = t("hero.title");

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.circleContainer}>
          <div className={styles.rotatingText}>
            <svg viewBox="0 0 200 200" className={styles.circleSvg}>
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text className={styles.heroTitle}>
                <textPath href="#circlePath" startOffset="0%">
                  {title} ・ {title} ・
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        <p className={styles.heroDescription}>{t("hero.description")}</p>
      </div>
    </section>
  );
}
