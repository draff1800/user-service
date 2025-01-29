export abstract class CustomError extends Error {
  abstract readonly StatusCode: number;
  abstract serialize(): { message: string };
}
