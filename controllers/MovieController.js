const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const Area = require("../models/areaModel");

const movieController = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      res.render("user/home", { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getMovieDetails: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.getMovieById(movieId);
      const genres = await Genre.getAllGenres();
      const areas = await Area.getAllAreas();
      res.render("user/movie-details", { movie, genres, areas });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getMovieWatch: async (req, res) => {
    try {
      const movieId = req.params.id;
      const episodeId = req.query.ep;
      const movie = await Movie.getMovieById(movieId);
      res.render("user/watch-movie", { movie, movieId, episodeId });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  
};

module.exports = movieController;
