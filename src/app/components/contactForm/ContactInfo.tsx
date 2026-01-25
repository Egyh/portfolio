"use client";

import React from "react";
import { useLanguage } from "../LanguageProvider";
import styles from "../../styles/Contact.module.css";

export function ContactInfo() {
  const { t } = useLanguage();

  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{t("contact.title")}</h2>
    </div>
  );
}
