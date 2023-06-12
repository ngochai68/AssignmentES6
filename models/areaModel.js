const axios = require('axios');

const Area = {
  getAllAreas: async () => {
    try {
      const response = await axios.get('http://localhost:3000/areas');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAreaById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/areas/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Area;
