//third party modules
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

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
app.get('/movements', async (req, res) => {

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
})
//get last 10 movements
app.get('/movements/recent', async (req, res) => {
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
app.post(
  '/movements',
  body('date').isISO8601().notEmpty().withMessage('Invalid or null date format'),
  body('type').isNumeric().notEmpty().withMessage('Invalid or null type'),
  body('description').isString().withMessage('Invalid description'),
  body('category').isNumeric().notEmpty().withMessage('Invalid or null category'),
  body('amount').isNumeric().notEmpty().withMessage('Invalid or null amount'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id, date, type, description, category, amount } = req.body;
      const newMovement = await pool.query('INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, mov_category_id, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, date, type, description, category, amount]);
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
app.put(
  '/movements/:id',
  body('id').isNumeric().notEmpty().withMessage('Invalid or null id'),
  body('date').isISO8601().notEmpty().withMessage('Invalid or null date format'),
  body('description').isString().withMessage('Invalid description'),
  body('category').isNumeric().notEmpty().withMessage('Invalid or null category'),
  body('amount').isNumeric().notEmpty().withMessage('Invalid or null amount'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { date, description, category, amount} = req.body;
      const updateMovement = await pool.query('UPDATE movements SET mov_date = $1, mov_description = $2, amount = $3, mov_category_id = $4 WHERE id = $5 RETURNING *',
        [date, description, amount, category, id]);
      res.json(updateMovement.rows);
    } catch (error) {
      console.error(error.message);
    }
  })

//categories
//get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch (error) {
    console.error(error.message);
  }
})

//create a category
app.post(
  '/categories',
  body('category').isString().notEmpty().withMessage('Invalid or null category'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { category } = req.body;
      const newCategory = await pool.query('INSERT INTO categories (category) VALUES ($1) RETURNING *', [name]);
      res.json(newCategory.rows);
    } catch (error) {
      console.error(error.message);
    }
  })

//update a category
app.put(
  '/categories/:id',
  body('id').isNumeric().notEmpty().withMessage('Invalid or null id'),
  body('category').isString().notEmpty().withMessage('Invalid or null category'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { category } = req.body;
      const updateCategory = await pool.query('UPDATE categories SET category = $1 WHERE id = $2 RETURNING *', [category, id]);
      res.json(updateCategory.rows);
    } catch (error) {
      console.error(error.message);
    }
  })

//delete a category
app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    res.json(deleteCategory.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// *********************************************************************************************

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
