import React from 'react';
import styles from '../styles/About.module.css';

export function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.sectionDescription}>
            Engineer passionate about building elegant solutions
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.contentMain}>
            <div className={styles.textBlock}>
              <p>
                大阪出身のエンジニア。外国語大学で英語と異文化コミュニケーションを学び、
                製造業での物流・SMC業務を経てIT業界へ転身しました。
              </p>
              <p>
                インフラ運用から始まり、AWSクラウドサーバー構築、React/Next.js、Ruby/Rails開発まで、
                幅広い経験を積んでいます。技術とユーザー体験のバランスを重視し、
                クリーンなコードとスケーラブルなアーキテクチャを心がけています。
              </p>
            </div>
            
            <div className={styles.skillsList}>
              <h3 className={styles.skillsTitle}>Technologies I work with</h3>
              <div className={styles.skillsGrid}>
                {[
                  'TypeScript', 'React', 'Next.js', 'Node.js',
                  'Ruby', 'Rails', 'PostgreSQL', 'AWS',
                  'Docker', 'Git', 'Linux', 'CI/CD'
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
                <span className={styles.cardTitle}>Location</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardText}>Osaka, Japan</span>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Education</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardText}>Foreign Language Studies</span>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Interests</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTags}>
                  <span className={styles.tag}>Web Development</span>
                  <span className={styles.tag}>Infrastructure</span>
                  <span className={styles.tag}>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
