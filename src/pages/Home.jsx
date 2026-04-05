import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import './Home.css';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Vibe ✨",
      subtitle: "The cutest tech & accessories you'll ever need.",
      image: "/hero-slide-1.png"
    },
    {
      id: 2,
      title: "Discover Your Perfect Style",
      subtitle:"Explore curated products designed for comfort, elegance, and everyday use.",
      image: "/hero-slide-2.png"
    }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-swiper"
        >
          {heroSlides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ duration: 0.8, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                    className="hero-title"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-subtitle"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Link to="/products" className="btn btn-primary hero-btn">
                      Shop Now 💕 <FaArrowRight style={{marginLeft: '8px'}} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <Link to="/products" className="view-all-link">View All <FaArrowRight/></Link>
        </div>

        {loading ? (
          <div className="loader-wrapper"><div className="spinner"></div></div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      <section className="categories-preview-section container">
         <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card promo-banner"
         >
            <div className="promo-content">
              <h2>Spring Arrivals 🌷</h2>
              <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                Refresh your collection with our softest drops yet.
              </p>
              <Link to="/products" className="btn btn-primary">Explore Category</Link>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Home;
