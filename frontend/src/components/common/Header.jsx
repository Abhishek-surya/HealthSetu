import React from 'react';
import { Link } from 'react-router-dom';
import ToggleMode from '../ToggleMode';
import './Header.css';

const Header = ({ navItems, onLogout }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>HealthSetu</h1>
      </Link>
      
      <nav className="nav">
        {navItems?.map((item, index) => (
          <button 
            key={index} 
            onClick={item.onClick}
            className="nav-item"
          >
            {item.label}
          </button>
        ))}
        <div className="theme-toggle-wrapper">
          <ToggleMode />
        </div>
        {onLogout && (
          <button onClick={onLogout} className="nav-item logout-button">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;