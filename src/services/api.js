// WKND Warrior API Service - Connects to your backend! 🚀
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  // Authentication
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }
      
      return { success: true, user: data.user, token: data.token };
    } catch (error) {
      return { success: false, error: 'Network error - is your backend running?' };
    }
  },
  
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      
      return { success: true, user: data.user, token: data.token };
    } catch (error) {
      return { success: false, error: 'Network error - is your backend running?' };
    }
  },

  // User Dashboard Data
  getUserDashboard: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/api/user/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Error loading dashboard: ' + error.message);
    }
  },

  // THE CORE FEATURE: Find Perfect Weekends! 🎯
  findPerfectWeekends: async (token) => {
    try {
      // Get today's date for the API call
      const today = new Date().toISOString().split('T')[0];
      
      const response = await fetch(`${API_BASE}/api/user/weekend-events?date=${today}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to find weekend events');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Error finding weekends: ' + error.message);
    }
  },

  // Test backend health
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/health`);
      return await response.json();
    } catch (error) {
      throw new Error('Backend connection failed');
    }
  }
};

export default api;