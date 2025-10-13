// src/components/SearchBar.js
import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by city or bank..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
    />
  );
}

export default SearchBar;
