export interface SerialisedError {
  message: string;
}

export interface SerialisedMultiError extends SerialisedError {
  errors: string[];
}
