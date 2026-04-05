import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import './Checkout.css';

const schema = yup.object({
  firstName: yup.string().required('First name is required 💕'),
  lastName: yup.string().required('Last name is required 💕'),
  email: yup.string().email('Invalid email').required('Email is required 💌'),
  address: yup.string().required('Address is required 🏡'),
  city: yup.string().required('City is required 🏙️'),
  zipCode: yup.string().required('Zip code is required 📮'),
  cardNumber: yup.string().length(16, 'Card Number must be 16 digits').required('Card number is required 💳'),
  expiry: yup.string().required('Expiry date is required ⏳'),
  cvv: yup.string().length(3, 'CVV must be 3 digits').required('CVV is required 🔒')
}).required();

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  const onSubmit = (data) => {
    setTimeout(() => {
      toast.success('✨ Order placed successfully! Thank you for shopping! 🌸');
      clearCart();
      navigate('/');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{paddingTop: '5rem', textAlign: 'center'}}>
        <h2 style={{color: 'var(--primary)'}}>Your cart is empty 💕 Add some cute items to proceed!</h2>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div className="section-header" style={{marginTop: 0, borderBottom: '3px dotted var(--border)'}}>
        <h1 className="page-title text-gradient">Secure Checkout 💳</h1>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card checkout-form">
            
            <h3 className="form-section-title">Shipping Details 💌</h3>
            <div className="form-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" className="input-field" {...register("firstName")} />
                {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" className="input-field" {...register("lastName")} />
                {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
              </div>
            </div>
            
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" className="input-field" {...register("email")} />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label>Street Address</label>
              <input type="text" className="input-field" {...register("address")} />
              {errors.address && <span className="error-text">{errors.address.message}</span>}
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>City</label>
                <input type="text" className="input-field" {...register("city")} />
                {errors.city && <span className="error-text">{errors.city.message}</span>}
              </div>
              <div className="input-group">
                <label>Zip Code</label>
                <input type="text" className="input-field" {...register("zipCode")} />
                {errors.zipCode && <span className="error-text">{errors.zipCode.message}</span>}
              </div>
            </div>

            <h3 className="form-section-title" style={{marginTop: '3rem'}}>Payment Information ✨</h3>
            <div className="input-group">
              <label>Card Number</label>
              <input type="text" maxLength="16" placeholder="1234567890123456" className="input-field" {...register("cardNumber")} />
              {errors.cardNumber && <span className="error-text">{errors.cardNumber.message}</span>}
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Expiry Date (MM/YY)</label>
                <input type="text" placeholder="MM/YY" className="input-field" {...register("expiry")} />
                {errors.expiry && <span className="error-text">{errors.expiry.message}</span>}
              </div>
              <div className="input-group">
                <label>CVV</label>
                <input type="text" maxLength="3" placeholder="123" className="input-field" {...register("cvv")} />
                {errors.cvv && <span className="error-text">{errors.cvv.message}</span>}
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-order-btn">
              Place Order 💖
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="glass-card summary-card">
            <h3 style={{color: 'var(--primary)'}}>Order Summary ✨</h3>
            
            <div className="checkout-items-preview">
              {cartItems.map(item => (
                <div key={item.productId} className="preview-item">
                  <div className="preview-img-wrapper">
                    <img src={item.product.image} alt={item.product.title} />
                    <span className="preview-qty">{item.quantity}</span>
                  </div>
                  <div className="preview-details">
                    <p className="preview-title">{item.product.title}</p>
                    <p className="preview-price">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span className="text-muted font-bold">Subtotal</span>
              <span className="font-bold">{formatCurrency(cartTotal)}</span>
            </div>
            
            <div className="summary-row">
              <span className="text-muted font-bold">Tax (8%)</span>
              <span className="font-bold">{formatCurrency(tax)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total 💕</span>
              <span className="text-gradient">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
