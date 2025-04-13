import type { Info } from '../types/info.js';

export abstract class CustomError extends Error {
  abstract readonly StatusCode: number;
  abstract serialise(): Info;
}
