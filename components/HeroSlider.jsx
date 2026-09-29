'use client';

export default function HeroSlider({ currentSlide, onSelectSlide, onShowToast, onAddToCart }) {
  const slides = [
    {
      id: 0,
      category: 'HEADPHONES & EARPHONES',
      bgImg: '/Images/BG/0801dd1423fa7c87b7b588d47af82ce8b25ef1f8.jpg',
      cropImg: '/Images/Crop/Gemini_Generated_Image_e5g5lee5g5lee5g5-nobg.png',
      cropAlt: 'Premium Wireless Headphones',
      cropClass: 'hero-headphone-crop-img',
      cropContainerClass: 'hero-product-crop-container',
      radialClass: 'hero-bg-overlay-radial',
      title: (
        <div className="hero-title-group">
          <h1 className="hero-main-heading">Hear Music the Way It Was</h1>
          <div className="hero-accent-heading">MEANT TO <br />SOUND<span className="heading-period">.</span></div>
        </div>
      ),
      subtext: 'Industry leading noise cancellation, high resolution audio and all day comfort your world, your sound.',
      ctaBtnText: 'Shop Now',
      itemTitle: 'Sony WH-1000XM6 Wireless Headphones',
      itemPrice: 399
    },
    {
      id: 1,
      category: 'LAPTOPS & COMPUTING',
      bgImg: '/Images/BG/Image (LAPTOPS).png',
      cropImg: '/Images/Crop/Mac Bro _ Social Media Design _ Reels Cover 1.png',
      cropAlt: 'MacBook Professional Laptop Crop',
      cropClass: 'hero-laptop-crop-img',
      cropContainerClass: 'hero-laptop-crop-container',
      radialClass: 'hero-bg-overlay-radial-laptop',
      title: (
        <div className="hero-title-group">
          <h1 className="hero-main-heading">
            LIMITLESS<br />Performance <br />
            <span className="hero-accent-heading-laptop">Unmatched Speed<span className="heading-period">.</span></span>
          </h1>
        </div>
      ),
      subtext: 'Pro-grade processors, liquid retina displays and all-day battery power built for creators and engineers.',
      ctaBtnText: 'Shop Laptops',
      itemTitle: 'Apple MacBook Pro 16" M3 Max',
      itemPrice: 2499
    },
    {
      id: 2,
      category: 'SMARTPHONES',
      bgImg: '/Images/BG/3147af643d1a2f13f52036aeaea5fac0b6bb8050.jpg',
      cropImg: '/Images/Crop/550252c942e1e715d07a433402f5efe4da71f100.png',
      cropAlt: 'Flagship Smartphone Crop',
      cropClass: 'hero-phone-crop-img',
      cropContainerClass: 'hero-phone-crop-container',
      radialClass: 'hero-bg-overlay-radial-phone',
      title: (
        <div className="hero-title-group">
          <h1 className="hero-main-heading">
            The <span className="hero-accent-heading-future">FUTURE</span><br />
            Is In Your Hands<span className="heading-period">.</span>
          </h1>
        </div>
      ),
      subtext: 'The latest flagship smartphones with pro grade cameras, powerful processors and all day battery life.',
      ctaBtnText: 'Shop Now',
      itemTitle: 'iPhone 15 Pro Max 256GB',
      itemPrice: 1199
    },
    {
      id: 3,
      category: 'CAMERAS & EQUIPMENT',
      bgImg: '/Images/BG/b8a1eeb26d006747c5bf25eb31f222c79327bce8.jpg',
      cropImg: '/Images/Crop/_ (6) 1.png',
      cropAlt: 'Professional Camera Gear Crop',
      cropClass: 'hero-camera-crop-img',
      cropContainerClass: 'hero-camera-crop-container',
      radialClass: 'hero-bg-overlay-radial-camera',
      title: (
        <div className="hero-title-group">
          <h1 className="hero-main-heading">
            Capture Every<br />Moment in <br />
            <span className="hero-accent-heading-camera">Stunning Detail<span className="heading-period">.</span></span>
          </h1>
        </div>
      ),
      subtext: 'DSLRs, mirrorless cameras and professional lenses gear up and tell your story beautifully.',
      ctaBtnText: 'Shop Camera Gear',
      itemTitle: 'Sony Alpha A7 IV Mirrorless Camera',
      itemPrice: 2498
    },
    {
      id: 4,
      category: 'DRONES',
      bgImg: '/Images/BG/Image (DRONES).png',
      cropImg: '/Images/Crop/Gemini_Generated_Image_c1dnnkc1dnnkc1dn.png',
      cropAlt: 'DJI Professional Camera Drone Crop',
      cropClass: 'hero-drone-crop-img',
      cropContainerClass: 'hero-drone-crop-container',
      radialClass: 'hero-bg-overlay-radial-drone',
      title: (
        <div className="hero-title-group">
          <h1 className="hero-main-heading">
            THE WORLD<br />from a <span className="hero-accent-heading-drone">NEW PERSPECTIVE<span className="heading-period">.</span></span>
          </h1>
        </div>
      ),
      subtext: 'Professional and recreational drones with 4K stabilised cameras — explore the skies like never before.',
      ctaBtnText: 'Shop Drones',
      itemTitle: 'DJI Avata 4K FPV Drone',
      itemPrice: 999
    }
  ];

  return (
    <section className={`hero-section ${currentSlide === 2 ? 'phone-slide-active' : ''}`}>
      <div className="hero-slides-wrapper">
        {slides.map((slide) => {
          const isActive = slide.id === currentSlide;
          return (
            <article key={slide.id} className={`hero-slide ${isActive ? 'active' : ''}`}>
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

                {slide.title}

                <p className="hero-subtext">{slide.subtext}</p>
              </div>

              {/* Centered Bottom CTA */}
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

      {/* Carousel Pagination Dots & Loading Bar */}
      <div className="hero-pagination" id="heroPagination">
        {slides.map((slide) => (
          <button
            key={`${slide.id}-${slide.id === currentSlide ? 'active' : 'idle'}`}
            className={`page-dot ${slide.id === currentSlide ? 'active' : ''}`}
            onClick={() => onSelectSlide(slide.id)}
            aria-label={`Slide ${slide.id + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
