import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Introduction } from "./components/Introduction";
import { About } from "./components/About";
import { SkillGraph } from "./components/SkillGraph";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.crtEffect}>
        <main className={styles.main}>
          <Header />
          <Introduction />
          <About />
          <SkillGraph />
        </main>
        <Footer />
      </div>
    </div>
  );
}
