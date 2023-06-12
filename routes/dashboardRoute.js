const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

router.get('/movies', dashboardController.getAllMovies);
router.get('/movies/:id', dashboardController.getMovieDetails);
router.post('/movies/create', dashboardController.createMovie);
router.post('/movies/update/:id', dashboardController.updateMovie);
router.post('/movies/:id', dashboardController.deleteMovie);

module.exports = router;
