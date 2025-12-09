'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理
    console.log('Form submitted:', formData);
    // 実際の実装では、ここでAPIを呼び出す
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
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.sectionDescription}>
            Let's work together to build something great
          </p>
        </div>
        
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Get in touch</h3>
              <p className={styles.infoText}>
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Email</h3>
              <a href="mailto:your.email@example.com" className={styles.infoLink}>
                your.email@example.com
              </a>
            </div>
            
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Response time</h3>
              <p className={styles.infoText}>
                Usually responds within 24 hours
              </p>
            </div>
          </div>
          
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name
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
                Email
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
                Message
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
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
