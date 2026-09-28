'use client';

export default function Navbar({
  scrolled,
  currentSlide,
  onSelectSlide,
  onOpenSearch,
  onOpenCart,
  cartCount,
  onOpenAuthModal,
  onGoToAuthView
}) {
  const navItems = [
    { name: 'Headphones', slideIndex: 0 },
    { name: 'Laptops', slideIndex: 1 },
    { name: 'Smartphones', slideIndex: 2 },
    { name: 'Cameras', slideIndex: 3 },
    { name: 'Drones', slideIndex: 4 },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); onSelectSlide(0); }}>
          <div className="logo-box">S</div>
          <span className="logo-text">SIMPLY<span className="logo-highlight">TEK</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-link ${currentSlide === item.slideIndex ? 'active' : ''}`}
              onClick={() => onSelectSlide(item.slideIndex)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Action Controls (Search, Account, Cart) */}
        <div className="nav-actions">
          <button className="nav-action-btn" onClick={onOpenSearch} aria-label="Search Store">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button className="nav-action-btn" onClick={onOpenAuthModal} aria-label="Account Options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <button className="nav-action-btn cart-btn" onClick={onOpenCart} aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="btn btn-nav-cta" onClick={() => onGoToAuthView('signup')}>
            Sign In / Register
          </button>
        </div>
      </div>
    </header>
  );
}
