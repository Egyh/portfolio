import React from 'react';
import styles from './Works.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: 'web' | 'api' | 'infra';
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js and TypeScript. Features GitHub-inspired design with responsive layout and smooth animations.',
    tech: ['Next.js', 'TypeScript', 'CSS Modules'],
    category: 'web',
  },
  {
    id: 2,
    title: 'API Gateway Service',
    description: 'Microservices API gateway with authentication, rate limiting, and comprehensive logging. Built for high-traffic applications.',
    tech: ['Rails', 'PostgreSQL', 'Redis'],
    category: 'api',
  },
  {
    id: 3,
    title: 'Cloud Infrastructure Setup',
    description: 'Scalable infrastructure on AWS with automated CI/CD pipelines. Includes container orchestration and monitoring solutions.',
    tech: ['AWS', 'Docker', 'Terraform'],
    category: 'infra',
  },
];

export function Works() {
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
          <h2 className={styles.sectionTitle}>Works</h2>
          <p className={styles.sectionDescription}>
            Selected projects showcasing my technical expertise
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
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className={styles.projectBadge}>
                    {getCategoryBadge(project.category)}
                  </span>
                </div>
              </div>
              
              <p className={styles.projectDescription}>
                {project.description}
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
                    View Project →
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
