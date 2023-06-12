const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');
const Area = require('../models/areaModel');
const fs = require('fs');
const path = require('path');


const dashboardController = {
  getDashBoard: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      res.render('admin/dashboard', { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      res.render('admin/movie-manage', { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getAddMovieForm: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      const genres = await Genre.getAllGenres();
      const areas = await Area.getAllAreas();
      res.render('admin/add-movie', { movies, genres, areas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  addMovie: async (req, res) => {
    try {
      const movieData = req.body;

      const { img1Url, img2Url } = req.files;

      // Chuyển đổi các trường dữ liệu thành số
      movieData.totalEpisodes = parseInt(movieData.totalEpisodes);
      movieData.areaId = parseInt(movieData.areaId);
      movieData.genreIds = movieData.genreIds.map(id => parseInt(id));
      movieData.rating = parseFloat(movieData.rating);
      movieData.score = parseFloat(movieData.score);
      movieData.numberReviews = parseInt(movieData.numberReviews);
      movieData.yearManufacture = parseInt(movieData.yearManufacture);

      // Lưu trữ ảnh 1
      const img1Path = path.join(__dirname, '../public/img/', img1Url[0].originalname);
      fs.writeFileSync(img1Path, img1Url[0].buffer);
      movieData.img1Url = `/img/${img1Url[0].originalname}`;

      // Lưu trữ ảnh 2
      const img2Path = path.join(__dirname, '../public/img/', img2Url[0].originalname);
      fs.writeFileSync(img2Path, img2Url[0].buffer);
      movieData.img2Url = `/img/${img2Url[0].originalname}`;

      // Gọi phương thức createMovie từ model
      const newMovie = await Movie.createMovie(movieData);
      
      res.redirect('/dashboard/movies');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getEditMovieForm: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.getMovieById(movieId);
      res.render('dashboard/edit-movie', { movie });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  editMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movieData = req.body;
      await Movie.updateMovie(movieId, movieData);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      await Movie.deleteMovie(movieId);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = dashboardController;
