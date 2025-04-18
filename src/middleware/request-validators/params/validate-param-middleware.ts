import type { RequestHandler } from 'express';
import { param } from 'express-validator';

import { validatorMessages } from '../../../config/constants.js';
import type { ValidateParamOptions } from '../../../types/requests/params/validate-param-options.js';
import { capitalise } from '../../../utils/string-utils.js';
import { checkForValidationErrors } from '../body/wellformedjson/check-for-validation-errors-middleware.js';

export const validateParam = (name: string, options?: ValidateParamOptions): RequestHandler[] => {
  const capitalisedName = capitalise(name);

  const {
    required = true,
    maxLength,
    regex = /^[a-zA-Z0-9_-]+$/,
    regexMessage = `${capitalisedName} has invalid characters`,
  } = options ?? {};

  let validator = param(name).isString().withMessage(validatorMessages.isString(capitalisedName));

  if (required) {
    validator = validator.notEmpty().withMessage(validatorMessages.notEmpty(capitalisedName));
  }

  if (maxLength) {
    validator = validator
      .isLength({ max: maxLength })
      .withMessage(`${capitalisedName} must be at most ${maxLength} characters long`);
  }

  validator = validator.matches(regex).withMessage(regexMessage);

  return [validator, checkForValidationErrors];
};
