import styles from "../page.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.pixelBorder}>
        <h1 className={styles.title}>ぐっちのDevRoom</h1>
        <div className={styles.subtitle}>PORTFOLIO</div>
      </div>
    </header>
  );
}


