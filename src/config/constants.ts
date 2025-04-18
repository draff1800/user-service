export const MIN_PASSWORD_LENGTH = 8;

export const validatorMessages = {
  isString: (field: string) => `${field} must be a string`,
  notEmpty: (field: string) => `${field} must not be empty`,
  isEmail: (field: string) => `${field} must be a valid email`,
};
