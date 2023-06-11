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
  },
  getGenresByMovieId: async (movieId) => {
    try {
      const response = await axios.get('http://localhost:3000/genre');
      const genres = response.data;
      const movie = await Movie.getMovieById(movieId);
      const genreIds = movie.genreIds;
      const movieGenres = genreIds.map((genreId) => genres.find((genre) => genre.id === genreId));
      return movieGenres;
    } catch (error) {
      throw error;
    }
  },
  getAreaByMovieId: async (movieId) => {
    try {
      const response = await axios.get('http://localhost:3000/area');
      const areas = response.data;
      const movie = await Movie.getMovieById(movieId);
      const areaId = movie.areaId;
      const movieArea = areas.find((area) => area.id === areaId);
      return movieArea;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Movie;
