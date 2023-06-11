const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');

router.get('/', movieController.getAllMovies);
router.get('/movie-details/:id', movieController.getMovieDetails);
router.get('/watch-movie/:id', movieController.getMovieWatch);


module.exports = router;
