import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/products/${product.id}`} className="product-card glass-card">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
          <button 
            className="wishlist-btn-overlay" 
            onClick={handleToggleWishlist}
            aria-label="Toggle wishlist"
          >
            {inWishlist ? <span className="heart-emoji active">💖</span> : <span className="heart-emoji">🤍</span>}
          </button>
        </div>
        
        <div className="product-content">
          <span className="badge category-badge">{product.category}</span>
          <h3 className="product-title" title={product.title}>{product.title}</h3>
          
          <div className="product-meta">
            <div className="product-rating">
              <FaStar className="star-icon" />
              <span>{product.rating?.rate} ({product.rating?.count})</span>
            </div>
          </div>
          
          <div className="product-footer">
            <span className="product-price">{formatCurrency(product.price)}</span>
            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
              🛒
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
