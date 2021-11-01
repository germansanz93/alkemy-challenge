const { check, validationResult } = require('express-validator');

exports.validateCategory = [
  check('category').isString().notEmpty().withMessage('Invalid or null category'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
]

exports.validateEditCategory = [
  check('id').isNumeric().notEmpty().withMessage('Invalid or null id'),
  check('category').isString().notEmpty().withMessage('Invalid or null category'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
]
