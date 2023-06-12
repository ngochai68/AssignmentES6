const axios = require('axios');

const Genre = {
  getAllGenres: async () => {
    try {
      const response = await axios.get('http://localhost:3000/genres');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getGenreById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/genres/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Genre;
