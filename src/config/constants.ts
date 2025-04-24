export const API_VERSION = 'v1';

export const NODE_ENVS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
} as const;

export const MIN_PASSWORD_LENGTH = 8;

export const validatorMessages = {
  isString: (field: string) => `${field} must be a string`,
  notEmpty: (field: string) => `${field} must not be empty`,
  isEmail: (field: string) => `${field} must be a valid email`,
};
