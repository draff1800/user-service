import { body } from 'express-validator';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateLoginBody = [
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password must not be empty'),
  checkForValidationErrors,
];
