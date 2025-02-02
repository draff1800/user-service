import { body } from 'express-validator';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateRegisterBody = [
  body('username')
    .isString()
    .withMessage('username must be a string')
    .notEmpty()
    .withMessage('username must not be empty'),
  body('email').isEmail().withMessage('email must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  checkForValidationErrors,
];
