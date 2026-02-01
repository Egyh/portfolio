import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { ZennArticles } from "./components/ZennArticles";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Hero />
        <About />
        <Skills />
        {/* <Works /> */}
        <ZennArticles />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
