import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="section-header" style={{ marginTop: 0, borderBottom: '3px dotted var(--border)' }}>
          <h1 className="page-title text-gradient">Shopping Cart 🛍️</h1>
        </div>
        <div className="empty-state glass-card" style={{ padding: '6rem 2rem', textAlign: 'center', border: '2px solid white' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }}>✨</div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '2.5rem' }}>Looks like your cart is empty</h2>
          <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>Add some items to your cart to get started!</p>
          <Link to="/products" className="btn btn-primary lg-btn">Start Shopping 💕</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <div className="section-header" style={{ marginTop: 0, borderBottom: '3px dotted var(--border)' }}>
        <h1 className="page-title text-gradient">Your Cute Cart 🛍️</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items-section">
          <div className="cart-list">
            {cartItems.filter(item => item && item.product).map(item => (
              <CartItem key={item.productId || item.product?.id || Math.random()} item={item} />
            ))}
          </div>

          <div className="cart-actions">
            <Link to="/products" className="back-link"><FaArrowLeft /> Keep Browsing 🎀</Link>
            <button className="btn btn-secondary" onClick={clearCart}>Empty Cart 🗑️</button>
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="glass-card summary-card">
            <h3 style={{ color: 'var(--primary)' }}>Order Summary ✨</h3>

            <div className="summary-row">
              <span className="text-muted font-bold">Subtotal</span>
              <span className="font-bold">{formatCurrency(cartTotal)}</span>
            </div>

            <div className="summary-row">
              <span className="text-muted font-bold">Estimated Tax (8%)</span>
              <span className="font-bold">{formatCurrency(tax)}</span>
            </div>

            <div className="summary-row">
              <span className="text-muted font-bold">Shipping</span>
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>Free 🌸</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total 💕</span>
              <span className="text-gradient">{formatCurrency(grandTotal)}</span>
            </div>

            <button
              className="btn btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Checkout Now ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
