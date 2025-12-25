import { useEffect, useState } from 'react';
import { getCookieStorage, setOneCookieStorage } from '@/helper/storage';
import { LOCAL_STORAGE_DATA } from '@/utils/constants';

export type ThemeMode = 'light' | 'dark';

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = getCookieStorage(LOCAL_STORAGE_DATA.THEME_MODE) as ThemeMode;
    // lay tu cookie
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
      return savedTheme;
    }
    // k co cookie thi lay theo browser
    const browserPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = browserPrefersDark ? 'dark' : 'light';
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
    
    return initialTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!getCookieStorage(LOCAL_STORAGE_DATA.THEME_MODE)) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };
    // lang nghe su thay doi mode cua browser

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    setOneCookieStorage(LOCAL_STORAGE_DATA.THEME_MODE, mode);
  };

  const toggleTheme = () => {
    setTheme(themeMode === 'light' ? 'dark' : 'light');
  };

  return {
    themeMode,
    setTheme,
    toggleTheme,
    isDark: themeMode === 'dark',
    isLight: themeMode === 'light',
  };
};

