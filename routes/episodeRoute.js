const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/EpisodeController');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/add-episode/:movieId", episodeController.getAddEpisodeForm);
router.post(
  "/add-episode/:movieId",
  upload.single("img3Url"),
  episodeController.addEpisode
);

router.get("/edit-episode/:id", episodeController.getEditEpisodeForm);
router.post(
  "/edit-episode/:movieId",
  upload.single("img3Url"),
  episodeController.editEpisode
);

router.post("/delete-episode/:id", episodeController.deleteEpisode);
router.get("/img/:filename", (req, res) => {
  const filename = req.params.filename;
  const imgPath = path.join(__dirname, "../public/img/", filename);
  res.sendFile(imgPath);
});

module.exports = router;
