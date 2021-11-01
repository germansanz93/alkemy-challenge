//third party modules
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const movementsController = require('./controllers/movementsController');
const categoriesController = require('./controllers/categoriesController');

const validateMovement = require('./movementValidator');


// *********************************************************************************************
//settings
// express
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// db
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
}
const pool = new Pool(config);


// *********************************************************************************************

//routes

//home
app.get('/', (req, res) => {
  res.send('Nothing here!');
})

//movements
//get all movements
app.get('/movements', movementsController.movements)
//get last 10 movements
app.get('/movements/recent', movementsController.recents)
//get one movement
app.get('/movements/:id', movementsController.movement)
//create movement
app.post('/movements',movementsController.create)
//delete movement
app.delete('/movements/:id', movementsController.delete)
//update movement
app.put('/movements/:id', movementsController.update)

//categories
//get all categories
app.get('/categories', categoriesController.categories)
//create a category
app.post('/categories', categoriesController.create)
//update a category
app.put('/categories/:id', categoriesController.update)
//delete a category
app.delete('/categories/:id', categoriesController.delete)
//get a category id by name
app.get('/categories/:name', categoriesController.category)

// *********************************************************************************************

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
