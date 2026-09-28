'use client';
import { useState } from 'react';

export default function SearchModal({ isOpen, onClose, onShowToast }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = [
    'Sony WH-1000XM6',
    'MacBook Pro M3',
    'iPhone 15 Pro Max',
    'Sony Alpha A7 IV',
    'DJI Avata Drone',
    'Noise Cancelling'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    onShowToast(`Searching for "${query}"...`);
    onClose();
  };

  return (
    <div className="modal-backdrop active" id="searchModalBackdrop" onClick={(e) => { if (e.target.id === 'searchModalBackdrop') onClose(); }}>
      <div className="modal-card search-card">
        <form onSubmit={handleSearchSubmit} className="search-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            id="searchInput"
            placeholder="Search headphones, laptops, smartphones, drones..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close search">
            &times;
          </button>
        </form>

        <div className="search-suggestions">
          <div className="suggestion-title">Popular Searches</div>
          <div className="suggestion-tags">
            {popularTags.map((tag) => (
              <span
                key={tag}
                className="sug-tag"
                onClick={() => {
                  setQuery(tag);
                  onShowToast(`Searching for "${tag}"...`);
                  onClose();
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
