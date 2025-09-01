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
              大阪出身のエンジニア。外大で英語や異文化コミュニケーションを学んだのち、メーカーでロジスティックスやSMCに従事。その後ITの技術にひかれ、IT業界へ転職。運用・保守からキャリアをスタートし、AWSクラウドサーバー構築、React/Next.js、Ruby/Railsの開発など、インフラからフロントサイドまで幅広く業務を経験してきました。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
