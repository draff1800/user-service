import { body } from 'express-validator';

import { MIN_PASSWORD_LENGTH, validatorMessages } from '../../../../config/constants.js';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateUpdateBody = [
  body('newUsername')
    .optional()
    .isString()
    .withMessage(validatorMessages.isString('Username'))
    .notEmpty()
    .withMessage(validatorMessages.notEmpty('Username')),

  body('newEmail').optional().isEmail().withMessage(validatorMessages.isEmail('Email')),

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
      `New Password must be at least ${MIN_PASSWORD_LENGTH} characters long, with 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol`,
    ),

  body('currentPassword')
    .optional()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`Current Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),

  checkForValidationErrors,
];
