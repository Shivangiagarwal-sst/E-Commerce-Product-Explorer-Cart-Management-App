import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🦋</span>
          <span className="logo-text text-gradient">VibeStore ✨</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/wishlist" className="action-btn">
            <FaHeart className="heart-icon" />
            {wishlistItems.length > 0 && <span className="badge-count wishlist-badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="action-btn">
            <FaShoppingCart />
            {cartCount > 0 && <span className="badge-count cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
