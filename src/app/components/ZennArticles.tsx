"use client";

import React, { useEffect, useState } from "react";
import { Article, ZennArticlesResponse } from "@/types/zenn";
import { useLanguage } from "./LanguageProvider";
import styles from "../styles/ZennArticles.module.css";

export function ZennArticles() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/v1/zenn");

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data: ZennArticlesResponse = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching Zenn articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className={styles.zennArticles} id="articles">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("zenn.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("zenn.subtitle")}
            </p>
          </div>
          <div className={styles.loading}>{t("zenn.loading")}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.zennArticles} id="articles">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("zenn.title")}</h2>
            <p className={styles.sectionDescription}>
              {t("zenn.subtitle")}
            </p>
          </div>
          <div className={styles.error}>
            {t("zenn.error")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.zennArticles} id="articles">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("zenn.title")}</h2>
          <p className={styles.sectionDescription}>
            {t("zenn.subtitle")}
          </p>
        </div>

        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              className={styles.articleCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.articleEmoji}>{article.emoji}</div>

              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>

                <div className={styles.articleMeta}>
                  <time className={styles.articleDate}>
                    {formatDate(article.publishedAt)}
                  </time>
                  <div className={styles.articleStats}>
                    <span className={styles.stat}>❤️ {article.likedCount}</span>
                    {article.publication && (
                      <span className={styles.publication}>
                        {article.publication}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.articleArrow}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
