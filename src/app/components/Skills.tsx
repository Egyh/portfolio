'use client';

import React from 'react';
import styles from '../styles/Skills.module.css';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'infrastructure';
}

const skills: Skill[] = [
  { name: 'TypeScript', level: 5, category: 'frontend' },
  { name: 'React', level: 5, category: 'frontend' },
  { name: 'Next.js', level: 4, category: 'frontend' },
  { name: 'HTML/CSS', level: 5, category: 'frontend' },
  { name: 'Ruby', level: 4, category: 'backend' },
  { name: 'Rails', level: 4, category: 'backend' },
  { name: 'PostgreSQL', level: 4, category: 'backend' },
  { name: 'API Design', level: 4, category: 'backend' },
  { name: 'AWS', level: 4, category: 'infrastructure' },
  { name: 'Docker', level: 4, category: 'infrastructure' },
  { name: 'CI/CD', level: 4, category: 'infrastructure' },
  { name: 'Linux', level: 4, category: 'infrastructure' },
];

export function Skills() {
  const categories = ['frontend', 'backend', 'infrastructure'] as const;
  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    infrastructure: 'Infrastructure',
  };

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className={styles.sectionDescription}>
            Technologies and tools I use to build modern applications
          </p>
        </div>
        
        <div className={styles.skillsGrid}>
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            return (
              <div key={category} className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <h3 className={styles.categoryTitle}>
                    {categoryLabels[category]}
                  </h3>
                </div>
                
                <div className={styles.skillList}>
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className={styles.skillRow}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}/5</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div
                          className={styles.skillBarFill}
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
