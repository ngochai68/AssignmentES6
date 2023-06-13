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
  },
  addEpisodeToMovie: async (movieId, updatedEpisodes) => {
    try {
      // Gửi yêu cầu patch để cập nhật danh sách episodes trên server
      const patchResponse = await axios.patch(
        `http://localhost:3000/movies/${movieId}`,
        {
          episodes: updatedEpisodes,
        }
      );

      return patchResponse.data;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Movie;
