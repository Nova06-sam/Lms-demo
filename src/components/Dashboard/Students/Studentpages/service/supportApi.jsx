import axios from 'axios';
// // import BACKEND_URL from '../../../../../api/Api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// FAQ APIs
export const supportApi = {
  // Get all FAQs
  getFAQs: async (params = {}) => {
    try {
      const response = await api.get('/support/faqs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },

  // Vote on FAQ
  voteFAQ: async (faqId, isHelpful) => {
    try {
      const response = await api.post(`/support/faqs/${faqId}/vote`, { isHelpful });
      return response.data;
    } catch (error) {
      console.error('Error voting on FAQ:', error);
      throw error;
    }
  },

  // Support Ticket APIs
  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/support/tickets', ticketData);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },

  getUserTickets: async (params = {}) => {
    try {
      const response = await api.get('/support/tickets', { params });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      throw error;
    }
  },

  getTicket: async (ticketId) => {
    try {
      const response = await api.get(`/support/tickets/${ticketId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  },

  updateTicket: async (ticketId, updates) => {
    try {
      const response = await api.put(`/support/tickets/${ticketId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  },

  addTicketMessage: async (ticketId, messageData) => {
    try {
      const response = await api.post(`/support/tickets/${ticketId}/messages`, messageData);
      return response.data;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  rateTicket: async (ticketId, ratingData) => {
    try {
      const response = await api.post(`/support/tickets/${ticketId}/rate`, ratingData);
      return response.data;
    } catch (error) {
      console.error('Error rating ticket:', error);
      throw error;
    }
  },

  // Chat APIs
  startChatSession: async (department = 'general') => {
    try {
      const response = await api.post('/support/chat/start', { department });
      return response.data;
    } catch (error) {
      console.error('Error starting chat session:', error);
      throw error;
    }
  },

  getChatMessages: async (sessionId) => {
    try {
      const response = await api.get(`/support/chat/${sessionId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  },

  sendChatMessage: async (sessionId, message, attachments = []) => {
    try {
      const response = await api.post(`/support/chat/${sessionId}/message`, {
        message,
        attachments
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  endChatSession: async (sessionId, rating = null, feedback = '') => {
    try {
      const response = await api.post(`/support/chat/${sessionId}/end`, {
        rating,
        feedback
      });
      return response.data;
    } catch (error) {
      console.error('Error ending chat session:', error);
      throw error;
    }
  },

  // Admin APIs
  getSupportStatistics: async () => {
    try {
      const response = await api.get('/support/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  getAllTickets: async (params = {}) => {
    try {
      const response = await api.get('/support/tickets/admin/all', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all tickets:', error);
      throw error;
    }
  },
};

export default api;