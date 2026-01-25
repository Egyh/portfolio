"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "../styles/About.module.css";

export function About() {
  const { t } = useLanguage();

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
          <p className={styles.sectionDescription}>{t("about.subtitle")}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.contentMain}>
            <div className={styles.textBlock}>
              <p>{t("about.intro1")}</p>
              <p>{t("about.intro2")}</p>
            </div>

            <div className={styles.skillsList}>
              <h3 className={styles.skillsTitle}>{t("about.technologies")}</h3>
              <div className={styles.skillsGrid}>
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Ruby",
                  "Rails",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Git",
                  "Linux",
                  "CI/CD",
                ].map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.contentSide}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{t("about.location")}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardText}>
                  {t("about.locationValue")}
                </span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {t("about.thisYearGoal")}
                </span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardText}>{t("about.goalValue")}</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{t("about.interests")}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTags}>
                  <span className={styles.tag}>{t("about.interest.web")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
