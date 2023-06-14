const Movie = require("../models/movieModel");
const Episode = require("../models/episodeModel");
const fs = require("fs");
const path = require("path");

const episodeController = {
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
        const updatedMovie = await Episode.addEpisodeToMovie(
          movieId,
          updatedEpisodes
        );
      } else {
        const newEpisode = { id: 1, ...episodeData };
        const updatedEpisodes = [newEpisode];
        const updatedMovie = await Episode.addEpisodeToMovie(
          movieId,
          updatedEpisodes
        );
      }

      res.redirect(`/admin/add-episode/${movieId}`);
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
      const updatedMovie = await Episode.addEpisodeToMovie(
        movieId,
        updatedEpisodes
      );

      res.redirect(`/admin/edit-episode/${movieId}?ep=${episodeId}`);
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

      const updatedEpisodes = episodes.filter(
        (episode) => episode.id !== episodeId
      );

      // Cập nhật danh sách episodes của movie
      const updatedMovie = await Episode.addEpisodeToMovie(
        movieId,
        updatedEpisodes
      );

      res.redirect(`/admin/add-episode/${movieId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = episodeController;
