import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
const mapProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  category: p.category,
  description: p.description,
  image: p.thumbnail,
  rating: {
    rate: p.rating,
    count: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100 + 1)
  }
});

export const api = {
  getProducts: async () => {
    const response = await axiosInstance.get('/products?limit=100');
    return response.data.products.map(mapProduct);
  },
  getProductById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return mapProduct(response.data);
  },
  getCategories: async () => {
    const response = await axiosInstance.get('/products/categories');
    return response.data.map(cat => cat.slug);
  },
  getProductsByCategory: async (category) => {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data.products.map(mapProduct);
  }
};
