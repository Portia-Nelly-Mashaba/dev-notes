import React from 'react';

const Header = ({ onCreateNote, onLogError }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">Dev Notes Pad</h1>
        <p className="app-subtitle">Your personal code assistant</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onCreateNote}>
          <i className="btn-icon">+</i>
          New Note
        </button>
        <button className="btn btn-secondary" onClick={onLogError}>
          <i className="btn-icon">⚠️</i>
          Log Error
        </button>
      </div>
    </header>
  );
};

export default Header;
