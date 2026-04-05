import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container glass" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.8rem 1.5rem',
      borderRadius: 'var(--radius-pill)',
      border: '2px solid white',
      background: 'rgba(255, 255, 255, 0.7)'
    }}>
      <FaSearch className="search-icon" style={{color: 'var(--primary)'}} />
      <input 
        type="text" 
        placeholder="Search for something cute..." 
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          flex: 1,
          fontFamily: 'inherit',
          fontSize: '1.05rem',
          color: 'var(--text-main)',
          fontWeight: 600
        }}
      />
    </div>
  );
};

export default SearchBar;
