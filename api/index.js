//third party modules
const express = require('express');
const {Pool} = require('pg');

// *********************************************************************************************
//settings
// express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

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
  res.send('Hello World');
})

//movements
//get all movements
app.get('/movements', async(req, res) => {
  try {
      const movements = await pool.query('SELECT * FROM movements');
      res.json(movements.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//get one movement
app.get('/movements/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const movement = await pool.query('SELECT * FROM movements WHERE id = $1', [id]);
      res.json(movement.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//create movement
app.post('/movements', async(req, res) => {
  try{
    const {user_id, mov_date, mov_type_id, mov_description, amount} = req.body;
    const newMovement = await pool.query('INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, mov_date, mov_type_id, mov_description, amount]);
    res.json(newMovement.rows);
  }catch(error){
    console.error(error.message);
  }
})


// *********************************************************************************************

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
