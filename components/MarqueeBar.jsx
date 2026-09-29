'use client';

export default function MarqueeBar() {
  return (
    <div className="marquee-bar">
      <div className="marquee-fade-left"></div>
      <div className="marquee-track">
        <div className="marquee-content">
          <span className="ticker-item">🎉 UP TO 50% OFF SELECTED GADGETS — LIMITED TIME</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🚚 FREE ISLANDWIDE DELIVERY ON ORDERS OVER $75</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">⚡ NEW ARRIVALS: SONY WH-1000XM6 HEADPHONES IN STOCK</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🛡️ 6-MONTH WARRANTY ON ALL PREMIUM DEVICES</span>
          <span className="ticker-dot">•</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span className="ticker-item">🎉 UP TO 50% OFF SELECTED GADGETS — LIMITED TIME</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🚚 FREE ISLANDWIDE DELIVERY ON ORDERS OVER $75</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">⚡ NEW ARRIVALS: SONY WH-1000XM6 HEADPHONES IN STOCK</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🛡️ 6-MONTH WARRANTY ON ALL PREMIUM DEVICES</span>
          <span className="ticker-dot">•</span>
        </div>
      </div>
      <div className="marquee-fade-right"></div>
    </div>
  );
}
