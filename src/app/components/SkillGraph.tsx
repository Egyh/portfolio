'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/SkillGraph.module.css';

interface SkillItem {
  name: string;
  level: number; // 1-5の段階評価
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
  color: string;
}

interface SkillGraphProps {
  skillCategories?: SkillCategory[];
}

const getSkillCategories = (theme: 'light' | 'dark'): SkillCategory[] => {
  const colors = theme === 'light' 
    ? {
        frontend: '#9b59b6', // パープル
        backend: '#3498db', // ブルー
        infrastructure: '#2ecc71' // グリーン
      }
    : {
        frontend: '#bb86fc', // 明るいパープル
        backend: '#03dac6', // 明るいシアン
        infrastructure: '#00e676' // 明るいグリーン
      };

  return [
    {
      category: 'Frontend',
      color: colors.frontend,
      skills: [
        { name: 'HTML', level: 3 },
        { name: 'CSS', level: 3 },
        { name: 'JavaScript', level: 3 },
        { name: 'TypeScript', level: 3 },
        { name: 'React', level: 3 }
      ]
    },
    {
      category: 'Backend',
      color: colors.backend,
      skills: [
        { name: 'Rails', level: 3 },
        { name: 'Database', level: 3 },
        { name: 'API', level: 3 },
        { name: 'Architecture', level: 3 },
        { name: 'Test', level: 3 }
      ]
    },
    {
      category: 'Infrastructure',
      color: colors.infrastructure,
      skills: [
        { name: 'Cloud Platforms', level: 3 },
        { name: 'Containers & Orchestration', level: 3 },
        { name: 'CI/CD Pipelines', level: 3 },
        { name: 'Monitoring & Logging', level: 3 },
        { name: 'Security & Networking', level: 3 }
      ]
    }
  ];
};

export const SkillGraph: React.FC<SkillGraphProps> = ({ skillCategories: propCategories }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    try {
      if (document.documentElement) {
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
        setTheme(currentTheme);
      }
    } catch (error) {
      console.error('Error getting theme:', error);
      setTheme('light');
    }
    
    // CSS変数から背景色を取得
    const updateBgColor = () => {
      if (typeof window === 'undefined' || !document.documentElement) return;
      
      try {
        const computedStyle = getComputedStyle(document.documentElement);
        const bg = computedStyle.getPropertyValue('--color-bg') || computedStyle.getPropertyValue('--gb-bg');
        setBgColor(bg.trim() || '#ffffff');
      } catch (error) {
        console.error('Error updating background color:', error);
      }
    };
    
    updateBgColor();
    
    let observer: MutationObserver | null = null;
    
    try {
      if (document.documentElement) {
        observer = new MutationObserver(() => {
          try {
            if (document.documentElement) {
              const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
              setTheme(newTheme);
              updateBgColor();
            }
          } catch (error) {
            console.error('Error in MutationObserver:', error);
          }
        });
        
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme']
        });
      }
    } catch (error) {
      console.error('Error setting up MutationObserver:', error);
    }
    
    return () => {
      if (observer) {
        try {
          observer.disconnect();
        } catch (error) {
          console.error('Error disconnecting observer:', error);
        }
      }
    };
  }, []);

  const skillCategories = propCategories || (mounted ? getSkillCategories(theme) : getSkillCategories('light'));
  // レーダーチャートの中心点と半径
  const centerX = 100;
  const centerY = 100;
  const radius = 80;
  const maxLevel = 5;

  // レーダーチャートのポイントを計算
  const getPoint = (index: number, level: number, totalSkills: number) => {
    const angleStep = (2 * Math.PI) / totalSkills;
    const angle = index * angleStep - Math.PI / 2; // -90度から開始
    const distance = (level / maxLevel) * radius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };

  // レーダーチャートのパスを生成
  const createRadarPath = (skills: SkillItem[]) => {
    const points = skills.map((skill, index) => {
      const point = getPoint(index, skill.level, skills.length);
      return `${point.x},${point.y}`;
    });
    return `M ${points[0]} L ${points.slice(1).join(' L ')} Z`;
  };

  // グリッド線を生成（5段階の同心円）
  const createGridCircles = () => {
    const gridColor = theme === 'light' ? '#cccccc' : '#333333';
    return Array.from({ length: maxLevel }, (_, i) => {
      const r = ((i + 1) / maxLevel) * radius;
      return (
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={r}
          fill="none"
          stroke={gridColor}
          strokeWidth="1.5"
          strokeDasharray={i === maxLevel - 1 ? "none" : "3,3"}
          opacity={0.6}
        />
      );
    });
  };

  // 軸線を生成
  const createAxisLines = (skills: SkillItem[]) => {
    const axisColor = theme === 'light' ? '#cccccc' : '#333333';
    const angleStep = (2 * Math.PI) / skills.length;
    return skills.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return (
        <line
          key={index}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke={axisColor}
          strokeWidth="1.5"
          opacity={0.6}
        />
      );
    });
  };

  // スキルラベルを生成
  const createSkillLabels = (skills: SkillItem[]) => {
    const angleStep = (2 * Math.PI) / skills.length;
    // ラベルはテーマに応じた色で統一
    const labelColor = theme === 'light' ? '#000000' : '#ffffff';
    return skills.map((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const labelDistance = radius + 15;
      const x = centerX + labelDistance * Math.cos(angle);
      const y = centerY + labelDistance * Math.sin(angle);
      
      return (
        <text
          key={index}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.skillLabel}
          fill={labelColor}
        >
          {skill.name}
        </text>
      );
    });
  };

  // データポイントを生成
  const createDataPoints = (skills: SkillItem[], color: string) => {
    return skills.map((skill, index) => {
      const point = getPoint(index, skill.level, skills.length);
      return (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="3"
          fill={color}
          stroke="white"
          strokeWidth="2"
          className={styles.dataPoint}
        />
      );
    });
  };

  return (
    <div className={styles.skillGraphContainer}>
      <h2 className={styles.title}>Skills Radar Charts</h2>
      <div className={styles.description}>
        <p>
          修練のすえ身につけたスキルをグラフィカルにまとめました。広く浅くではありますがフロントからバックエンドまで幅広くスキルアップに取り組んできました。オールラウンドに対応できる点が強みですが、全体的に理解が浅く、専門性の低さを認識しています。今後はバックエンド系の開発（クラウド含む）の業務に携わる比率を増やし、少しずつ専門性を高めていきたいと考えています。
        </p>
        <p className={styles.note}>
          ＊業務で実際に使用した技術のみ掲載しております。
        </p>
      </div>
      <div className={styles.radarChartsWrapper}>
        {skillCategories.map((category) => (
          <div key={category.category} className={styles.radarChartContainer}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <svg
              className={styles.radarChart}
              width="200"
              height="200"
              viewBox="0 0 200 200"
            >
              {/* 背景 */}
              <rect width="200" height="200" fill={bgColor} />
              
              {/* グリッド円 */}
              {createGridCircles()}
              
              {/* 軸線 */}
              {createAxisLines(category.skills)}
              
              {/* レーダーチャートエリア */}
              <path
                d={createRadarPath(category.skills)}
                fill={`${category.color}80`}
                stroke={category.color}
                strokeWidth="2.5"
                className={styles.radarPath}
              />
              
              {/* データポイント */}
              {createDataPoints(category.skills, category.color)}
              
              {/* スキルラベル */}
              {createSkillLabels(category.skills)}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
