const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const Area = require("../models/areaModel");
const fs = require("fs");
const path = require("path");

const dashboardController = {
  getDashBoard: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      res.render("admin/dashboard", { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      res.render("admin/movie-manage", { movies });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getAddMovieForm: async (req, res) => {
    try {
      const movies = await Movie.getAllMovies();
      const genres = await Genre.getAllGenres();
      const areas = await Area.getAllAreas();
      res.render("admin/add-movie", { movies, genres, areas });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  addMovie: async (req, res) => {
    try {
      const movieData = req.body;

      const { img1Url, img2Url } = req.files;

      // Chuyển đổi các trường dữ liệu thành số
      movieData.totalEpisodes = parseInt(movieData.totalEpisodes);
      movieData.areaId = parseInt(movieData.areaId);
      movieData.genreIds = movieData.genreIds.map((id) => parseInt(id));
      movieData.rating = parseFloat(movieData.rating);
      movieData.score = parseFloat(movieData.score);
      movieData.numberReviews = parseInt(movieData.numberReviews);
      movieData.yearManufacture = parseInt(movieData.yearManufacture);

      // Lưu trữ ảnh 1
      const img1Path = path.join(
        __dirname,
        "../public/img/",
        img1Url[0].originalname
      );
      fs.writeFileSync(img1Path, img1Url[0].buffer);
      movieData.img1Url = `/img/${img1Url[0].originalname}`;

      // Lưu trữ ảnh 2
      const img2Path = path.join(
        __dirname,
        "../public/img/",
        img2Url[0].originalname
      );
      fs.writeFileSync(img2Path, img2Url[0].buffer);
      movieData.img2Url = `/img/${img2Url[0].originalname}`;

      // Gọi phương thức createMovie từ model
      const newMovie = await Movie.createMovie(movieData);

      res.redirect("/dashboard/movies");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getEditMovieForm: async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.getMovieById(movieId);
      const genres = await Genre.getAllGenres();
      const areas = await Area.getAllAreas();
      res.render("admin/edit-movie", {
        movie,
        genres,
        areas,
        currentImg1Url: movie.img1Url,
        currentImg2Url: movie.img2Url,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  editMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      let movieData = req.body;

      const { img1Url, img2Url } = req.files;

      // Chuyển đổi các trường dữ liệu thành số
      movieData.totalEpisodes = parseInt(movieData.totalEpisodes);
      movieData.areaId = parseInt(movieData.areaId);
      movieData.genreIds = movieData.genreIds.map((id) => parseInt(id));
      movieData.rating = parseFloat(movieData.rating);
      movieData.score = parseFloat(movieData.score);
      movieData.numberReviews = parseInt(movieData.numberReviews);
      movieData.yearManufacture = parseInt(movieData.yearManufacture);

      // Kiểm tra nếu không có tệp mới được chọn, sử dụng lại đường dẫn ảnh hiện tại
      if (!img1Url || img1Url.length === 0) {
        movieData.img1Url = movieData.currentImg1Url;
      } else {
        // Lưu trữ ảnh 1 mới
        const img1Path = path.join(
          __dirname,
          "../public/img/",
          img1Url[0].originalname
        );
        fs.writeFileSync(img1Path, img1Url[0].buffer);
        movieData.img1Url = `/img/${img1Url[0].originalname}`;
      }

      if (!img2Url || img2Url.length === 0) {
        movieData.img2Url = movieData.currentImg2Url;
      } else {
        // Lưu trữ ảnh 2 mới
        const img2Path = path.join(
          __dirname,
          "../public/img/",
          img2Url[0].originalname
        );
        fs.writeFileSync(img2Path, img2Url[0].buffer);
        movieData.img2Url = `/img/${img2Url[0].originalname}`;
      }

      const movie = await Movie.getMovieById(movieId);

      // Bổ sung dữ liệu của episodes từ movie nếu tồn tại
      if (movie && movie.episodes) {
        movieData.episodes = movie.episodes;
      }

      // Gọi phương thức updateMovie từ model
      const updatedMovie = await Movie.updateMovie(movieId, movieData);

      res.redirect("/dashboard/movies");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      await Movie.deleteMovie(movieId);
      res.redirect("/dashboard/movies");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getAddEpisodeForm: async (req, res) => {
    try {
      const { movieId } = req.params;
      // Lấy thông tin bộ phim theo movieId
      const movie = await Movie.getMovieById(movieId);
      res.render("admin/add-episode", { movieId, movie });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  addEpisode: async (req, res) => {
    try {
      const episodeData = req.body;
      const { originalname, buffer } = req.file;

      // Lưu trữ ảnh 3
      const img3Path = path.join(__dirname, "../public/img/", originalname);
      fs.writeFileSync(img3Path, buffer);
      episodeData.img3Url = `/img/${originalname}`;

      // Lấy movieId từ URL
      const movieId = req.params.movieId;

      // Lấy movie từ movieId
      const movie = await Movie.getMovieById(movieId);

      // Lấy danh sách episodes
      const episodesData = movie.episodes;

      // Kiểm tra xem movie.episodes có tồn tại hay không
      if (movie.episodes) {
        let maxId = 0;
        episodesData.forEach((episode) => {
          if (episode.id > maxId) {
            maxId = episode.id;
          }
        });

        const newEpisodeId = maxId + 1;
        const newEpisode = { id: newEpisodeId, ...episodeData };
        const updatedEpisodes = [...episodesData, newEpisode];
        const updatedMovie = await Movie.addEpisodeToMovie(
          movieId,
          updatedEpisodes
        );
      } else {
        const newEpisode = { id: 1, ...episodeData };
        const updatedEpisodes = [newEpisode];
        const updatedMovie = await Movie.addEpisodeToMovie(
          movieId,
          updatedEpisodes
        );
      }

      res.redirect(`/dashboard/add-episode/${movieId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getEditEpisodeForm: async (req, res) => {
    try {
      const movieId = req.params.id;
      const episodeId = req.query.ep;
      const movie = await Movie.getMovieById(movieId);
      const episode = movie.episodes[episodeId - 1];
      res.render("admin/edit-episode", {
        episode,
        episodeId,
        movie,
        movieId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  editEpisode: async (req, res) => {
    try {
      const episodeData = req.body;
      let img3Url = "";

      if (req.file) {
        const { originalname, buffer } = req.file;

        // Lưu trữ ảnh 3
        const img3Path = path.join(__dirname, "../public/img/", originalname);
        fs.writeFileSync(img3Path, buffer);
        img3Url = `/img/${originalname}`;
      }

      // Kiểm tra nếu không có tệp mới được chọn, sử dụng lại đường dẫn ảnh hiện tại
      if (!img3Url || img3Url.length === 0) {
        episodeData.img3Url = episodeData.currentImg3Url;
      } else {
        // Lưu trữ ảnh 1 mới
        const img1Path = path.join(
          __dirname,
          "../public/img/",
          req.file.originalname
        );
        fs.writeFileSync(img1Path, req.file.buffer);
        episodeData.img3Url = `/img/${req.file.originalname}`;
      }

      // Lấy movieId từ URL
      const movieId = req.params.movieId;
      const episodeId = parseInt(req.query.ep);

      // Lấy movie từ movieId
      const movie = await Movie.getMovieById(movieId);

      const episodes = movie.episodes;

      const updatedEpisodes = episodes.map((episode) => {
        if (episode.id === episodeId) {
          return {
            ...episode,
            name: episodeData.name,
            img3Url: episodeData.img3Url,
            videoUrl: episodeData.videoUrl,
          };
        }
        return episode;
      });

      // Cập nhật danh sách episodes của movie
      const updatedMovie = await Movie.addEpisodeToMovie(
        movieId,
        updatedEpisodes
      );

      res.redirect(`/dashboard/edit-episode/${movieId}?ep=${episodeId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteEpisode: async (req, res) => {
    try {
      const movieId = req.params.id;
      const episodeId = parseInt(req.query.ep);

      const movie = await Movie.getMovieById(movieId);
      const episodes = movie.episodes;
      

      const updatedEpisodes = episodes.filter(episode => episode.id !== episodeId);;

      // Cập nhật danh sách episodes của movie
      const updatedMovie = await Movie.addEpisodeToMovie(
        movieId,
        updatedEpisodes
      );

      res.redirect(`/dashboard/add-episode/${movieId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = dashboardController;
