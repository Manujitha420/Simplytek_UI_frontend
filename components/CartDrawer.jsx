'use client';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onShowToast }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <div className="cart-backdrop active" onClick={onClose}></div>

      <aside className="cart-drawer active">
        <div className="cart-header">
          <div className="cart-title-group">
            <h3>Your Cart</h3>
            <span className="cart-count-badge">({cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">&times;</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
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
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <span className="cart-item-price">${item.price.toLocaleString()}</span>
                    <div className="quantity-controls">
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

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span>Estimated Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="cart-summary-row total-row">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-checkout-primary"
              onClick={() => {
                onShowToast('Redirecting to Secure Checkout...');
                onClose();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
