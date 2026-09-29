'use client';
import { useState, useRef, useEffect } from 'react';

export default function Navbar({
  scrolled,
  currentSlide,
  onSelectSlide,
  onOpenCart,
  cartCount,
  onOpenAuthModal,
  onGoToAuthView,
  onShowToast
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (onShowToast) onShowToast(`Searching for "${searchQuery}"...`);
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); onSelectSlide(0); }}>
          <div className="logo-box">S</div>
          <span className="logo-text">SIMPLY<span className="logo-highlight">TEK</span></span>
        </a>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button className="nav-link active" onClick={() => onSelectSlide(0)}>Home</button>
          <button className="nav-link" onClick={() => onSelectSlide(0)}>Shop</button>
          <button className="nav-link" onClick={() => onSelectSlide(0)}>Categories</button>
          <button className="nav-link" onClick={() => onSelectSlide(0)}>Contact</button>
        </nav>

        {/* Action Controls (Search, Account, Cart) */}
        <div className="nav-actions">
          {/* Inline Expandable Search Bar */}
          <div ref={searchWrapperRef} className={`nav-search-wrapper ${isSearchExpanded ? 'expanded' : ''}`}>
            <button
              className="icon-btn search-icon-btn"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {isSearchExpanded && (
              <form onSubmit={handleSearchSubmit} className="inline-search-container">
                <input
                  type="text"
                  className="inline-search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="inline-search-close"
                  onClick={() => setIsSearchExpanded(false)}
                  aria-label="Close search"
                >
                  &times;
                </button>
              </form>
            )}
          </div>

          <button className="icon-btn" onClick={onOpenAuthModal} aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <button className="icon-btn cart-btn" onClick={onOpenCart} aria-label="Shopping Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
