const {check, validationResult } = require('express-validator');

exports.validateMovement = [
  check('date').isISO8601().notEmpty().withMessage('Invalid or null date format'),
  check('type').isNumeric().notEmpty().withMessage('Invalid or null type'),
  check('description').isString().withMessage('Invalid description'),
  check('category').isNumeric().notEmpty().withMessage('Invalid or null category'),
  check('amount').isNumeric().notEmpty().withMessage('Invalid or null amount'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
]

exports.validateEditMovement = [
  check('id').isNumeric().notEmpty().withMessage('Invalid or null id'),
  check('date').isISO8601().notEmpty().withMessage('Invalid or null date format'),
  check('description').isString().withMessage('Invalid description'),
  check('category').isNumeric().notEmpty().withMessage('Invalid or null category'),
  check('amount').isNumeric().notEmpty().withMessage('Invalid or null amount'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]