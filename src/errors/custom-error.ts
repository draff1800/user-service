export abstract class CustomError extends Error {
  abstract StatusCode: number;
  abstract serialize(): { message: string };
}
