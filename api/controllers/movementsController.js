const { Pool } = require('pg');
const { validateMovement, validateEditMovement } = require('../movementValidator');


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


module.exports.movements = async (req, res) => {

  let query;

  //get movements using operation type and month filters
  if (req.query.type && req.query.month) {
    const { type, month } = req.query;
    query = {
      text: 'SELECT * FROM movements WHERE EXTRACT(MONTH FROM mov_date) = $1 AND mov_type_id = $2',
      values: [month, type]
    };
  }
  //get movements using operation type filter
  else if (req.query.type) {
    const type = req.query.type;
    query = {
      text: 'SELECT * FROM movements WHERE mov_type_id = $1',
      values: [type]
    };
  }
  //get movements using month filter
  else if (req.query.month) {
    const month = req.query.month;
    query = {
      text: 'SELECT * FROM movements WHERE EXTRACT(MONTH FROM mov_date) = $1',
      values: [month]
    };
  }
  //if not using queries, get all movements
  else {
    query = 'SELECT movements.id, user_id, mov_date, mov_type_id, mov_description, category, amount FROM movements \
    INNER JOIN categories \
    ON mov_category_id = categories.id;'
  }

  //execute query
  try {
    const movements = await pool.query(query);
    res.json(movements.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.recents = async (req, res) => {
  const query = 'SELECT movements.id, user_id, mov_date, mov_type_id, mov_description, category, amount FROM movements \
                INNER JOIN categories \
                ON mov_category_id = categories.id \
                ORDER BY mov_date DESC \
                LIMIT 10;';
  try {
    const recent_movements = await pool.query(query);
    res.json(recent_movements.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.movement = async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await pool.query('SELECT * FROM movements WHERE id = $1', [id]);
    res.json(movement.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.create = async (req, res) => {
  validateMovement
  try {
    const { id, date, type, description, category, amount } = req.body;
    const newMovement = await pool.query('INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, mov_category_id, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, date, type, description, category, amount]);
    res.json(newMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovement = await pool.query('DELETE FROM movements WHERE id = $1 RETURNING *', [id]);
    res.json(deleteMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.update = async (req, res) => {
  validateEditMovement
  try {
    const { id } = req.params;
    const { date, description, category, amount } = req.body;
    const updateMovement = await pool.query('UPDATE movements SET mov_date = $1, mov_description = $2, amount = $3, mov_category_id = $4 WHERE id = $5 RETURNING *',
      [date, description, amount, category, id]);
    res.json(updateMovement.rows);
  } catch (error) {
    console.error(error.message);
  }
}