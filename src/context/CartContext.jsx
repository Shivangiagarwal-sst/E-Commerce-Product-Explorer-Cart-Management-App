import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter(item => item && item.product) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find(item => item.productId === product.id);
    if (existing) {
      toast.info(`Increased quantity of ${product.title}`);
      setCartItems(prev => prev.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      toast.success(`Added ${product.title} to cart`);
      setCartItems(prev => [...prev, { 
        productId: product.id, 
        quantity, 
        price: product.price,
        product // keeping full product for easy display
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    toast.error('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
