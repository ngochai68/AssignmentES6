const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const Area = require("../models/areaModel");

const dashboardController = {
  // ...các phương thức khác

  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      const genres = await Genre.getAllGenres();
      const areas = await Area.getAllAreas();
      res.render("admin/movies", { movies, genres, areas });
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
      res.render("admin/movie-details", { movie, genres, areas });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  createMovie: async (req, res) => {
    try {
      const movieData = req.body; // Lấy dữ liệu phim từ request body
      const newMovie = await Movie.createMovie(movieData);
      res.redirect("/dashboard/movies"); // Chuyển hướng sau khi tạo phim thành công
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movieData = req.body; // Lấy dữ liệu cập nhật từ request body
      const updatedMovie = await Movie.updateMovie(movieId, movieData);
      res.redirect(`/dashboard/movies/${movieId}`); // Chuyển hướng sau khi cập nhật phim thành công
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      const deletedMovie = await Movie.deleteMovie(movieId);
      res.redirect("/dashboard/movies"); // Chuyển hướng sau khi xóa phim thành công
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = dashboardController;
