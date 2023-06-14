const axios = require("axios");

const Movie = {
  getAllMovies: async () => {
    try {
      const response = await axios.get("http://localhost:3000/movies");
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
  },
  createMovie: async (movieData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/movies",
        movieData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateMovie: async (id, movieData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/movies/${id}`,
        movieData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteMovie: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Movie;
