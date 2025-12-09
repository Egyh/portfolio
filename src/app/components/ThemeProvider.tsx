'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    try {
      // localStorageからテーマを読み込む、なければデフォルトはlight
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } else {
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      if (document.documentElement) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    try {
      if (document.documentElement) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // マウント前でも常にProviderでラップする
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

