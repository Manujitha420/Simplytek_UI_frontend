'use client';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onShowToast }) {
  const subtotal = cartItems ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const shipping = cartItems && cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className={`drawer-backdrop ${isOpen ? 'active' : ''}`}>
      <div className="cart-backdrop-overlay" onClick={onClose}></div>

      <aside className="cart-drawer-panel white-theme">
        <div className="drawer-header">
          <div className="cart-title-group">
            <h3>Your Cart</h3>
            <span className="cart-count-badge">({cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0} Items)</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">&times;</button>
        </div>

        <div className="cart-body">
          {!cartItems || cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your shopping cart is empty.</p>
              <button className="btn btn-shop-now" onClick={onClose}>Start Shopping</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <span className="cart-item-price">${item.price.toLocaleString()}</span>
                    <div className="qty-picker">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => onRemoveItem(index)} aria-label="Remove item">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-price">${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row shipping-row">
              <span>Estimated Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="summary-price total-price-val">${total.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-checkout-cart"
              onClick={() => {
                if (onShowToast) onShowToast('Redirecting to Secure Checkout...');
                onClose();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
