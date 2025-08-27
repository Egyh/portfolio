import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.crtEffect}>
        <main className={styles.main}>
          {/* ファミコン風のヘッダー */}
          <header className={styles.header}>
            <div className={styles.pixelBorder}>
              <h1 className={styles.title}>ぐっちのDevRoom</h1>
              <div className={styles.subtitle}>PORTFOLIO</div>
            </div>
          </header>

          {/* メインコンテンツエリア */}
          <div className={styles.contentArea}>
            <div className={styles.pixelBox}>
              <h2 className={styles.sectionTitle}>About This Site</h2>
              <p className={styles.description}>
                ここはエンジニアぐっちのポートフォリオサイトなのねん。
                フルスタックエンジニアとして、モダンなWeb技術とゲームが好きなのねん。
                これまでに手がけた制作物、身につけたスキルをまとめてるのねん。
                あなたに、私のことをもっと深く知ってほしいと思って作ったのねん。
                コーヒーでも飲みながらゆっくりサイト内を散策するのねん。
              </p>
            </div>
          </div>
        </main>

        {/* レトロなフッター */}
        <footer className={styles.footer}>
          <div className={styles.pixelBorder}>
            <div className={styles.footerText}>
              © 2025 - POWERED BY ぐっち
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}