import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '3rem 0',
      marginTop: 'auto',
      textAlign: 'center',
      color: 'var(--text-muted)',
      background: 'rgba(255, 255, 255, 0.5)',
      borderTop: '2px dashed var(--border)'
    }}>
      <div className="container">
        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
          &copy; {new Date().getFullYear()} VibeStore ✨ All rights reserved 💕
        </p>
      </div>
    </footer>
  );
};

export default Footer;
