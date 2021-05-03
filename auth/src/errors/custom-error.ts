export abstract class CustomError extends Error {
  // abstract instead of interface so we can use instanceof
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    // Extending default js class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
