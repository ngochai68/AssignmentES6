const express = require('express');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const movieRoutes = require('./routes/movieRoute.js');
app.use('/', movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
