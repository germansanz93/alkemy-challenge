const { Pool } = require('pg');
const {validateCategory, validateEditCategory} = require('../categoryValidator');

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

module.exports.categories = async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.create = async (req, res) => {
  validateCategory
  try {
    const { category } = req.body;
    const newCategory = await pool.query('INSERT INTO categories (category) VALUES ($1) RETURNING *', [name]);
    res.json(newCategory.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.update = async (req, res) => {
  validateEditCategory
  try {
    const { id } = req.params;
    const { category } = req.body;
    const updateCategory = await pool.query('UPDATE categories SET category = $1 WHERE id = $2 RETURNING *', [category, id]);
    res.json(updateCategory.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    res.json(deleteCategory.rows);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.category = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await pool.query('SELECT * FROM categories WHERE category = $1', [name]);
    res.json(category.rows[0].id);
  } catch (error) {
    console.error(error.message);
  }
}