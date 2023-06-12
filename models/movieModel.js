const axios = require('axios');

const Movie = {
  getAllMovies: async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMovieById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Movie;
