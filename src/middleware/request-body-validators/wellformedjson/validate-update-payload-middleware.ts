import { body } from 'express-validator';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';
import { MIN_PASSWORD_LENGTH } from '../../../config/constants.js';

export const validateUpdatePayload = [
  body('newUsername')
    .optional()
    .isString()
    .withMessage('Username must be a string')
    .notEmpty()
    .withMessage('Username must not be empty'),

  body('newEmail').optional().isEmail().withMessage('Email must be a valid email'),

  body('newPassword')
    .optional()
    .isStrongPassword({
      minLength: MIN_PASSWORD_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long, with 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol`,
    ),

  body('currentPassword')
    .optional()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`Current Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),

  checkForValidationErrors,
];
