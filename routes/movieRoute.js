const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');
const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");
const upload = multer({ storage });

router.get('/', movieController.getAllMoviesUser);
router.get('/admin', movieController.getAdminPage);
router.get('/movie-details/:id', movieController.getMovieDetails);
router.get('/watch-movie/:id', movieController.getMovieWatch);
router.get("/admin/movies", movieController.getAllMoviesAdmin);
router.get("/admin/add-movie", movieController.getAddMovieForm);
router.post(
  "/admin/add-movie",
  upload.fields([
    { name: "img1Url", maxCount: 1 },
    { name: "img2Url", maxCount: 1 },
  ]),
  movieController.addMovie
);
router.get("/admin/edit-movie/:id", movieController.getEditMovieForm);
router.post(
  "/admin/edit-movie/:id",
  upload.fields([
    { name: "img1Url", maxCount: 1 },
    { name: "img2Url", maxCount: 1 },
  ]),
  movieController.editMovie
);
router.post("/admin/delete-movie/:id", movieController.deleteMovie);
router.get("/admin/img/:filename", (req, res) => {
  const filename = req.params.filename;
  const imgPath = path.join(__dirname, "../public/img/", filename);
  res.sendFile(imgPath);
});

module.exports = router;
