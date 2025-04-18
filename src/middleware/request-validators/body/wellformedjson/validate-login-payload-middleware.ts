import { body } from 'express-validator';

import { validatorMessages } from '../../../../config/constants.js';
import { checkForValidationErrors } from './check-for-validation-errors-middleware.js';

export const validateLoginPayload = [
  body('email').isEmail().withMessage(validatorMessages.isEmail('Email')),

  body('password')
    .isString()
    .withMessage(validatorMessages.isString('Password'))
    .notEmpty()
    .withMessage(validatorMessages.notEmpty('Password')),

  checkForValidationErrors,
];
