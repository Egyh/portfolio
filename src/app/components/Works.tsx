'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import styles from '../styles/Works.module.css';

interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  category: 'web' | 'api' | 'infra';
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: 'works.project1.title',
    descriptionKey: 'works.project1.description',
    tech: ['Next.js', 'TypeScript', 'CSS Modules'],
    category: 'web',
  },
  {
    id: 2,
    titleKey: 'works.project2.title',
    descriptionKey: 'works.project2.description',
    tech: ['Rails', 'PostgreSQL', 'Redis'],
    category: 'api',
  },
  {
    id: 3,
    titleKey: 'works.project3.title',
    descriptionKey: 'works.project3.description',
    tech: ['AWS', 'Docker', 'Terraform'],
    category: 'infra',
  },
];

export function Works() {
  const { t } = useLanguage();

  const getCategoryBadge = (category: string) => {
    const badges = {
      web: 'Web',
      api: 'API',
      infra: 'Infra',
    };
    return badges[category as keyof typeof badges] || category;
  };

  return (
    <section className={styles.works} id="works">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('works.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('works.subtitle')}
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectTitleRow}>
                  <h3 className={styles.projectTitle}>
                    {project.link ? (
                      <a href={project.link} className={styles.projectLink}>
                        {t(project.titleKey)}
                      </a>
                    ) : (
                      t(project.titleKey)
                    )}
                  </h3>
                  <span className={styles.projectBadge}>
                    {getCategoryBadge(project.category)}
                  </span>
                </div>
              </div>

              <p className={styles.projectDescription}>
                {t(project.descriptionKey)}
              </p>

              <div className={styles.projectFooter}>
                <div className={styles.projectTech}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    className={styles.projectButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('works.viewProject')} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
