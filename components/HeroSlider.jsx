'use client';

export default function HeroSlider({ currentSlide, onSelectSlide, onShowToast, onAddToCart }) {
  const slides = [
    {
      id: 0,
      category: 'AUDIO & HEADPHONES',
      bgImg: 'Images/BG/Image.png',
      cropImg: 'Images/Crop/Sony_ Headphones 1.png',
      cropAlt: 'Sony WH-1000XM6 Headphones Crop',
      cropClass: 'hero-headphone-crop-img',
      cropContainerClass: 'hero-headphone-crop-container',
      radialClass: 'hero-bg-overlay-radial',
      title: (
        <h1 className="hero-main-heading">
          SOUND<br />MEANT TO <br />
          <span className="hero-accent-heading">BE HEARD<span className="heading-period">.</span></span>
        </h1>
      ),
      subtext: 'Next-generation acoustic precision, active noise cancellation and masterfully tuned wireless freedom.',
      ctaBtnText: 'Shop Headphones',
      itemTitle: 'Sony WH-1000XM6 Wireless Headphones',
      itemPrice: 399
    },
    {
      id: 1,
      category: 'LAPTOPS & COMPUTING',
      bgImg: 'Images/BG/Image (1).png',
      cropImg: 'Images/Crop/_ (7) 1.png',
      cropAlt: 'MacBook Pro M3 Max Crop',
      cropClass: 'hero-laptop-crop-img',
      cropContainerClass: 'hero-laptop-crop-container',
      radialClass: 'hero-bg-overlay-radial-laptop',
      title: (
        <h1 className="hero-main-heading">
          LIMITLESS<br />Performance <br />
          <span className="hero-accent-heading-laptop">Unmatched Speed<span className="heading-period">.</span></span>
        </h1>
      ),
      subtext: 'Pro-grade processors, liquid retina displays and all-day battery power built for creators and engineers.',
      ctaBtnText: 'Shop Laptops',
      itemTitle: 'Apple MacBook Pro 16" M3 Max',
      itemPrice: 2499
    },
    {
      id: 2,
      category: 'SMARTPHONES',
      bgImg: 'Images/BG/Image (SMARTPHONES).png',
      cropImg: 'Images/Crop/Image (SMARTPHONES CROP).png',
      cropAlt: 'Flagship Smartphone Crop',
      cropClass: 'hero-headphone-crop-img',
      cropContainerClass: 'hero-smartphone-crop-container',
      radialClass: 'hero-bg-overlay-radial-smartphone',
      title: (
        <h1 className="hero-main-heading">
          Smarter Tech<br />
          <span className="smartphone-detail-wrapper">
            and Portability<span className="heading-period">.</span>
          </span>
        </h1>
      ),
      subtext: 'Flagship mobile devices with pro camera systems, vivid displays and ultra-fast 5G connectivity.',
      ctaBtnText: 'Shop Smartphones',
      itemTitle: 'iPhone 15 Pro Max 256GB',
      itemPrice: 1199
    },
    {
      id: 3,
      category: 'CAMERAS & EQUIPMENT',
      bgImg: 'Images/BG/Image (CAMERAS).png',
      cropImg: 'Images/Crop/_ (6) 1.png',
      cropAlt: 'Professional Camera Gear Crop',
      cropClass: 'hero-camera-crop-img',
      cropContainerClass: 'hero-camera-crop-container',
      radialClass: 'hero-bg-overlay-radial-camera',
      title: (
        <h1 className="hero-main-heading">
          Capture Every<br />Moment in <br />
          <span className="hero-accent-heading-camera">Stunning Detail<span className="heading-period">.</span></span>
        </h1>
      ),
      subtext: 'DSLRs, mirrorless cameras and professional lenses gear up and tell your story beautifully.',
      ctaBtnText: 'Shop Camera Gear',
      itemTitle: 'Sony Alpha A7 IV Mirrorless Camera',
      itemPrice: 2498
    },
    {
      id: 4,
      category: 'DRONES',
      bgImg: 'Images/BG/Image (DRONES).png',
      cropImg: 'Images/Crop/Gemini_Generated_Image_c1dnnkc1dnnkc1dn.png',
      cropAlt: 'DJI Professional Camera Drone Crop',
      cropClass: 'hero-drone-crop-img',
      cropContainerClass: 'hero-drone-crop-container',
      radialClass: 'hero-bg-overlay-radial-drone',
      title: (
        <h1 className="hero-main-heading">
          THE WORLD<br />from a <span className="hero-accent-heading-drone">NEW PERSPECTIVE<span className="heading-period">.</span></span>
        </h1>
      ),
      subtext: 'Professional and recreational drones with 4K stabilised cameras — explore the skies like never before.',
      ctaBtnText: 'Shop Drones',
      itemTitle: 'DJI Avata 4K FPV Drone',
      itemPrice: 999
    }
  ];

  const handlePrev = () => {
    const nextIdx = (currentSlide - 1 + slides.length) % slides.length;
    onSelectSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentSlide + 1) % slides.length;
    onSelectSlide(nextIdx);
  };

  return (
    <section className="hero-slider-section">
      <div className="hero-slides-wrapper">
        {slides.map((slide) => {
          const isActive = slide.id === currentSlide;
          return (
            <article key={slide.id} className={`hero-slide ${isActive ? 'active-slide' : ''}`}>
              {/* Background Layers */}
              <div className="hero-slide-bg-container">
                <img src={slide.bgImg} alt={`${slide.category} Background`} className="hero-bg-img" />
                <div className="hero-bg-overlay-linear"></div>
                <div className={slide.radialClass}></div>
              </div>

              {/* Product Crop Image Layer */}
              <div className={slide.cropContainerClass}>
                <img src={slide.cropImg} alt={slide.cropAlt} className={`${slide.cropClass} float-animation`} />
              </div>

              {/* Content Overlay */}
              <div className="hero-content-layer">
                <div className="category-tag-container">
                  <div className="category-tag-bar"></div>
                  <span className="category-tag-text">{slide.category}</span>
                </div>

                <div className="hero-title-group">
                  {slide.title}
                </div>

                <p className="hero-subtext">{slide.subtext}</p>
              </div>

              {/* Bottom CTA Button */}
              <div className="hero-bottom-cta">
                <button
                  className="btn btn-shop-now"
                  onClick={() => {
                    onAddToCart({ title: slide.itemTitle, price: slide.itemPrice, image: slide.cropImg });
                    onShowToast(`Added ${slide.itemTitle} to your cart!`);
                  }}
                >
                  {slide.ctaBtnText}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <div className="hero-nav-arrows">
        <button className="slider-arrow-btn prev-arrow" onClick={handlePrev} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="slider-arrow-btn next-arrow" onClick={handleNext} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Slide Indicator Dots */}
      <div className="hero-dots-container">
        {slides.map((slide) => (
          <button
            key={slide.id}
            className={`hero-dot ${slide.id === currentSlide ? 'active' : ''}`}
            onClick={() => onSelectSlide(slide.id)}
            aria-label={`Go to slide ${slide.id + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
