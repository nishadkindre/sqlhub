import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    const savedMode = localStorage.getItem('sqlhub-theme-mode');
    return savedMode || 'light';
  });

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('sqlhub-theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      return newMode;
    });
  };

  const value = {
    mode,
    toggleTheme,
    isLight: mode === 'light',
    isDark: mode === 'dark'
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
