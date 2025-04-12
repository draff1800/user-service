import { body } from 'express-validator';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateRegisterBody = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .notEmpty()
    .withMessage('Username must not be empty'),
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 8 characters long, with 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol.',
    ),
  checkForValidationErrors,
];
