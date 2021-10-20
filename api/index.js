//third party modules
const express = require('express');
const { Pool } = require('pg');

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
app.get('/movements', async (req, res) => {
  
  let query;

  //get movements using operation type and month filters
  if (req.query.type && req.query.month) {
    const { type, month } = req.query;
    query = {text: 'SELECT * FROM movements WHERE EXTRACT(MONTH FROM mov_date) = $1 AND mov_type_id = $2',
            values: [month, type]};
  }
  //get movements using operation type filter
  else if(req.query.type){
    const type = req.query.type;
    query = {text: 'SELECT * FROM movements WHERE mov_type_id = $1',
            values: [type]};
  }
  //get movements using month filter
  else if(req.query.month){
    const month = req.query.month;
    query = {text: 'SELECT * FROM movements WHERE EXTRACT(MONTH FROM mov_date) = $1',
            values: [month]};
  }
  //if not using queries, get all movements
  else
  {
    query = 'SELECT * FROM movements';
  }

  //execute query
  try {
    const movements = await pool.query(query);
    res.json(movements.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//get last 10 movements
app.get('/movements/recent', async (req, res) => {
  try {
    const recent_movements = await pool.query('SELECT * FROM movements ORDER BY mov_date DESC LIMIT 10');
    res.json(recent_movements.rows);
  }catch (error) {
    console.error(error.message);
  }
})
//get one movement
app.get('/movements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await pool.query('SELECT * FROM movements WHERE id = $1', [id]);
    res.json(movement.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//create movement
app.post('/movements', async (req, res) => {
  try {
    const { id, date, type, description, amount } = req.body;
    const newMovement = await pool.query('INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, date, type, description, amount]);
    res.json(newMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//delete movement
app.delete('/movements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovement = await pool.query('DELETE FROM movements WHERE id = $1 RETURNING *', [id]);
    res.json(deleteMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
})
//update movement
app.put('/movements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, amount } = req.body;
    const updateMovement = await pool.query('UPDATE movements SET mov_date = $1, mov_description = $2, amount = $3 WHERE id = $4 RETURNING *',
      [date, description, amount, id]);
    res.json(updateMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// *********************************************************************************************

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
