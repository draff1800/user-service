export interface JsonSyntaxError extends SyntaxError {
  status?: number;
  body?: unknown;
}
