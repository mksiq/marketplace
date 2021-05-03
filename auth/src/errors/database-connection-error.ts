import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  cause = 'Something went wrong in the database';

  constructor() {
    super('Error on database');
    // Extending default js class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.cause }];
  }
}
