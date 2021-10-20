//third party modules
const express = require('express');
const {Pool} = require('pg');

// *********************************************************************************************
//settings
// express
const app = express();
const PORT = process.env.PORT || 3000;

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
app.get('/', (req, res) => {
  res.send('Hello World');
})

//get all movements
app.get('/movements', async(req, res) => {
  try {
      const movements = await pool.query('SELECT * FROM movements');
      res.json(movements.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// *********************************************************************************************

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
