import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../../../interfaces/error';
import handleValidationError from '../../../../errors/hadleValidationError';
import config from '../../../../config';
import apiError from '../../../../errors/ApiError';
// import { errorLogger } from '../../../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development';
  // ? console.log('global error handler', err)
  // : errorLogger.error('global error handler', err);
  let statusCode = 500;
  let message = 'Something Went Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof apiError) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    // message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
