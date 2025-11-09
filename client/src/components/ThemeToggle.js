import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('atmFinderTheme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Default to light theme
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('atmFinderTheme', newTheme);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeToggle;
