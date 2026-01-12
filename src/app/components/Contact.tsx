'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import styles from '../styles/Contact.module.css';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{t('contact.getInTouch')}</h3>
              <p className={styles.infoText}>
                {t('contact.getInTouchText')}
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{t('contact.email')}</h3>
              <a href="mailto:your.email@example.com" className={styles.infoLink}>
                your.email@example.com
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{t('contact.responseTime')}</h3>
              <p className={styles.infoText}>
                {t('contact.responseTimeText')}
              </p>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
                rows={6}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
