/* ==========================================================================
   SIMPLYTEK - INTERACTIVE FRONTEND LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initViewSwitcher();
  initModalsAndDrawers();
});

/* --------------------------------------------------------------------------
   1. HERO CAROUSEL CONTROLLER
   -------------------------------------------------------------------------- */
let currentSlideIndex = 0;
let slideInterval = null;
const SLIDE_COUNT = 5;
const AUTO_PLAY_DELAY = 5500;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.page-dot');
  const heroSection = document.getElementById('heroSection');

  if (!slides.length || !dots.length) return;

  function goToSlide(index) {
    if (index < 0) index = SLIDE_COUNT - 1;
    if (index >= SLIDE_COUNT) index = 0;
    
    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Dot Click Listeners
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      goToSlide(idx);
      startAutoPlay();
    });
  });

  // Pause on hover
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const mainStoreView = document.getElementById('mainStoreView');
    if (mainStoreView && mainStoreView.classList.contains('active-view')) {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
        startAutoPlay();
      }
    }
  });

  // Touch Swipe navigation
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroSection) {
    heroSection.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        goToSlide(currentSlideIndex + 1);
      } else {
        goToSlide(currentSlideIndex - 1);
      }
      startAutoPlay();
    }
  }

  // Start initial autoplay
  startAutoPlay();
}


/* --------------------------------------------------------------------------
   2. VIEW SWITCHER & AUTH TABS
   -------------------------------------------------------------------------- */
function initViewSwitcher() {
  const mainStoreView = document.getElementById('mainStoreView');
  const authViewContainer = document.getElementById('authViewContainer');
  
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  
  const signInFormPanel = document.getElementById('signInFormPanel');
  const signUpFormPanel = document.getElementById('signUpFormPanel');
  
  const backToStoreBtn = document.getElementById('backToStoreBtn');
  const linkToSignUp = document.getElementById('linkToSignUp');
  const linkToSignIn = document.getElementById('linkToSignIn');

  // Switch between Main Store and Auth View
  window.switchView = function(viewName) {
    if (viewName === 'auth') {
      mainStoreView.classList.remove('active-view');
      authViewContainer.classList.add('active-view');
      window.scrollTo(0, 0);
    } else {
      authViewContainer.classList.remove('active-view');
      mainStoreView.classList.add('active-view');
      window.scrollTo(0, 0);
    }
  };

  // Switch between Log In and Sign Up Tabs
  window.switchAuthTab = function(tabName) {
    if (tabName === 'signup') {
      tabSignIn.classList.remove('active');
      tabSignUp.classList.add('active');
      signInFormPanel.classList.remove('active');
      signUpFormPanel.classList.add('active');
    } else {
      tabSignUp.classList.remove('active');
      tabSignIn.classList.add('active');
      signUpFormPanel.classList.remove('active');
      signInFormPanel.classList.add('active');
    }
  };

  if (tabSignIn) tabSignIn.addEventListener('click', () => switchAuthTab('signin'));
  if (tabSignUp) tabSignUp.addEventListener('click', () => switchAuthTab('signup'));

  if (backToStoreBtn) backToStoreBtn.addEventListener('click', () => switchView('store'));
  if (linkToSignUp) linkToSignUp.addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('signup'); });
  if (linkToSignIn) linkToSignIn.addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('signin'); });
}


/* --------------------------------------------------------------------------
   3. MODAL & DRAWER CONTROLLERS
   -------------------------------------------------------------------------- */
function initModalsAndDrawers() {
  // Auth Choice Modal
  const openAuthModalBtn = document.getElementById('openAuthModalBtn');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const authModalBackdrop = document.getElementById('authModalBackdrop');
  
  const btnGoToSignUp = document.getElementById('btnGoToSignUp');
  const btnGoToSignIn = document.getElementById('btnGoToSignIn');
  const btnViewProfile = document.getElementById('btnViewProfile');
  const btnAuthGoogle = document.getElementById('btnAuthGoogle');

  if (openAuthModalBtn) {
    openAuthModalBtn.addEventListener('click', () => {
      authModalBackdrop.classList.add('active');
    });
  }

  function closeAuthModal() {
    authModalBackdrop.classList.remove('active');
  }

  if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAuthModal);
  if (authModalBackdrop) {
    authModalBackdrop.addEventListener('click', (e) => {
      if (e.target === authModalBackdrop) closeAuthModal();
    });
  }

  if (btnGoToSignUp) {
    btnGoToSignUp.addEventListener('click', () => {
      closeAuthModal();
      switchView('auth');
      switchAuthTab('signup');
    });
  }

  if (btnGoToSignIn) {
    btnGoToSignIn.addEventListener('click', () => {
      closeAuthModal();
      switchView('auth');
      switchAuthTab('signin');
    });
  }

  if (btnViewProfile) {
    btnViewProfile.addEventListener('click', () => {
      closeAuthModal();
      showToast('Opening Account Profile...');
    });
  }

  if (btnAuthGoogle) {
    btnAuthGoogle.addEventListener('click', () => {
      closeAuthModal();
      simulateGoogleLogin();
    });
  }


  // Search Modal
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchModalBtn = document.getElementById('closeSearchModalBtn');
  const searchModalBackdrop = document.getElementById('searchModalBackdrop');
  const searchInput = document.getElementById('searchInput');

  if (openSearchBtn) {
    openSearchBtn.addEventListener('click', () => {
      searchModalBackdrop.classList.add('active');
      setTimeout(() => searchInput && searchInput.focus(), 100);
    });
  }

  function closeSearchModal() {
    searchModalBackdrop.classList.remove('active');
  }

  if (closeSearchModalBtn) closeSearchModalBtn.addEventListener('click', closeSearchModal);
  if (searchModalBackdrop) {
    searchModalBackdrop.addEventListener('click', (e) => {
      if (e.target === searchModalBackdrop) closeSearchModal();
    });
  }

  window.fillSearch = function(query) {
    if (searchInput) {
      searchInput.value = query;
      showToast(`Searching for "${query}"...`);
      setTimeout(closeSearchModal, 600);
    }
  };


  // Cart Drawer
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');

  if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
      cartDrawerBackdrop.classList.add('active');
    });
  }

  function closeCartDrawer() {
    cartDrawerBackdrop.classList.remove('active');
  }

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCartDrawer();
    });
  }
}


/* --------------------------------------------------------------------------
   4. INTERACTIVE CART & FORM UTILITIES
   -------------------------------------------------------------------------- */
window.updateQty = function(btn, delta) {
  const qtyPicker = btn.closest('.qty-picker');
  const qtyValSpan = qtyPicker.querySelector('.qty-val');
  let val = parseInt(qtyValSpan.textContent, 10) + delta;
  
  if (val < 1) val = 1;
  qtyValSpan.textContent = val;
  recalculateCartSubtotal();
};

window.removeItem = function(btn) {
  const itemRow = btn.closest('.cart-item');
  itemRow.style.opacity = '0';
  itemRow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    itemRow.remove();
    recalculateCartSubtotal();
    showToast('Item removed from cart');
  }, 200);
};

function recalculateCartSubtotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;

  cartItems.forEach(item => {
    const priceText = item.querySelector('.cart-item-price').textContent.replace(/[^0-9.]/g, '');
    const price = parseFloat(priceText) || 0;
    const qty = parseInt(item.querySelector('.qty-val').textContent, 10) || 1;
    total += price * qty;
  });

  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartBadge = document.getElementById('cartBadge');
  const cartCountHeader = document.getElementById('cartCountHeader');

  if (cartSubtotal) cartSubtotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (cartBadge) cartBadge.textContent = cartItems.length;
  if (cartCountHeader) cartCountHeader.textContent = cartItems.length;
}

window.togglePasswordVisibility = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  if (input.type === 'password') {
    input.type = 'text';
    btn.style.color = '#38bdf8';
  } else {
    input.type = 'password';
    btn.style.color = '#64748b';
  }
};

window.simulateGoogleLogin = function() {
  showToast('Connecting to Google Account...');
  setTimeout(() => {
    showToast('Welcome back, Alex Johnson!');
    if (window.switchView) window.switchView('store');
  }, 1200);
};

window.handleFormSubmit = function(e, successMessage) {
  e.preventDefault();
  showToast(successMessage);
  setTimeout(() => {
    if (window.switchView) window.switchView('store');
  }, 1000);
};


/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATIONS SYSTEM
   -------------------------------------------------------------------------- */
window.showToast = function(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};
