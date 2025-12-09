'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import styles from './PowerSwitch.module.css';

export function PowerSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isOn = theme === 'dark';

  return (
    <button
      className={styles.switch}
      onClick={toggleTheme}
      aria-label={isOn ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isOn}
    >
      <div className={styles.switchBody}>
        <div className={styles.switchLabel}>POWER</div>
        <div className={styles.switchTrack}>
          <div 
            className={`${styles.switchKnob} ${isOn ? styles.on : styles.off}`}
          />
        </div>
        <div className={styles.switchIndicators}>
          <span className={!isOn ? styles.active : ''}>OFF</span>
          <span className={isOn ? styles.active : ''}>ON</span>
        </div>
      </div>
    </button>
  );
}

