import styles from "../page.module.css";

export function About() {
  return (
    <div className={styles.contentArea}>
      <div className={styles.pixelBox}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutContent}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.aboutText}>
            <p className={styles.description}>
            I'm an engineer originally from Osaka. After studying English and intercultural communication at a university specializing in foreign languages, I worked in logistics and SMC at a manufacturer. 
            Later, drawn to IT technology, I transitioned into the IT industry. 
            Starting my career in operations and maintenance, 
            I've gained broad experience across infrastructure and front-end development, including AWS cloud server setup, React/Next.js, and Ruby/Rails development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
