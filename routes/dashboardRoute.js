const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/DashboardController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", dashboardController.getDashBoard);
router.get("/movies", dashboardController.getAllMovies);
router.get("/add-movie", dashboardController.getAddMovieForm);
router.post(
  "/add-movie",
  upload.fields([
    { name: "img1Url", maxCount: 1 },
    { name: "img2Url", maxCount: 1 },
  ]),
  dashboardController.addMovie
);
router.get("/edit-movie/:id", dashboardController.getEditMovieForm);
router.post(
  "/edit-movie/:id",
  upload.fields([
    { name: "img1Url", maxCount: 1 },
    { name: "img2Url", maxCount: 1 },
  ]),
  dashboardController.editMovie
);
router.post("/delete-movie/:id", dashboardController.deleteMovie);
router.get("/img/:filename", (req, res) => {
  const filename = req.params.filename;
  const imgPath = path.join(__dirname, "../public/img/", filename);
  res.sendFile(imgPath);
});

router.get("/add-episode/:movieId", dashboardController.getAddEpisodeForm);
router.post(
  "/add-episode/:movieId",
  upload.single("img3Url"),
  dashboardController.addEpisode
);

router.get("/edit-episode/:id", dashboardController.getEditEpisodeForm);
router.post(
  "/edit-episode/:movieId",
  upload.single("img3Url"),
  dashboardController.editEpisode
);

router.post("/delete-episode/:id", dashboardController.deleteEpisode);

module.exports = router;
