import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setCategories(['All', ...categoriesData]);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return { products, categories, loading, error };
};
