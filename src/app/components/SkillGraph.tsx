'use client';

import React from 'react';
import styles from './SkillGraph.module.css';

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

const defaultSkillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    color: '#10b981',
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
    color: '#10b981',
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
    color: '#10b981',
    skills: [
      { name: 'Cloud Platforms', level: 3 },
      { name: 'Containers & Orchestration', level: 3 },
      { name: 'CI/CD Pipelines', level: 3 },
      { name: 'Monitoring & Logging', level: 3 },
      { name: 'Security & Networking', level: 3 }
    ]
  }
];

export const SkillGraph: React.FC<SkillGraphProps> = ({ skillCategories = defaultSkillCategories }) => {
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
    return Array.from({ length: maxLevel }, (_, i) => {
      const r = ((i + 1) / maxLevel) * radius;
      return (
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
          strokeDasharray={i === maxLevel - 1 ? "none" : "3,3"}
        />
      );
    });
  };

  // 軸線を生成
  const createAxisLines = (skills: SkillItem[]) => {
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
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    });
  };

  // スキルラベルを生成
  const createSkillLabels = (skills: SkillItem[], color: string) => {
    const angleStep = (2 * Math.PI) / skills.length;
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
          fill={color}
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
      <div className={styles.radarChartsWrapper}>
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.category} className={styles.radarChartContainer}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <svg
              className={styles.radarChart}
              width="200"
              height="200"
              viewBox="0 0 200 200"
            >
              {/* 背景 */}
              <rect width="200" height="200" fill="#f8fafc" rx="8" />
              
              {/* グリッド円 */}
              {createGridCircles()}
              
              {/* 軸線 */}
              {createAxisLines(category.skills)}
              
              {/* レーダーチャートエリア */}
              <path
                d={createRadarPath(category.skills)}
                fill={`${category.color}20`}
                stroke={category.color}
                strokeWidth="2"
                className={styles.radarPath}
              />
              
              {/* データポイント */}
              {createDataPoints(category.skills, category.color)}
              
              {/* スキルラベル */}
              {createSkillLabels(category.skills, category.color)}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
