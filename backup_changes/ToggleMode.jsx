import React from 'react';
import { useTheme } from './ThemeContext';
import './theme.css';

const ToggleMode = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleTheme} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleMode;
