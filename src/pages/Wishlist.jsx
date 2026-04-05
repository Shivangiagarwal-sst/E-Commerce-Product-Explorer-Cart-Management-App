import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="section-header" style={{ marginTop: 0, borderBottom: '3px dotted var(--border)' }}>
        <h1 className="page-title text-gradient">Your Wishlist 💕</h1>
        <span className="badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>{wishlistItems.length} Items Saved 🎀</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="products-grid">
          {wishlistItems.filter(item => item && item.product).map(item => (
            <ProductCard key={item.productId || item.product?.id || Math.random()} product={item.product} />
          ))}
        </div>
      ) : (
        <div className="empty-state glass-card" style={{ padding: '6rem 2rem', textAlign: 'center', border: '2px solid white' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>🤍</div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '2.5rem' }}>Your wishlist is empty</h2>
          <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>Save your favorite cute items here to review them later.</p>
          <Link to="/products" className="btn btn-primary lg-btn">Start Browsing ✨</Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
