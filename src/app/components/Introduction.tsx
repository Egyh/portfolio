import styles from "../page.module.css";

export function Introduction() {
  return (
    <div className={styles.contentArea}>
      <div className={styles.pixelBox}>
        <h2 className={styles.sectionTitle}>About This Site</h2>
        <p className={styles.description}>
        This is Engineer Gucchi's portfolio site. As a full-stack engineer, I love modern web technologies and games. 
        Here, I've compiled the projects I've worked on and the skills I've acquired. 
        I created this site hoping you'll get to know me better. 
        Take your time exploring the site while sipping some coffee.
        </p>
      </div>
    </div>
  );
}
