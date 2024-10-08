import axios from 'axios';

const BASE_URL = 'https://localhost:7006/api'; // Replace with your actual API base URL

export const API_ENDPOINTS = {
  GET_SERVICES: '/ServiceCategory/categories',
  GET_SERVICES_BY_CATEGORY: '/Service/services',
  GET_SERVICE_DETAILS: '/Service/service-detail', // Add this new endpoint
  GET_GRAVES_BY_CUSTOMER_CODE: '/MartyrGrave/getMartyrGraveByCustomerCode', // Add this new endpoint
  ADD_TO_CART: '/CartItems', // Add this new endpoint
  GET_CART_ITEMS: '/CartItems/cart', // Add this new endpoint
  CREATE_ORDER: '/Orders', // Add this new endpoint
  // Add other endpoints as needed
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_SERVICES}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getServicesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_SERVICES_BY_CATEGORY}?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services by category:', error);
    throw error;
  }
};

export const getServiceDetails = async (serviceId) => {
  try {
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_SERVICE_DETAILS}?serviceId=${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service details:', error);
    throw error;
  }
};

export const getGravesByCustomerCode = async (customerCode) => {
  try {
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_GRAVES_BY_CUSTOMER_CODE}/${customerCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching graves by customer code:', error);
    throw error;
  }
};

export const addToCart = async (cartItem) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Sending cart item:', cartItem); // Log the cart item being sent
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.ADD_TO_CART}`); // Log the full API URL

    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.ADD_TO_CART}`, cartItem, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Response:', response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCartItemsByCustomerId = async (customerId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_CART_ITEMS}/${customerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('API Response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const createOrder = async (accountId) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Creating order for account ID:', accountId);
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.CREATE_ORDER}/${accountId}`);

    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CREATE_ORDER}?customerId=${accountId}`, 
      {}, // Empty object as we're not sending any data in the body
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCartItems = async (accountId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_CART_ITEMS}/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// You can add more API functions here as needed
