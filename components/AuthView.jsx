'use client';
import { useState } from 'react';

export default function AuthView({ initialTab = 'signin', onBackToStore, onShowToast }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      onShowToast('Please fill in all required fields.');
      return;
    }
    onShowToast('Welcome back! Logging you in...');
    setTimeout(() => {
      onBackToStore();
    }, 1200);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      onShowToast('Please complete all registration fields.');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      onShowToast('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      onShowToast('Please agree to the Terms & Conditions.');
      return;
    }
    onShowToast('Account created successfully! Welcome to SimplyTek.');
    setTimeout(() => {
      onBackToStore();
    }, 1200);
  };

  const handleGoogleLogin = () => {
    onShowToast('Connecting to Google Account...');
    setTimeout(() => {
      onShowToast('Welcome back, Alex Johnson!');
      onBackToStore();
    }, 1200);
  };

  return (
    <div className="view-panel auth-page-container active-view">
      <div className="auth-split-layout">
        {/* Left Branding Showcase Panel */}
        <div className="auth-left-banner" style={{ backgroundImage: "url('Images/BG/_ (8) 1.png')" }}>
          <div className="auth-banner-overlay"></div>
          <div className="auth-banner-content">
            <div className="brand-logo light-logo">
              <div className="logo-box">S</div>
              <span className="logo-text">SIMPLY<span className="logo-highlight">TEK</span></span>
            </div>

            <div className="banner-hero-text">
              <h2 className="banner-title">
                Technology.<br />
                <span className="banner-title-gradient">Simplified.</span>
              </h2>
              <p className="banner-subtext">
                Premium gadgets and smarter technology, all in one place. Shop with confidence, delivered to your door.
              </p>
            </div>

            <div className="auth-feature-list">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>Authenticated products only</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span>4.9 star average customer rating</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <span>Fast islandwide delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Switcher Panel */}
        <div className="auth-right-form">
          <div className="form-header-bar">
            <button className="back-link-btn" onClick={onBackToStore}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to store
            </button>
          </div>

          <div className="auth-form-wrapper">
            {/* Logo header inside mobile form */}
            <div className="brand-logo mobile-auth-logo">
              <div className="logo-box">S</div>
              <span className="logo-text">SIMPLY<span className="logo-highlight">TEK</span></span>
            </div>

            {/* Log In / Sign Up Toggle Pill */}
            <div className="auth-tabs">
              <button
                className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                onClick={() => setActiveTab('signin')}
              >
                Log In
              </button>
              <button
                className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* TAB 1: SIGN IN FORM */}
            {activeTab === 'signin' && (
              <div className="auth-form-panel active">
                <div className="form-heading">
                  <h3>Welcome Back</h3>
                  <p>Sign in to continue shopping with SimplyTek.</p>
                </div>

                <button className="btn btn-google-full" onClick={handleGoogleLogin}>
                  <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <form onSubmit={handleSignInSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-with-eye">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="eye-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ color: showPassword ? '#38bdf8' : '#64748b' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); onShowToast('Reset link sent to your email.'); }}>
                      Forgot password?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-auth-submit">
                    Sign In
                  </button>
                </form>

                <p className="auth-switch-text">
                  Don't have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }}>
                    Create account
                  </a>
                </p>
              </div>
            )}

            {/* TAB 2: SIGN UP FORM */}
            {activeTab === 'signup' && (
              <div className="auth-form-panel active">
                <div className="form-heading">
                  <h3>Create Account</h3>
                  <p>Join thousands of happy customers today.</p>
                </div>

                <button className="btn btn-google-full" onClick={handleGoogleLogin}>
                  <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <form onSubmit={handleSignUpSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Alex Johnson"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-with-eye">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="eye-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ color: showPassword ? '#38bdf8' : '#64748b' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-with-eye">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="eye-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ color: showConfirmPassword ? '#38bdf8' : '#64748b' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-auth-submit">
                    Create Account
                  </button>
                </form>

                <p className="auth-switch-text">
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('signin'); }}>
                    Log in
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
