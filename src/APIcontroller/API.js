import axios from 'axios';

const BASE_URL = 'https://localhost:7006/api'; // Replace with your actual API base URL

export const API_ENDPOINTS = {
  GET_SERVICES: '/ServiceCategory/categories',
  GET_SERVICES_BY_CATEGORY: '/Service/services',
  GET_SERVICE_DETAILS: '/Service/service-detail', // Add this new endpoint
  GET_GRAVES_BY_CUSTOMER_CODE: '/MartyrGrave/getMartyrGraveByCustomerCode', // Add this new endpoint
  ADD_TO_CART: '/CartItems', // Add this new endpoint
  GET_CHECKOUT_ITEMS: '/CartItems/checkout', 
  GET_CART_ITEMS_BY_CUSTOMER_ID: '/CartItems/cart',// Add this new endpoint
  CREATE_ORDER: '/Orders', // Add this new endpoint
  GET_ALL_ORDERS: '/Orders',
  GET_ORDER_BY_ID: '/Orders', // Add this new endpoint
  UPDATE_ITEM_STATUS: '/updateItemStatus', // Make sure this is correct
  DELETE_CART_ITEM: '/CartItems', // Add this new endpoint
  CREATE_TASK: '/Task/tasks', // Add this new endpoint
  GET_TASKS_BY_ACCOUNT: '/Task/tasks/account', // Add this new endpoint
  UPDATE_TASK_STATUS: '/Task/tasks', // Update this line
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
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_CART_ITEMS_BY_CUSTOMER_ID}/${customerId}`, {
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
export const getCheckoutItemsByCustomerId = async (customerId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_CHECKOUT_ITEMS}/${customerId}`, {
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

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Fetching all orders');
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.GET_ALL_ORDERS}`);
    console.log('Token:', token);

    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_ALL_ORDERS}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_ORDER_BY_ID}/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export const updateItemStatus = async (cartId, selected) => {
  try {
    const token = localStorage.getItem('accessToken');
    // Remove the BASE_URL from here since it's already included in the constant
    const url = `${API_ENDPOINTS.UPDATE_ITEM_STATUS}/${cartId}/${selected}`;
    console.log('Updating item status. Full URL:', `${BASE_URL}${url}`);
    console.log('Token:', token);

    const response = await axios.put(`${BASE_URL}${url}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Update item status response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating item status:", error.response ? error.response.data : error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Deleting cart item with ID:', cartItemId);
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.DELETE_CART_ITEM}/${cartItemId}`);

    const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.DELETE_CART_ITEM}/${cartItemId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createTaskForStaff = async (tasksData) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Creating tasks for staff:', JSON.stringify(tasksData, null, 2));
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.CREATE_TASK}`);

    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.CREATE_TASK}`, tasksData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Detailed error response:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error creating tasks for staff:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add this new function to fetch tasks by account ID
export const getTasksByAccountId = async (accountId) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log(`Fetching tasks for account ID: ${accountId}`);
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.GET_TASKS_BY_ACCOUNT}/${accountId}`);

    const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.GET_TASKS_BY_ACCOUNT}/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks for account:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add this new function to update task status
export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log(`Updating task status for task ID: ${taskId} to status: ${newStatus}`);
    console.log('API URL:', `${BASE_URL}${API_ENDPOINTS.UPDATE_TASK_STATUS}/${taskId}/status/${newStatus}`);

    const response = await axios.put(`${BASE_URL}${API_ENDPOINTS.UPDATE_TASK_STATUS}/${taskId}/status/${newStatus}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// You can add more API functions here as needed

export const getTaskById = async (taskId) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('Fetching task with ID:', taskId); // Debug log
    const response = await axios.get(`${BASE_URL}/Task/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('API response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching task details:', error);
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('You do not have permission to access this task. Please check your authentication.');
      } else {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        if (error.response.headers['content-type']?.includes('text/plain')) {
          throw new Error(`Server error: ${error.response.data}`);
        } else {
          throw new Error('An error occurred while fetching the task. Please try again later.');
        }
      }
    } else if (error.request) {
      console.error('Error request:', error.request);
      throw new Error('Unable to reach the server. Please check your internet connection.');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};
