
import axiosInstance from '../utils/axiosInstance';

// Cart API functions using shared axiosInstance

export const getCart = () => {
  return axiosInstance.get('/cart');
};

export const addToCart = (productId, quantity) => {  
  return axiosInstance.post('/cart/add', { productId, quantity });
};

export const updateCartItem = (productId, quantity) => {
  return axiosInstance.put('/cart/update', { productId, quantity });
};

export const removeCartItem = (productId) => {
  return axiosInstance.delete(`/cart/remove/${productId}`);
};

export const clearCart = () => {
  return axiosInstance.delete('/cart/clear');
};
