import React from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  // 🔥 SAFETY CHECK (prevents crash)
  if (!item || !item.product) return null;

  const { product, quantity } = item;

  return (
    <div className="cart-item glass-card">
      
      <div className="cart-item-image-wrapper">
        <img 
          src={product?.image || ''} 
          alt={product?.title || ''} 
          className="cart-item-image" 
        />
      </div>
      
      <div className="cart-item-details">
        <h4 className="cart-item-title">
          {product?.title || 'No title'}
        </h4>

        <p className="cart-item-category text-muted">
          {product?.category || 'No category'}
        </p>

        <span className="cart-item-price text-gradient">
          {formatCurrency(product?.price || 0)}
        </span>
      </div>

      <div className="cart-item-actions">
        
        <div className="quantity-controls">
          <button 
            className="qty-btn" 
            onClick={() => updateQuantity(product?.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>

          <span className="qty-display">{quantity}</span>

          <button 
            className="qty-btn" 
            onClick={() => updateQuantity(product?.id, quantity + 1)}
          >
            <FaPlus />
          </button>
        </div>
        
        <div className="cart-item-total">
          {formatCurrency((product?.price || 0) * quantity)}
        </div>

        <button 
          className="remove-btn" 
          onClick={() => removeFromCart(product?.id)}
          aria-label="Remove item"
        >
          <FaTrash />
        </button>

      </div>
    </div>
  );
};

export default CartItem;