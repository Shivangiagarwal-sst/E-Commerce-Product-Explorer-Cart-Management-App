import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { sortProducts } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { FaTimes, FaFilter, FaSortAmountDown } from 'react-icons/fa';

import './Products.css';

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: '$0 - $100', value: '0-100' },
  { label: '$100 - $500', value: '100-500' },
  { label: '$500 - $1000', value: '500-1000' },
  { label: '$1000+', value: '1000+' }
];

const Products = () => {
  const { products, categories, loading } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (debouncedSearch) {
      result = result.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }
    
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (priceRange !== 'all') {
      if (priceRange === '0-100') {
        result = result.filter(p => p.price >= 0 && p.price <= 100);
      } else if (priceRange === '100-500') {
        result = result.filter(p => p.price > 100 && p.price <= 500);
      } else if (priceRange === '500-1000') {
        result = result.filter(p => p.price > 500 && p.price <= 1000);
      } else if (priceRange === '1000+') {
        result = result.filter(p => p.price > 1000);
      }
    }

    return sortProducts(result, sortOption);
  }, [products, debouncedSearch, selectedCategory, priceRange, sortOption]);

  const hasActiveFilters = debouncedSearch || selectedCategory !== 'All' || priceRange !== 'all' || sortOption !== 'default';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange('all');
    setSortOption('default');
  };

  return (
    <div className="container products-page">
      
      <div className="products-header">
        <h1 className="page-title text-gradient">Explore Products 🎀</h1>
      </div>

      <div className="filters-bar glass-card">
        <div className="filters-grid">
          <div className="filter-item search-item">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          
          <div className="filter-item">
            <label className="filter-label"><FaFilter /> Category</label>
            <select 
              className="input-field styled-select" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label className="filter-label">🎀 Price Range</label>
            <select 
              className="input-field styled-select" 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label className="filter-label"><FaSortAmountDown /> Sort By</label>
            <select 
              className="input-field styled-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="active-filters-container">
        <span className="text-muted" style={{fontWeight: 600}}>Showing {filteredProducts.length} results</span>
        
        {hasActiveFilters && <div className="filter-divider"></div>}
        
        <AnimatePresence>
          {selectedCategory !== 'All' && (
            <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="badge active-badge">
              {selectedCategory} <span onClick={() => setSelectedCategory('All')} className="badge-close"><FaTimes/></span>
            </motion.div>
          )}
          {priceRange !== 'all' && (
            <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="badge active-badge">
              {priceRange === '1000+' ? '$1000+' : `$${priceRange}`} <span onClick={() => setPriceRange('all')} className="badge-close"><FaTimes/></span>
            </motion.div>
          )}
          {debouncedSearch && (
            <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="badge active-badge">
              "{debouncedSearch}" <span onClick={() => setSearchTerm('')} className="badge-close"><FaTimes/></span>
            </motion.div>
          )}
          {hasActiveFilters && (
            <motion.button 
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={clearAllFilters}
              className="btn btn-secondary clear-filters-btn"
            >
              Clear All 🗑️
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="loader-wrapper"><div className="spinner"></div></div>
      ) : filteredProducts.length > 0 ? (
        <motion.div layout className="products-grid">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="empty-state glass-card">
          <h3 style={{fontSize: '2rem', color: 'var(--primary)'}}>No products found 🌸</h3>
          <p className="text-muted" style={{fontSize: '1.1rem', marginTop: '1rem'}}>Try adjusting your filters or search term to find what you need!</p>
          <button className="btn btn-primary" style={{marginTop: '2rem'}} onClick={clearAllFilters}>
            Clear Filters ✨
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Products;
