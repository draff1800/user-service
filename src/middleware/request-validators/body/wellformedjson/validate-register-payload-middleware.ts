import { body } from 'express-validator';

import { MIN_PASSWORD_LENGTH, validatorMessages } from '../../../../config/constants.js';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateRegisterPayload = [
  body('username')
    .isString()
    .withMessage(validatorMessages.isString('Username'))
    .notEmpty()
    .withMessage(validatorMessages.notEmpty('Username')),

  body('email').isEmail().withMessage(validatorMessages.isEmail('Email')),

  body('password')
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

  checkForValidationErrors,
];
