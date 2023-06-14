const express = require('express');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const movieRoutes = require('./routes/movieRoute.js');
const dashboardRoutes = require('./routes/dashboardRoute.js'); // Add this line
app.use('/', movieRoutes);
app.use('/dashboard', dashboardRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
