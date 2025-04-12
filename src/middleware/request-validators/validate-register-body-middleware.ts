import { body } from 'express-validator';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateRegisterBody = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .notEmpty()
    .withMessage('Username must not be empty'),
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  checkForValidationErrors,
];
