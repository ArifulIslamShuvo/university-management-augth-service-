/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { NextFunction, Request, Response } from 'express-serve-static-core';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ErrorRequestHandler } from 'express';
import { errorlogger } from '../../shared/logger';
import handleZodError from '../../errors/handleZodError';
import { ZodError } from 'zod';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalErrorhandler', error)
    : errorlogger.error('globalErrorhandler', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidatorError') {
    const simplifideError = handleValidationError(error);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorMessages = simplifideError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifideError = handleZodError(error);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorMessages = simplifideError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifideError = handleCastError(error);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorMessages = simplifideError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
// path
// message
