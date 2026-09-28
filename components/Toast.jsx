'use client';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast active" id="toast">
      <div className="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="toast-message">{message}</span>
    </div>
  );
}
