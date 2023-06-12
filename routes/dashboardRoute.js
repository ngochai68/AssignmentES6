const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', dashboardController.getDashBoard);
router.get('/movies', dashboardController.getAllMovies);
router.get('/add-movie', dashboardController.getAddMovieForm);
router.post('/add-movie', upload.fields([{ name: 'img1Url', maxCount: 1 }, { name: 'img2Url', maxCount: 1 }]), dashboardController.addMovie);
router.get('/edit-movie/:id', dashboardController.getEditMovieForm);
router.put('/edit-movie/:id', dashboardController.editMovie);
router.delete('/delete-movie/:id', dashboardController.deleteMovie);
router.get('/img/:filename', (req, res) => {
    const filename = req.params.filename;
    const imgPath = path.join(__dirname, '../public/img/', filename);
    res.sendFile(imgPath);
  });
  


module.exports = router;
