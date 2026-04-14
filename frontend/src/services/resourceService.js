import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/resources';

const resourceService = {
  // Get all resources
  getAllResources: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  // Search resources with filters
  searchResources: async (filters) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw error;
    }
  },

  // Get a single resource by ID
  getResourceById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource details:', error);
      throw error;
    }
  },

  // Create a new resource
  createResource: async (resourceData) => {
    try {
      const response = await axios.post(API_BASE_URL, resourceData);
      return response.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  },

  // Update an existing resource
  updateResource: async (id, resourceData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, resourceData);
      return response.data;
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  },

  // Delete a resource
  deleteResource: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  }
};

export default resourceService;
