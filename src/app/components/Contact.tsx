"use client";

import React from "react";
import { ContactInfo, ContactForm } from "./contactForm";
import styles from "../styles/Contact.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <ContactInfo />
        <div className={styles.formWrapper}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
