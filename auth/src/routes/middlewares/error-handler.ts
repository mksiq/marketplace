import { Request, NextFunction, Response } from 'express';
import { CustomError } from '../../errors/custom-error';
import { DatabaseConnectionError } from '../../errors/database-connection-error';
import { RequestValidationError } from '../../errors/request-validation-error';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send({ errors: [error.serializeErrors()] });
  }

  return res.status(500).send({ errors: [error.message] });
};
