import styles from "../page.module.css";

export function Introduction() {
  return (
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
  );
}
