import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loader-wrapper"><div className="spinner"></div></div>;
  if (!product) return <div className="container" style={{paddingTop: '5rem', textAlign: 'center'}}><h2 style={{color:'var(--primary)'}}>Product not found 🌸</h2></div>;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="container product-details-page">
      <Link to="/products" className="back-link"><FaArrowLeft style={{opacity: 0.7}} /> Back to Shop 🎀</Link>
      
      <div className="details-layout">
        <motion.div 
          className="image-col glass-card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.title} className="details-image" />
        </motion.div>
        
        <motion.div 
          className="info-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="badge details-badge">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>
          
          <div className="details-meta">
            <div className="rating">
              <FaStar className="star-icon" />
              <span>{product.rating?.rate} ({product.rating?.count} reviews)</span>
            </div>
          </div>
          
          <div className="details-price text-gradient">{formatCurrency(product.price)}</div>
          
          <div className="details-description glass-card" style={{padding: '1.5rem', marginBottom: '2.5rem'}}>
            <p className="text-muted">{product.description}</p>
          </div>
          
          <div className="details-actions">
            <button className="btn btn-primary lg-btn shadow-hover" onClick={() => addToCart(product)}>
              🛒 Add to Cart ✨
            </button>
            
            <button 
              className={`btn ${inWishlist ? 'btn-secondary active-wishlist' : 'btn-secondary'} lg-btn wishlist-btn`}
              onClick={() => toggleWishlist(product)}
            >
              {inWishlist ? '💖 Saved to Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
          
          <div className="details-features text-muted">
            <p>✨ Free shipping on orders over $50</p>
            <p>🌸 30-day return policy</p>
            <p>💕 Secure checkout guaranteed</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
