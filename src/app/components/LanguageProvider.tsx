'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ja: {
    'nav.about': '自己紹介',
    'nav.skills': 'スキル',
    'nav.works': '制作物',
    'nav.contact': 'お問い合わせ',
    'hero.title': 'ぐっちのDevRoom',
    'hero.description': 'ここはエンジニアGucchiのポートフォリオサイトなのねん。これまでに手がけた制作物、身につけたスキルをまとめているのねん。コーヒーでも飲みながらサイト内を散策するのねん。',
    'hero.contact': '連絡先',
    'about.title': '自己紹介',
    'about.subtitle': '自己紹介するのねん',
    'about.intro1': '大阪出身なのねん。温泉やキャンプが好きなのねん。ゆず胡椒と和菓子にハマってるのねん。',
    'about.intro2': 'React/Next.js、Ruby/Rails開発を中心にAWSクラウドサーバー構築も少し携わり幅広い経験を積んでいるのねん。新しい技術の発見や発想、好奇心を大切にクリーンなコードとニーズに合わせたアーキテクチャの作成を心がけているのねん。',
    'about.technologies': '使用技術',
    'about.location': '所在地',
    'about.locationValue': '大阪, 日本',
    'about.education': '学歴',
    'about.educationValue': '外国語学部',
    'about.interests': '興味分野',
    'about.interest.web': 'Web開発',
    'about.interest.infra': 'インフラ',
    'about.interest.oss': 'オープンソース',
    'skills.title': 'スキル',
    'skills.subtitle': 'モダンなアプリケーション開発に使用している技術とツール',
    'skills.frontend': 'フロントエンド',
    'skills.backend': 'バックエンド',
    'skills.infrastructure': 'インフラ',
    'works.title': '制作物',
    'works.subtitle': '技術力を示すプロジェクト',
    'works.project1.title': 'ポートフォリオサイト',
    'works.project1.description': 'Next.jsとTypeScriptで構築したモダンなポートフォリオサイト。GitHub風デザインでレスポンシブ対応とスムーズなアニメーションを実装。',
    'works.project2.title': 'APIゲートウェイサービス',
    'works.project2.description': '認証、レート制限、包括的なログ機能を備えたマイクロサービスAPIゲートウェイ。高トラフィックアプリケーション向けに構築。',
    'works.project3.title': 'クラウドインフラ構築',
    'works.project3.description': '自動化されたCI/CDパイプラインを備えたAWS上のスケーラブルなインフラ。コンテナオーケストレーションと監視ソリューションを含む。',
    'works.viewProject': 'プロジェクトを見る',
    'contact.title': 'お問い合わせ',
    'contact.subtitle': '一緒に素晴らしいものを作りましょう',
    'contact.getInTouch': 'ご連絡ください',
    'contact.getInTouchText': '新しいプロジェクト、クリエイティブなアイデア、またはあなたのビジョンに参加する機会についてお気軽にご相談ください。',
    'contact.email': 'メール',
    'contact.responseTime': '返信時間',
    'contact.responseTimeText': '通常24時間以内に返信します',
    'contact.name': 'お名前',
    'contact.message': 'メッセージ',
    'contact.send': '送信する',
    'footer.rights': '© {year} Gucchi. All rights reserved.',
  },
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.works': 'Works',
    'nav.contact': 'Contact',
    'hero.title': "Gucchi's DevRoom",
    'hero.description': "Welcome to Gucchi's portfolio site. Here you'll find my projects and skills. Feel free to explore while enjoying a cup of coffee.",
    'hero.contact': 'Contact',
    'about.title': 'About',
    'about.subtitle': 'Get to know me',
    'about.intro1': "I'm from Osaka. I love hot springs and camping. I'm into yuzu pepper and Japanese sweets.",
    'about.intro2': 'I have broad experience mainly in React/Next.js and Ruby/Rails development, with some AWS cloud server infrastructure work. I value curiosity and discovering new technologies, always striving to write clean code and create architectures that meet specific needs.',
    'about.technologies': 'Technologies I work with',
    'about.location': 'Location',
    'about.locationValue': 'Osaka, Japan',
    'about.education': 'Education',
    'about.educationValue': 'Foreign Language Studies',
    'about.interests': 'Interests',
    'about.interest.web': 'Web Development',
    'about.interest.infra': 'Infrastructure',
    'about.interest.oss': 'Open Source',
    'skills.title': 'Skills',
    'skills.subtitle': 'Technologies and tools I use to build modern applications',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.infrastructure': 'Infrastructure',
    'works.title': 'Works',
    'works.subtitle': 'Selected projects showcasing my technical expertise',
    'works.project1.title': 'Portfolio Website',
    'works.project1.description': 'Modern portfolio website built with Next.js and TypeScript. Features GitHub-inspired design with responsive layout and smooth animations.',
    'works.project2.title': 'API Gateway Service',
    'works.project2.description': 'Microservices API gateway with authentication, rate limiting, and comprehensive logging. Built for high-traffic applications.',
    'works.project3.title': 'Cloud Infrastructure Setup',
    'works.project3.description': 'Scalable infrastructure on AWS with automated CI/CD pipelines. Includes container orchestration and monitoring solutions.',
    'works.viewProject': 'View Project',
    'contact.title': 'Contact',
    'contact.subtitle': "Let's work together to build something great",
    'contact.getInTouch': 'Get in touch',
    'contact.getInTouchText': "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    'contact.email': 'Email',
    'contact.responseTime': 'Response time',
    'contact.responseTimeText': 'Usually responds within 24 hours',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'footer.rights': '© {year} Gucchi. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'ja' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
