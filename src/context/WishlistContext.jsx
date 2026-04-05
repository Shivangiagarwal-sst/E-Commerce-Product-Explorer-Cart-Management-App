import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Filter out older schema items without product
      return Array.isArray(parsed) ? parsed.filter(item => item && item.product) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(item => item.productId === product.id);
    if (exists) {
      toast.info(`Removed ${product.title} from wishlist`);
      setWishlistItems(prev => prev.filter(item => item.productId !== product.id));
    } else {
      toast.success(`Added ${product.title} to wishlist`);
      setWishlistItems(prev => [...prev, { productId: product.id, product }]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
